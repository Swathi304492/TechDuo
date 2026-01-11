
// src/topics/HtmlBasics.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HtmlBasics() {
  return (
    <div className="html-page">
      {/* 🔹 Theme: reusing the pastel blue/green variables from HeroPage */}
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

        .html-page{
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

        /* Header area */
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

        /* Title */
        .title{
          font-weight:800;font-size:36px;line-height:1.1;margin:8px 0 6px;
        }
        .subtitle{
          margin:0 0 18px; color:var(--muted);
        }

        /* Card */
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
        .card__title{
          margin:0;font-size:20px;font-weight:800;color:var(--text);
        }
        .card__body{ padding:18px; }

        /* Sections */
        section + section { margin-top: 18px; }
        h3{ font-weight:800; font-size:20px; margin:0 0 10px; }

        /* Code block */
        pre{
          padding:14px 16px; border-radius:12px; background:#ffffff; border:1px dashed var(--chip-border);
          font-size:14px; white-space:pre-wrap; color:#073c4d;
        }
        code{ background: #edf4ff; border: 1px solid #cfe1ff; border-radius:6px; padding: 2px 6px; }

        /* Lists */
        ul, ol{ margin: 0 0 8px 20px; }
        li{ margin: 6px 0; }

        /* Callout */
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

        /* Footer nav */
        .footer-actions{ display:flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
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
        <h1 className="title">HTML Basics</h1>
        <p className="subtitle">
          HTML structures your page with meaningful, <strong>semantic</strong> tags and accessible content
          so people and assistive tech (like screen readers) can understand it.
        </p>

        {/* What you'll learn */}
        <div className="card">
          <div className="card__header">
            <span className="card__chip">Overview</span>
            <h2 className="card__title">What you’ll learn</h2>
          </div>
          <div className="card__body">
            <ul>
              <li>Page landmarks: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code></li>
              <li>Headings hierarchy: <code>h1</code> → <code>h6</code> (one <code>h1</code> per page)</li>
              <li>Accessible images: descriptive <code>alt</code> text and optional <code>&lt;figure&gt;</code>/<code>&lt;figcaption&gt;</code></li>
              <li>Links & lists: <code>&lt;a&gt;</code>, <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code></li>
              <li>Basic forms: <code>&lt;form&gt;</code>, <code>&lt;label&gt;</code>, <code>&lt;input&gt;</code></li>
            </ul>
          </div>
        </div>

        {/* Semantic skeleton */}
        <section>
          <h3>Semantic page skeleton</h3>
          <p className="helper">Use these landmarks to make structure clear for users and screen readers.</p>
          <pre>{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Site</title>
  </head>
  <body>
    <header>
      <h1>My Site</h1>
      <nav aria-label="Primary">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h2>Welcome</h2>
        <p>HTML gives structure to your content.</p>

        <figure>
          <img src="cat.png" alt="A playful tabby cat sitting on a keyboard" />
          <figcaption>Our friendly mascot.</figcaption>
        </figure>
      </article>

      <aside aria-label="Sidebar">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#learn">Learn HTML</a></li>
          <li><a href="#more">More resources</a></li>
        </ul>
      </aside>
    </main>

    <footer>
      <small>© 2026 My Site</small>
    </footer>
  </body>
</html>`}</pre>
        </section>

        {/* Accessibility essentials */}
        <section>
          <h3>Accessibility essentials</h3>
          <div className="callout">
            <ul>
              <li><strong>Alt text:</strong> describe the intent of images (<code>alt=""</code> for pure decoration).</li>
              <li><strong>Headings:</strong> don’t skip levels for visual size—use CSS to style.</li>
              <li><strong>Labels:</strong> pair <code>&lt;label for="id"&gt;</code> with the matching input <code>id</code>.</li>
              <li><strong>Landmarks:</strong> keep a single <code>&lt;main&gt;</code> per page.</li>
            </ul>
          </div>
          <pre>{`<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Subscribe</button>
</form>`}</pre>
        </section>

        {/* Practice */}
        <section>
          <h3>Try it yourself</h3>
          <ol>
            <li>Create <code>index.html</code> and add <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code>.</li>
            <li>Inside <code>&lt;main&gt;</code>, add an <code>&lt;article&gt;</code> with an <code>h2</code> and a paragraph.</li>
            <li>Add an image with meaningful <code>alt</code> text; optionally wrap in <code>&lt;figure&gt;</code>/<code>&lt;figcaption&gt;</code>.</li>
            <li>Include a <code>&lt;nav&gt;</code> with two links.</li>
          </ol>
        </section>

        {/* Footer actions */}
        <div className="footer-actions">
          <Link className="btn btn--primary" to="/learn/css-basics">Next: CSS Basics</Link>
          <Link className="btn btn--ghost" to="/learn">Back to Modules</Link>
        </div>
      </div>
    </div>
  );
}
