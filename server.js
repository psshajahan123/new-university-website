// server.js — Express + MySQL backend for University Results Portal
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Update these with your MySQL credentials
const DB_CONFIG = {
  host: "localhost",
  port: 3306,
  user: "root", // your MySQL username
  password: "ps1234", // your MySQL password
  database: "university_portal",
};

let db;

async function connectDB() {
  db = await mysql.createConnection(DB_CONFIG);
  console.log("✅ Connected to MySQL");

  // Auto-create the users table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(100)  NOT NULL,
      email      VARCHAR(150)  NOT NULL UNIQUE,
      password   VARCHAR(255)  NOT NULL,
      created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Users table ready");
}

// ── Register ──────────────────────────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required." });

  if (name.trim().length < 2)
    return res.status(400).json({ error: "Please enter a valid full name." });

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });

  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });

  try {
    // Check if email already exists
    const [rows] = await db.execute("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0)
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });

    // Insert new user
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name.trim(), email, btoa(password)], // ⚠️ use bcrypt in production
    );

    res.json({ success: true, name: name.trim(), email });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

// ── Login ─────────────────────────────────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  try {
    const [rows] = await db.execute(
      "SELECT name, email FROM users WHERE email = ? AND password = ?",
      [email, btoa(password)],
    );

    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid email or password." });

    const user = rows[0];
    res.json({ success: true, name: user.name, email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────────
connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("🚀 Backend running at http://localhost:3001");
      console.log("   POST /api/register");
      console.log("   POST /api/login");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err.message);
    process.exit(1);
  });
