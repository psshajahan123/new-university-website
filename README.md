# University Results Portal — MySQL Setup Guide

## Project Structure
```
university-website-mysql/
├── src/
│   └── components/
│       └── auth.js     ← Frontend (unchanged)
├── server.js           ← Express + MySQL backend
├── package.json
├── index.html
└── vite.config.js
```

---

## Step 1 — Make sure MySQL is running

Open **MySQL Workbench** or your MySQL client and confirm it's running on `localhost:3306`.

---

## Step 2 — Create the database

Run this in MySQL Workbench or any MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS university_portal;
```

That's it — the `users` table is created **automatically** when you start the server.

---

## Step 3 — Configure your credentials

Open `server.js` and update:

```js
const DB_CONFIG = {
  host:     'localhost',
  port:     3306,
  user:     'root',       // ← your MySQL username
  password: '',           // ← your MySQL password
  database: 'university_portal'
};
```

---

## Step 4 — Install & Run

```bash
# Install dependencies
npm install

# Terminal 1 — start backend (port 3001)
npm run server

# Terminal 2 — start frontend (port 5173)
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Verify data in MySQL Workbench

After a user registers, run this query to see them:

```sql
USE university_portal;
SELECT * FROM users;
```

---

## ⚠️ Security Upgrade (Before Real Users)

The current setup uses `btoa()` (base64) — fine for development only.
For production, use **bcrypt**:

```bash
npm install bcrypt
```

In `server.js`:
```js
import bcrypt from 'bcrypt';

// Register — hash password before saving
const hashed = await bcrypt.hash(password, 10);
await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);

// Login — compare instead of direct match
const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password)))
  return res.status(401).json({ error: 'Invalid email or password.' });
```
