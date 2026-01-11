
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react"; // optional; see fallback below

export default function HeroPage() {
  const navigate = useNavigate();

  // Demo leaderboard data
  const leaderboardData = useRef([
    { name: "Aarav", score: 92 },
    { name: "Maya", score: 88 },
    { name: "Ishaan", score: 85 },
    { name: "Zara", score: 81 },
    { name: "Dev", score: 79 },
    { name: "Tanvi", score: 77 },
    { name: "Rohan", score: 74 },
    { name: "Swathi", score: 72 },
    { name: "Neha", score: 70 },
    { name: "Kabir", score: 68 },
  ]);

  // Render leaderboard rows
  useEffect(() => {
    const tbody = document.getElementById("leaderboardBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    leaderboardData.current
      .slice()
      .sort((a, b) => b.score - a.score)
      .forEach((row, idx) => {
        const tr = document.createElement("tr");
        const rank = idx + 1;
        const badgeClass =
          rank === 1
            ? "badge--gold"
            : rank === 2
            ? "badge--silver"
            : rank === 3
            ? "badge--bronze"
            : "";
        tr.innerHTML = `
          <td>#${rank}</td>
          <td>${row.name}</td>
          <td>${row.score}%</td>
          <td>${rank <= 3 ? '<span class="badge ${badgeClass}">Top ' + rank + '</span>' : ""}</td>
        `;
        tbody.appendChild(tr);
      });
  }, []);

  // Navigation helpers
  const openTestInNewTab = () => window.open("/test", "_blank", "noopener");
  const openLearningInNewTab = () => window.open("/learn", "_blank", "noopener");
  const goToGame = () => navigate("/game");        // same-tab
  const goToProfile = () => navigate("/profile");  // same-tab

  return (
    <>
      {/* Inline styles to keep everything self-contained */}
      <style>{`
        :root{
          --bg: #f0fbff;
          --bg-soft: #e8f9f1;
          --card: #e6f2ff;
          --accent: #9be7d9;
          --accent-2: #a3c4f3;
          --text: #0e2a36;
          --muted: #50708a;
          --danger: #f59fb0;
          --success: #94e2c6;
          --warning: #ffd6a5;
          --chip: #eafaf5;
          --chip-border: #cdeee2;
          --tag-bg: #edf4ff;
          --tag-border: #cfe1ff;
          --shadow: 0 6px 18px rgba(20, 52, 76, .08);
          --radius:16px;
          --radius-sm:12px;
          --radius-xs:10px;
          --border: #d9e9ff;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%}
        body{
          margin:0;
          font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue","Noto Sans",Arial;
          background:
            radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%),
            var(--bg);
          color:var(--text);
        }
        a{color:var(--accent)}

        /* Header (Hero) */
        header.hero{ padding:4px 16px 8px; position: relative; }
        .hero__wrap{
          max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.25fr 1fr;gap:32px;align-items:center;
          position: relative;
        }

        /* 🔝 Top-right user icon button */
        .hero__userbtn{
          position:absolute;
          top:10px;
          right:16px;
          z-index: 5;
        }
        .btn-icon{
          appearance:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:40px; height:40px;
          border-radius:999px;
          background:#fff;
          color:var(--text);
          border:1px solid var(--border);
          box-shadow:var(--shadow);
          cursor:pointer;
          transition: box-shadow .2s ease, transform .06s ease, border-color .2s ease;
        }
        .btn-icon:hover{ border-color: var(--accent-2); box-shadow: 0 8px 24px rgba(20,52,76,.12); }
        .btn-icon:active{ transform: scale(.98); }
        .btn-icon:focus{
          outline: none;
          box-shadow: 0 0 0 3px rgba(163,196,243,.30);
        }

        .brandline{ display:flex;align-items:center;gap:10px;margin-bottom:10px;color:var(--muted) }
        .logo-dot{
          width:16px;height:16px;border-radius:50%;
          background:linear-gradient(135deg, var(--accent), var(--accent-2));
          box-shadow:0 0 0 3px rgba(155, 231, 217, .25);
        }
        .appname { font-weight: 800; letter-spacing: .2px; font-size: 2.5rem; }
        .hero__intro{font-size:16px;color:var(--muted);margin:0 0 8px}
        .hero__title{font-weight:800;font-size:42px;line-height:1.1;margin:0 0 12px}
        .hero__subtitle{font-size:18px;color:var(--muted);margin:0 0 24px}
        .hero__cta{display:flex;gap:12px;flex-wrap:wrap}
        .btn{
          appearance:none;border:0;padding:14px 18px;border-radius:12px;font-weight:700;cursor:pointer;
          transition:transform .06s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease, color .2s ease;
        }
        .btn--primary{ background:var(--accent);color:#063a36; box-shadow:var(--shadow) }
        .btn--ghost{ background:transparent;color:var(--text);border:2px solid var(--accent-2) }
        .btn:active{ transform:scale(.98) }
        .hero__statbar{ margin-top:20px;display:flex;gap:16px;flex-wrap:wrap;color:var(--muted) }
        .statchip{
          background:var(--chip);
          color:#075a4e;
          border:1px solid var(--chip-border);
          padding:10px 12px;border-radius:999px;font-size:14px
        }

        /* Main grid sections */
        main{padding:24px}
        .grid{
          max-width:1100px;margin:0 auto;
          display:grid;grid-template-columns:repeat(3,1fr);gap:24px
        }
        @media (max-width:980px){ .hero__wrap{grid-template-columns:1fr} .grid{grid-template-columns:1fr} }
        .card{
          background:linear-gradient(180deg,var(--card),#f1fbf7);
          border:1px solid #d9e9ff;border-radius:var(--radius);
          box-shadow:var(--shadow);overflow:hidden;
        }
        .card__header{
          display:flex;align-items:center;gap:12px;padding:18px 18px 12px;border-bottom:1px solid #d9e9ff
        }
        .card__icon{
          width:36px;height:36px;display:grid;place-items:center;border-radius:10px;
          background:#d8f3dc;color:#164b37;font-weight:800
        }
        .card__title{font-size:20px;font-weight:700;margin:0}
        .card__body{padding:18px}
        .card__link{ display:block; text-decoration:none; color:inherit; }
        .card__link:hover{ background:rgba(255,255,255,0.2) }
        .card-cta{ display:inline-block; margin-top:8px; font-size:0.9rem; color:#2563eb; font-weight:600; }

        /* Leaderboard */
        .leaderboard{width:100%;border-collapse:collapse;margin-top:6px}
        .leaderboard th, .leaderboard td{
          text-align:left;padding:10px;border-bottom:1px solid #d9e9ff
        }
        .leaderboard tr:nth-child(1) td{background:#e9f6ff}
        .badge{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px}
        .badge--gold{background:#fff9db;color:#6a5200;border:1px solid #f3e38a}
        .badge--silver{background:#f1f3f5;color:#495057;border:1px solid #ced4da}
        .badge--bronze{background:#ffe9dd;color:#7a4a2b;border:1px solid #f0c3a3}

        footer{max-width:1100px;margin:28px auto;padding:0 24px;color:var(--muted)}

        .table-scroll { max-height: 240px; overflow-y: auto; overflow-x: hidden; border-radius: 12px; }
        .table-scroll thead th { position: sticky; top: 0; background: #e9f6ff; z-index: 1; }
      `}</style>

      {/* HERO */}
      <header className="hero" role="banner">
        <div className="hero__wrap">
          {/* 👤 Top-right profile button */}
          <div className="hero__userbtn">
            <button
              className="btn-icon"
              aria-label="Open user profile"
              title="Profile"
              onClick={goToProfile}
            >
              {/* If using lucide-react: */}
              <UserIcon size={20} />
              {/* If not using lucide, replace with a simple SVG:
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              */}
            </button>
          </div>

          <div>
            <div className="brandline" aria-label="Brand line">
              <span className="logo-dot" aria-hidden="true"></span>
              <span className="appname">Techlingo</span>
            </div>
            <p className="hero__intro">Hey folks,</p>
            <h1 className="hero__title">Master Tech Vocabulary, Faster.</h1>
            <p className="hero__subtitle">
              Learn, test, and climb the leaderboard with bite‑size lessons and gamified challenges.
            </p>
            <div className="hero__cta">
              {/* Start Learning → opens /learn in a new tab */}
              <button
                className="btn btn--primary"
                id="startLearningBtn"
                onClick={openLearningInNewTab}
                aria-label="Start Learning"
              >
                Start Learning
              </button>

              {/* Try a Quick Test → opens /test in a new tab */}
              <button
                className="btn btn--ghost"
                id="startQuickTestBtn"
                onClick={openTestInNewTab}
                aria-label="Try a Quick Test"
              >
                Try a Quick Test
              </button>
            </div>
            <div className="hero__statbar" aria-label="App stats">
              <span className="statchip">🔥 24 active learners</span>
              <span className="statchip">🏆 Avg. score: 76%</span>
              <span className="statchip">⏱️ Session: ~5 min</span>
            </div>
          </div>

          <div aria-hidden="true">
            {/* Decorative panel */}
            <div className="card" style={{ borderRadius: 28 }}>
              <div className="card__header">
                <div className="card__icon">FX</div>
                <h3 className="card__title" style={{ margin: 0 }}>Flashcards Preview</h3>
              </div>
              <div className="card__body">
                <div className="pill">
                  Term: <span className="kbd">API</span> • Difficulty: <strong>Easy</strong>
                </div>
                <p style={{ marginTop: 12, color: "#2b597a" }}>
                  A set of rules and definitions that let apps talk to each other.
                </p>
                <div className="progress" aria-label="Learning progress">
                  <span style={{ display: "block", height: "8px", background: "linear-gradient(90deg,#94e2c6,#a3c4f3)", width: "42%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN SECTIONS */}
      <main>
        <div className="grid" id="sectionsGrid">
          {/* Learning Section (description-only, opens in new tab) */}
          <section className="card" aria-labelledby="learningTitle">
            <div className="card__header">
              <div className="card__icon" aria-hidden="true">📚</div>
              <h2 className="card__title" id="learningTitle">Learning</h2>
            </div>

            {/* Entire body is a link that opens /learn in a new tab */}
            <a
              href="/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="card__body card__link"
              aria-label="Start Learning (opens in new tab)"
            >
              <p className="desc" style={{ marginTop: 0, color: "#1e4e79" }}>
                Learn core tech vocabulary through <strong>concise flashcards</strong> and spaced repetition.
                Click to start the <strong>Fundamentals</strong> track—no distractions, just the
                definition and an example to help you remember faster.
              </p>
              <span className="card-cta">Start Learning →</span>
            </a>
          </section>

          {/* Testing Section */}
          <section className="card" aria-labelledby="testingTitle">
            <div className="card__header">
              <div className="card__icon" aria-hidden="true">🧪</div>
              <h2 className="card__title" id="testingTitle">Testing</h2>
            </div>
            <div className="card__body">
              <p className="desc" style={{ marginTop: 0, color: "#1e4e79" }}>
                In the testing environment, you’ll see a <strong>definition or code snippet</strong> and pick the correct tech term
                (e.g., API, JWT, Docker). Your <strong>session score</strong> updates after every attempt, and you can move to the
                <strong> next question</strong> anytime.
              </p>

              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {/* ▶ Start → goes to GamingPage at /game (same tab) */}
                <button
                  className="btn btn--primary"
                  id="startGameBtn"
                  onClick={goToGame}
                  aria-label="Start Gaming Section"
                >
                  Start
                </button>

                
              </div>
            </div>
          </section>

          {/* Leaderboard Section */}
          <section className="card" aria-labelledby="leaderboardTitle">
            <div className="card__header">
              <div className="card__icon" aria-hidden="true">🏁</div>
              <h2 className="card__title" id="leaderboardTitle">Leaderboard</h2>
            </div>
            <div className="card__body">
              <div className="table-scroll">
                <table className="leaderboard" aria-label="Top learners">
                  <thead>
                    <tr><th>Rank</th><th>Name</th><th>Score</th><th>Badge</th></tr>
                  </thead>
                  <tbody id="leaderboardBody">{/* Rows injected by useEffect */}</tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <small>Techlingo • Learn, test, and lead with pastel blue &amp; green.</small>
      </footer>
    </>
  );
}
