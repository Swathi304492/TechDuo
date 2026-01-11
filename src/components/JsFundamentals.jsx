
import React from "react";
import { Link } from "react-router-dom";

export default function JsFundamentals() {
  return (
    <div className="js-page">
      <style>{`
        :root{
          --bg: #f0fbff;
          --bg-soft: #e8f9f1;
          --card: #e6f2ff;
          --accent: #9be7d9;
          --accent-2: #a3c4f3;
          --text: #0e2a36;
          --muted: #50708a;
          --chip: #eafaf5;
          --chip-border: #cdeee2;
          --border: #d9e9ff;
          --shadow: 0 6px 18px rgba(20, 52, 76, .08);
          --radius:16px;
          --radius-sm:12px;
          --radius-xs:10px;
        }

        .js-page{
          min-height:100%;
          background:
            radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%),
            var(--bg);
          color:var(--text);
        }

        .container{
          max-width: 980px;
          margin: 0 auto;
          padding: 28px 20px 40px;
        }

        .topbar{
          display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;
        }
        .backbtn{
          appearance:none;border:2px solid var(--accent-2);
          background:transparent;color:var(--text);
          border-radius:12px;padding:10px 14px;font-weight:700;cursor:pointer;
          transition: box-shadow .2s ease, transform .06s ease, border-color .2s ease;
        }
        .backbtn:hover{ box-shadow:var(--shadow); border-color: var(--accent); }
        .level-badge{
          display:inline-block;padding:6px 12px;border-radius:999px;
          background: var(--accent); color:#063a36; font-weight:700; border:1px solid var(--chip-border);
        }

        .title{ font-weight:800;font-size:36px;line-height:1.1;margin:8px 0 6px; }
        .subtitle{ margin:0 0 18px; color:var(--muted); }

        .card{
          background:linear-gradient(180deg,var(--card),#f1fbf7);
          border:1px solid var(--border);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          overflow:hidden;
        }
        .card__header{
          display:flex;align-items:center;gap:10px;padding:16px;border-bottom:1px solid var(--border);
        }
        .card__chip{
          background:var(--chip); color:#075a4e;
          border:1px solid var(--chip-border); padding:6px 10px; border-radius:999px; font-size:13px; font-weight:700;
        }
        .card__title{ margin:0;font-size:20px;font-weight:800;color:var(--text); }
        .card__body{ padding:18px; }

        section + section { margin-top: 18px; }
        h3{ font-weight:800; font-size:20px; margin:0 0 10px; }

        pre{
          padding:14px 16px; border-radius:12px; background:#ffffff; border:1px dashed var(--chip-border);
          font-size:14px; white-space:pre-wrap; color:#073c4d;
        }
        code{ background:#edf4ff; border:1px solid #cfe1ff; border-radius:6px; padding:2px 6px; }

        ul, ol{ margin:0 0 8px 20px; }
        li{ margin:6px 0; }

        .callout{
          background: var(--chip);
          border: 1px dashed var(--chip-border);
          border-radius: 12px;
          padding: 12px 14px;
          color: #064a41;
        }
        .helper{
          color: var(--muted);
          font-size: 14px;
        }

        .footer-actions{ display:flex; gap:12px; margin-top:16px; flex-wrap:wrap; }
        .btn{
          appearance:none;border:0;padding:12px 16px;border-radius:12px;font-weight:700;cursor:pointer;
          transition:transform .06s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease, color .2s ease;
        }
        .btn--primary{ background:var(--accent);color:#063a36;box-shadow:var(--shadow); border:2px solid var(--accent-2); }
        .btn--ghost{ background:transparent;color:var(--text);border:2px solid var(--accent-2); }
        .btn:active{ transform: scale(.98); }
      `}</style>

      <div className="container">
        {/* Top bar */}
        <div className="topbar">
          <Link to="/learn" className="backbtn">← Back to Study Modules</Link>
          <span className="level-badge">Basic</span>
        </div>

        {/* Title */}
        <h1 className="title">JavaScript Fundamentals</h1>
        <p className="subtitle">
          JavaScript adds <strong>behavior</strong> to your pages—react to clicks, change the DOM,
          fetch data, and more. Start with variables, functions, arrays/objects, and events.
        </p>

        {/* What you'll learn */}
        <div className="card">
          <div className="card__header">
            <span className="card__chip">Overview</span>
            <h2 className="card__title">What you’ll learn</h2>
          </div>
          <div className="card__body">
            <ul>
              <li>Variables &amp; scope: <code>let</code>, <code>const</code> vs <code>var</code></li>
              <li>Functions: declarations, expressions, and arrow functions</li>
              <li>Arrays &amp; objects: storing and organizing data</li>
              <li>DOM manipulation: query, update, create elements</li>
              <li>Events: add click handlers to make UI interactive</li>
            </ul>
          </div>
        </div>

        {/* Core concepts */}
        <section>
          <h3>Core JavaScript concepts</h3>
          <p className="helper">A small, practical example showing variables, arrays/objects, DOM and events.</p>
          <pre>{`// Variables
const appName = "Techlingo";
let score = 0;       // can change over time
// var (older) is function-scoped—prefer let/const for modern code

// Functions
function greet(name) {
  return \`Welcome, \${name}!\`;
}

// Arrow function (short form)
const add = (a, b) => a + b;

// Arrays & objects
const learners = ["Aarav", "Maya", "Ishaan"];
const user = { name: "Swathi", level: "Basic", completed: 3 };

// DOM selection & update
const titleEl = document.querySelector("#title");   // <h1 id="title">...</h1>
titleEl.textContent = appName + " — JavaScript Fundamentals";

// Create and add a new list item
const listEl = document.querySelector("#learnerList");
const li = document.createElement("li");
li.textContent = learners[0]; // "Aarav"
listEl.appendChild(li);

// Event: button click handler
const btn = document.querySelector("#incrementBtn");
btn.addEventListener("click", () => {
  score = add(score, 1);
  document.querySelector("#score").textContent = score;
});`}</pre>
        </section>

        {/* Minimal HTML to test the JS snippet */}
        <section>
          <h3>Test markup to go with the script</h3>
          <pre>{`<!-- Add this to your HTML page -->
<h1 id="title">Placeholder</h1>
<ul id="learnerList"></ul>
<p>Score: <span id="score">0</span></p>
<button id="incrementBtn">Increment</button>

<!-- Link your script file -->
<script src="app.js"></script>`}</pre>
        </section>

        {/* Tips */}
        <section>
          <h3>Tips &amp; best practices</h3>
          <div className="callout">
            <ul>
              <li><strong>Use <code>const</code></strong> for values that don’t change; <strong><code>let</code></strong> otherwise.</li>
              <li><strong>Keep functions small</strong>: one job per function.</li>
              <li><strong>Check for <code>null</code></strong> when querying DOM: <code>document.querySelector(...)</code> may return <code>null</code>.</li>
              <li><strong>Prefer addEventListener</strong> over inline <code>onclick</code> attributes.</li>
              {/* ✅ Fix here: render literal template string safely */}
              <li><strong>Use template strings</strong> (<code>{'`${value}`'}</code>) for readable string building.</li>
            </ul>
          </div>
        </section>

        {/* Practice */}
        <section>
          <h3>Try it yourself</h3>
          <ol>
            <li>Create <code>app.js</code> and paste the “Core JavaScript concepts” snippet.</li>
            <li>Build the test HTML in your page and open it in the browser.</li>
            <li>Click the <strong>Increment</strong> button—watch the score update.</li>
            <li>Add another button to <em>reset</em> score to 0 (write a small function that sets and renders).</li>
            <li>Create an object called <code>course</code> with <code>title</code> and <code>topics</code> (array). Render topics into a list.</li>
          </ol>
        </section>

        {/* Footer actions */}
        <div className="footer-actions">
          <Link className="btn btn--primary" to="/learn">Back to Modules</Link>
          <Link className="btn btn--ghost" to="/learn/html-basics">← Review HTML Basics</Link>
          <Link className="btn btn--ghost" to="/learn/css-basics">← Review CSS Basics</Link>
        </div>
      </div>
    </div>
  );
}
