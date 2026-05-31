(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const L="http://localhost:3001/api";function B(){try{return JSON.parse(localStorage.getItem("authUser")||"null")}catch{return null}}function E(e){e?localStorage.setItem("authUser",JSON.stringify(e)):localStorage.removeItem("authUser")}function k(){var n,s,o,r,a,i;const e=document.getElementById("loginModal"),t=document.getElementById("registerModal");document.querySelectorAll('[data-open="login"]').forEach(l=>l.addEventListener("click",()=>p())),document.querySelectorAll('[data-open="register"]').forEach(l=>l.addEventListener("click",()=>y())),e==null||e.addEventListener("click",l=>{l.target===e&&u()}),t==null||t.addEventListener("click",l=>{l.target===t&&m()}),(n=document.getElementById("loginClose"))==null||n.addEventListener("click",u),(s=document.getElementById("registerClose"))==null||s.addEventListener("click",m),(o=document.getElementById("switchToRegister"))==null||o.addEventListener("click",()=>{u(),setTimeout(y,120)}),(r=document.getElementById("switchToLogin"))==null||r.addEventListener("click",()=>{m(),setTimeout(p,120)}),(a=document.getElementById("loginForm"))==null||a.addEventListener("submit",$),(i=document.getElementById("registerForm"))==null||i.addEventListener("submit",S),document.addEventListener("keydown",l=>{l.key==="Escape"&&(u(),m())}),g()}async function $(e){e.preventDefault();const t=document.getElementById("loginEmail").value.trim(),n=document.getElementById("loginPassword").value,s=document.getElementById("loginAlert");f("login");try{const o=await fetch(`${L}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}),r=await o.json();if(!o.ok){d(s,"error","✗ "+r.error);return}E({name:r.name,email:r.email}),u(),g(),v("🎉 Welcome back, "+r.name+"!","success")}catch(o){console.error("Login error:",o),d(s,"error","✗ Could not connect to server. Please try again.")}}async function S(e){e.preventDefault();const t=document.getElementById("regName").value.trim(),n=document.getElementById("regEmail").value.trim(),s=document.getElementById("regPassword").value,o=document.getElementById("registerAlert");if(f("register"),t.length<2){d(o,"error","✗ Please enter a valid full name.");return}if(!n.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){d(o,"error","✗ Please enter a valid email address.");return}if(s.length<6){d(o,"error","✗ Password must be at least 6 characters.");return}try{const r=await fetch(`${L}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:n,password:s})}),a=await r.json();if(!r.ok){d(o,"error","✗ "+a.error);return}E({name:a.name,email:a.email}),m(),g(),v("🎊 Account created! Welcome, "+a.name+"!","success")}catch(r){console.error("Register error:",r),d(o,"error","✗ Could not connect to server. Please try again.")}}function b(){E(null),g(),v("👋 You have been signed out.","info")}function g(){var o,r,a;const e=B(),t=document.getElementById("headerActions"),n=document.getElementById("sidebarAuth");if(!t)return;e?(t.innerHTML=`
      <button class="theme-toggle" id="themeToggle" title="Toggle theme">☀️</button>
      <div class="user-menu-wrap">
        <div class="user-avatar" id="userAvatarBtn" title="${e.name}">${e.name.charAt(0).toUpperCase()}</div>
        <div class="user-dropdown" id="userDropdown">
          <div class="user-dropdown-header">
            <strong>${e.name}</strong><span>${e.email}</span>
          </div>
          <a href="#">My Profile</a>
          <a href="#">Saved Results</a>
          <button class="logout-btn" id="logoutBtn">Sign Out</button>
        </div>
      </div>`,n&&(n.innerHTML=`
        <div style="padding:12px 14px;font-size:.82rem;color:rgba(255,255,255,.5);border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:8px;">
          <strong style="color:#fff;">${e.name}</strong><br>${e.email}
        </div>
        <button class="sidebar-btn sidebar-btn-login" id="sidebarLogout">Sign Out</button>`,(o=document.getElementById("sidebarLogout"))==null||o.addEventListener("click",b)),(r=document.getElementById("userAvatarBtn"))==null||r.addEventListener("click",()=>{var i;return(i=document.getElementById("userDropdown"))==null?void 0:i.classList.toggle("open")}),(a=document.getElementById("logoutBtn"))==null||a.addEventListener("click",b),document.addEventListener("click",i=>{var l;i.target.closest(".user-menu-wrap")||(l=document.getElementById("userDropdown"))==null||l.classList.remove("open")})):(t.innerHTML=`
      <button class="theme-toggle" id="themeToggle" title="Toggle theme">☀️</button>
      <button class="btn btn-outline" data-open="login">Sign In</button>
      <button class="btn btn-primary" data-open="register">Register</button>`,n&&(n.innerHTML=`
        <button class="sidebar-btn sidebar-btn-login" data-open="login">Sign In</button>
        <button class="sidebar-btn sidebar-btn-register" data-open="register">Register</button>`),document.querySelectorAll('[data-open="login"]').forEach(i=>i.addEventListener("click",p)),document.querySelectorAll('[data-open="register"]').forEach(i=>i.addEventListener("click",y)));const s=document.getElementById("themeToggle");if(s){const i=document.documentElement.getAttribute("data-theme")==="dark";s.textContent=i?"🌙":"☀️",s.addEventListener("click",A)}}function p(){var e;(e=document.getElementById("loginModal"))==null||e.classList.add("active"),f("login")}function u(){var e;(e=document.getElementById("loginModal"))==null||e.classList.remove("active")}function y(){var e;(e=document.getElementById("registerModal"))==null||e.classList.add("active"),f("register")}function m(){var e;(e=document.getElementById("registerModal"))==null||e.classList.remove("active")}function d(e,t,n){e&&(e.className=`modal-alert ${t} show`,e.innerHTML=n)}function f(e){const t=e==="login"?"loginAlert":"registerAlert",n=document.getElementById(t);n&&(n.className="modal-alert",n.textContent="")}function A(){const e=document.documentElement,t=e.getAttribute("data-theme")==="dark";e.setAttribute("data-theme",t?"light":"dark"),localStorage.setItem("theme",t?"light":"dark");const n=document.getElementById("themeToggle");n&&(n.textContent=t?"☀️":"🌙")}function v(e,t="info"){const n={success:"✓",error:"✗",info:"ℹ"},s=document.getElementById("toast");s&&(s.innerHTML=`<span class="toast-icon">${n[t]||"ℹ"}</span>${e}`,s.classList.add("show"),setTimeout(()=>s.classList.remove("show"),3500))}async function T(){try{const t=await(await fetch("/data/universities.json")).json();h(t.universities),x(t.universities),P(t.universities)}catch(e){console.error("Failed to load universities data:",e),document.getElementById("universitiesGrid").innerHTML=`
      <div class="search-no-results">
        <div class="icon">⚠️</div>
        <p>Failed to load university data. Please refresh the page.</p>
      </div>`}}function h(e,t=""){const n=document.getElementById("universitiesGrid");if(!n)return;const s=t?e.filter(o=>o.name.toLowerCase().includes(t.toLowerCase())||o.location.toLowerCase().includes(t.toLowerCase())||o.results.some(r=>r.title.toLowerCase().includes(t.toLowerCase()))):e;if(s.length===0){n.innerHTML=`
      <div class="search-no-results" style="grid-column:1/-1">
        <div class="icon">🔍</div>
        <p>No universities found matching "<strong>${t}</strong>"</p>
      </div>`;return}n.innerHTML=s.map(o=>C(o,t)).join(""),n.querySelectorAll(".uni-card-header").forEach(o=>{o.addEventListener("click",()=>{const r=o.closest(".uni-card"),a=r.classList.contains("expanded");n.querySelectorAll(".uni-card.expanded").forEach(i=>i.classList.remove("expanded")),a||r.classList.add("expanded")})}),n.querySelectorAll(".result-item").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.uniId),a=o.dataset.resultId,i=e.find(c=>c.id===r),l=i==null?void 0:i.results.find(c=>c.id===a);i&&l&&M(i,l)})})}function C(e,t=""){const n=e.results.length,s=e.results.map(o=>{const r=t?o.title.replace(new RegExp(`(${t})`,"gi"),'<mark style="background:rgba(37,99,235,0.2);color:inherit;border-radius:2px;">$1</mark>'):o.title;return`
      <div class="result-item" data-uni-id="${e.id}" data-result-id="${o.id}">
        <div class="result-item-left">
          <div class="result-title">${r}</div>
          <div class="result-date">📅 ${w(o.date)}</div>
        </div>
        <span class="result-status">${o.status}</span>
        <span class="result-arrow">→</span>
      </div>
    `}).join("");return`
    <div class="uni-card" data-uni-id="${e.id}">
      <div class="uni-card-header">
        <div class="uni-logo" style="background:${e.color}">${e.logo}</div>
        <div class="uni-info">
          <div class="uni-name">${e.name}</div>
          <div class="uni-location">📍 ${e.location}</div>
        </div>
        <span class="uni-results-count">${n}</span>
        <span class="uni-chevron">▼</span>
      </div>
      <div class="uni-dropdown">
        ${s}
      </div>
    </div>
  `}function M(e,t){var r,a,i;const n=document.getElementById("resultModal");if(!n)return;const s=t.url&&t.url.trim()!=="",o=s?'<button class="btn btn-primary" id="resultViewBtn">View Results ↗</button>':'<button class="btn btn-primary" disabled title="No link available" style="opacity:0.5;cursor:not-allowed;">View Results</button>';n.innerHTML=`
    <div class="modal result-modal">
      <button class="modal-close" id="resultModalClose">✕</button>
      <div class="modal-header">
        <div class="uni-logo" style="background:${e.color};width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:800;font-size:0.85rem;color:#fff;flex-shrink:0;">${e.logo}</div>
        <div>
          <span class="result-uni-badge" style="background:${e.color}">${e.name}</span>
        </div>
      </div>

      <h2 style="font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--text-primary);margin-bottom:6px;line-height:1.3;">${t.title}</h2>
      <p class="modal-sub">Result announcement details</p>

      <div class="result-modal-body">
        <p><strong>University:</strong> ${e.name}</p>
        <p><strong>Location:</strong> ${e.location}</p>
        <p><strong>Result Title:</strong> ${t.title}</p>
        <p><strong>Published Date:</strong> ${w(t.date)}</p>
        <p><strong>Status:</strong> <span style="color:#16a34a;font-weight:600;">${t.status}</span></p>
        ${s?`<p><strong>Link:</strong> <a href="${t.url}" target="_blank" rel="noopener noreferrer" style="color:var(--primary);word-break:break-all;">${t.url}</a></p>`:""}
      </div>

      <div class="result-modal-actions">
        ${o}
        <button class="btn btn-outline" id="resultModalCloseBtn">Close</button>
      </div>
    </div>
  `,n.classList.add("active"),s&&((r=document.getElementById("resultViewBtn"))==null||r.addEventListener("click",()=>{window.open(t.url,"_blank","noopener,noreferrer")})),n.addEventListener("click",l=>{l.target===n&&n.classList.remove("active")}),(a=document.getElementById("resultModalClose"))==null||a.addEventListener("click",()=>n.classList.remove("active")),(i=document.getElementById("resultModalCloseBtn"))==null||i.addEventListener("click",()=>n.classList.remove("active"))}function x(e){var n;const t=document.getElementById("heroSearch");t==null||t.addEventListener("input",s=>{h(e,s.target.value.trim())}),(n=document.getElementById("heroSearchBtn"))==null||n.addEventListener("click",()=>{var s;h(e,(t==null?void 0:t.value.trim())||""),(s=document.getElementById("universitiesSection"))==null||s.scrollIntoView({behavior:"smooth"})})}function P(e){const t=e.reduce((n,s)=>n+s.results.length,0);document.getElementById("statUniversities").textContent=e.length+"+",document.getElementById("statResults").textContent=t+"+"}function w(e){try{return new Date(e).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}catch{return e}}window.showToastFromWindow=v;function R(){const e=document.getElementById("sidebar"),t=document.getElementById("overlay"),n=document.getElementById("menuBtn"),s=document.getElementById("sidebarClose");function o(){e==null||e.classList.add("open"),t==null||t.classList.add("active"),document.body.style.overflow="hidden"}function r(){e==null||e.classList.remove("open"),t==null||t.classList.remove("active"),document.body.style.overflow=""}n==null||n.addEventListener("click",o),s==null||s.addEventListener("click",r),t==null||t.addEventListener("click",r),e==null||e.querySelectorAll("a").forEach(i=>{i.addEventListener("click",()=>{window.innerWidth<1024&&r()})}),document.addEventListener("keydown",i=>{i.key==="Escape"&&r()});const a=document.querySelectorAll(".sidebar-nav a[data-section]");window.addEventListener("scroll",()=>{let i="";document.querySelectorAll("section[id]").forEach(l=>{const c=l.offsetTop-120;window.scrollY>=c&&(i=l.id)}),a.forEach(l=>{l.classList.toggle("active",l.dataset.section===i)})})}const I=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-theme",I);document.addEventListener("DOMContentLoaded",()=>{k(),R(),T();const e=document.getElementById("themeToggle");e&&(e.textContent=I==="dark"?"🌙":"☀️"),document.querySelectorAll('a[href^="#"]').forEach(n=>{n.addEventListener("click",s=>{const o=document.querySelector(n.getAttribute("href"));o&&(s.preventDefault(),o.scrollIntoView({behavior:"smooth",block:"start"}))})});const t=new IntersectionObserver(n=>{n.forEach(s=>{s.isIntersecting&&(s.target.style.opacity="1",s.target.style.transform="translateY(0)")})},{threshold:.1});setTimeout(()=>{document.querySelectorAll(".uni-card, .notif-card").forEach((n,s)=>{n.style.opacity="0",n.style.transform="translateY(20px)",n.style.transition=`opacity 0.5s ease ${s*.06}s, transform 0.5s ease ${s*.06}s`,t.observe(n)})},300)});
