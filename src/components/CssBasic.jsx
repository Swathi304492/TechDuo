
import React from "react";
import { Link } from "react-router-dom";

export default function CssBasics() {
  return (
    <div className="css-page">
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
        }

        .css-page{
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

        .title{ font-weight:800;font-size:36px;margin:8px 0 6px; }
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
        <h1 className="title">CSS Basics</h1>
        <p className="subtitle">
          CSS (Cascading Style Sheets) controls the <strong>look and layout</strong> of your HTML.
          Learn selectors, the box model, and modern layout systems like Flexbox and Grid.
        </p>

        {/* What you'll learn */}
        <div className="card">
          <div className="card__header">
            <span className="card__chip">Overview</span>
            <h2 className="card__title">What you’ll learn</h2>
          </div>
          <div className="card__body">
            <ul>
              <li>Selectors & specificity: target elements with <code>.class</code>, <code>#id</code>, and tags</li>
              <li>The Box Model: <code>margin</code>, <code>border</code>, <code>padding</code>, <code>content</code></li>
              <li>Colors, fonts, and units (<code>px</code>, <code>%</code>, <code>rem</code>)</li>
              <li>Flexbox for 1D layouts (navbars, cards)</li>
              <li>CSS Grid for 2D layouts (dashboards, galleries)</li>
            </ul>
          </div>
        </div>

        {/* Core concepts */}
        <section>
          <h3>Core CSS concepts</h3>
          <pre>{`/* Basic selectors */
body { font-family: Arial, sans-serif; }
h1 { color: #2b597a; }
.button-primary { background: #9be7d9; color: #063a36; }

/* Box model example */
.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #a3c4f3;
  margin: 12px;
}

/* Flexbox layout */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`}</pre>
        </section>

        {/* Practice */}
        <section>
          <h3>Try it yourself</h3>
          <ol>
            <li>Create a <code>style.css</code> file and link it in your HTML using <code>&lt;link&gt;</code>.</li>
            <li>Style the <code>body</code> with a font and background color.</li>
            <li>Add a <code>.card</code> class with padding, border, and margin.</li>
            <li>Create a navbar using Flexbox: <code>display: flex;</code>, <code>justify-content: space-between;</code>.</li>
            <li>Build a 3-column grid for your cards using <code>display: grid;</code> and <code>grid-template-columns</code>.</li>
          </ol>
        </section>

        {/* Footer actions */}
        <div className="footer-actions">
          <Link className="btn btn--primary" to="/learn/javascript-fundamentals">Next: JavaScript Fundamentals</Link>
          <Link className="btn btn--ghost" to="/learn">Back to Modules</Link>
        </div>
      </div>
    </div>
  );
}
