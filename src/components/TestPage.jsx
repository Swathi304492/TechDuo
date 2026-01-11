
// src/pages/TestPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Check, X, RefreshCcw, Award } from "lucide-react";

/**
 * QUICK TEST goals:
 * - At least one question for each topic.
 * - If you want more questions, add ?size=20 to the URL (optional).
 * - Data is local; you can move it to /src/data later or fetch from backend.
 */

// ------------------ Question bank (sample) ------------------
// Add/expand freely. Each item must have: id, topic, question, choices, answerIdx.
const QUESTION_BANK = [
  // API
  {
    id: "api-1",
    topic: "API",
    question: "What does an API primarily enable?",
    choices: [
      "Direct database access from client",
      "Communication between software components",
      "Real-time operating system scheduling",
      "Rendering HTML on the server",
    ],
    answerIdx: 1,
  },
  {
    id: "api-2",
    topic: "API",
    question: "Which HTTP method is most commonly used to create a resource?",
    choices: ["GET", "POST", "PUT", "DELETE"],
    answerIdx: 1,
  },

  // Security
  {
    id: "sec-1",
    topic: "Security",
    question: "JWT is commonly used for:",
    choices: [
      "Encoding and obfuscating passwords",
      "Session tokens / stateless auth",
      "Encrypting database records",
      "Compiling client-side code",
    ],
    answerIdx: 1,
  },
  {
    id: "sec-2",
    topic: "Security",
    question: "Which is best practice for password storage?",
    choices: ["Plain text", "Base64", "Hash with salt (e.g., bcrypt)", "Symmetric encryption"],
    answerIdx: 2,
  },

  // DevOps
  {
    id: "devops-1",
    topic: "DevOps",
    question: "CI/CD primarily aims to:",
    choices: [
      "Deploy rarely with big batches",
      "Automate integration and frequent delivery",
      "Eliminate testing",
      "Replace version control",
    ],
    answerIdx: 1,
  },
  {
    id: "devops-2",
    topic: "DevOps",
    question: "Docker is best described as:",
    choices: [
      "A virtual machine manager",
      "A container platform for packaging apps",
      "A code obfuscation tool",
      "A server-side rendering engine",
    ],
    answerIdx: 1,
  },

  // Cloud
  {
    id: "cloud-1",
    topic: "Cloud",
    question: "IaaS typically provides:",
    choices: [
      "Managed code repositories",
      "Bare metal servers only",
      "Virtualized compute, storage, networking",
      "Only fully managed databases",
    ],
    answerIdx: 2,
  },
  {
    id: "cloud-2",
    topic: "Cloud",
    question: "Which is a serverless compute option?",
    choices: ["EC2", "Lambdas/Functions", "Kubernetes nodes", "Bare metal"],
    answerIdx: 1,
  },

  // Data
  {
    id: "data-1",
    topic: "Data",
    question: "Indexes in databases are primarily used to:",
    choices: ["Compress data", "Speed up queries", "Encrypt tables", "Partition storage"],
    answerIdx: 1,
  },
  {
    id: "data-2",
    topic: "Data",
    question: "ACID in databases ensures:",
    choices: [
      "High compression ratios",
      "Transaction reliability properties",
      "Faster network calls",
      "Automatic schema generation",
    ],
    answerIdx: 1,
  },

  // Web
  {
    id: "web-1",
    topic: "Web",
    question: "CORS controls:",
    choices: [
      "Compression levels",
      "Cross-origin resource sharing permissions",
      "Database transaction isolation",
      "Client-side routing only",
    ],
    answerIdx: 1,
  },
  {
    id: "web-2",
    topic: "Web",
    question: "HTTP status 201 means:",
    choices: [
      "OK",
      "Created",
      "No Content",
      "Moved Permanently",
    ],
    answerIdx: 1,
  },

  // Git
  {
    id: "git-1",
    topic: "Git",
    question: "`git rebase` is often used to:",
    choices: [
      "Rewrite commit history onto a new base",
      "Delete a branch on remote",
      "Create a merge commit",
      "Tag a release",
    ],
    answerIdx: 0,
  },
  {
    id: "git-2",
    topic: "Git",
    question: "A pull request is primarily for:",
    choices: [
      "Force pushing changes",
      "Requesting review/merge of changes",
      "Cloning a repository",
      "Resetting HEAD",
    ],
    answerIdx: 1,
  },

  // Testing
  {
    id: "test-1",
    topic: "Testing",
    question: "Unit tests focus on:",
    choices: [
      "End-to-end user flows",
      "Single functions/components in isolation",
      "Production observability",
      "Network throughput tests",
    ],
    answerIdx: 1,
  },
  {
    id: "test-2",
    topic: "Testing",
    question: "Which test runs closest to real user behavior?",
    choices: ["Unit", "Integration", "E2E", "Static analysis"],
    answerIdx: 2,
  },
];

// ------------------ Utilities ------------------
const groupByTopic = (items) =>
  items.reduce((acc, q) => {
    acc[q.topic] = acc[q.topic] || [];
    acc[q.topic].push(q);
    return acc;
  }, {});

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Build a "quick test" that covers all topics.
 * - Guarantees at least 1 question per topic.
 * - If size param is larger than topic count, it fills the rest randomly.
 */
function buildQuickTest(bank, size) {
  const byTopic = groupByTopic(bank);
  const topics = Object.keys(byTopic);
  const base = topics.flatMap((t) => {
    const pick = shuffle(byTopic[t])[0];
    return pick ? [pick] : [];
  });

  let pool = bank.filter((q) => !base.find((b) => b.id === q.id));
  const targetSize = Math.max(base.length, size || base.length);
  while (base.length < targetSize && pool.length) {
    const [next, ...rest] = shuffle(pool);
    base.push(next);
    pool = rest;
  }
  return shuffle(base);
}

// ------------------ UI ------------------
export default function TestPage() {
  // read ?size= param (optional)
  const [desiredSize, setDesiredSize] = useState(() => {
    const usp = new URLSearchParams(window.location.search);
    const v = parseInt(usp.get("size"), 10);
    return Number.isFinite(v) ? Math.max(QUESTION_BANK.length ? 1 : 0, v) : undefined;
  });

  const quiz = useMemo(
    () => buildQuickTest(QUESTION_BANK, desiredSize),
    [desiredSize]
  );

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { id, chosenIdx, correct }
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const total = quiz.length;
  const current = quiz[index];

  useEffect(() => {
    // Reset selection on question change
    setSelected(null);
  }, [index]);

  const submitAnswer = () => {
    if (selected === null) return;
    const correct = current.answerIdx === selected;
    setAnswers((prev) => [
      ...prev,
      { id: current.id, chosenIdx: selected, correct, topic: current.topic },
    ]);
    if (index + 1 < total) setIndex((i) => i + 1);
    else setShowResult(true);
  };

  const score = answers.filter((a) => a.correct).length;
  const percent = total ? Math.round((score / total) * 100) : 0;

  const restart = () => {
    // Rebuild quiz (shuffle) by nudging state
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setDesiredSize((s) => (s ? s + 0 : undefined === s ? undefined : s)); // no-op to trigger memo
  };

  const topics = useMemo(() => Object.keys(groupByTopic(QUESTION_BANK)), []);
  const answeredByTopic = useMemo(() => groupByTopic(answers), [answers]);

  return (
    <>
      <style>{`
        :root{
          --bg: #f0fbff;
          --bg-soft: #e8f9f1;
          --card: #e6f2ff;
          --accent: #9be7d9;
          --accent-2: #a3c4f3;
          --text: #0e2a36;
          --muted: #50708a;
          --success: #94e2c6;
          --danger: #f59fb0;
          --shadow: 0 8px 24px rgba(20, 52, 76, .12);
          --radius: 24px;
          --border: #d9e9ff; --input-border: #cfe1ff;
        }
        html, body, #root { height: 100% }
        body{
          margin:0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue","Noto Sans", Arial;
          color: var(--text);
          background:
            radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%),
            var(--bg);
        }
        .wrap{ min-height:100vh; display:flex; flex-direction:column; }
        header{
          max-width:1100px; margin: 16px auto 0; padding: 0 16px;
          display:flex; align-items:center; gap:12px; color: var(--muted);
        }
        .back{ display:inline-flex; align-items:center; gap:6px; color:#2563eb; text-decoration:none; font-weight:600; }
        main{ max-width:900px; margin: 12px auto; padding: 16px; }
        .card{ background:linear-gradient(180deg,var(--card),#f1fbf7); border:1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 20px; }
        .title{ margin:0 0 6px; font-size:22px; font-weight:800; color:#1e293b }
        .sub{ margin:0 0 12px; color: var(--muted) }
        .progress{ height:10px; background:#e9f6ff; border-radius:999px; overflow:hidden; margin:12px 0 16px; border:1px solid var(--border) }
        .bar{ height:100%; background:linear-gradient(90deg, var(--success), var(--accent-2)); width:0 }
        .q{ font-size:18px; font-weight:700; margin:8px 0 12px; color:#0e2a36 }
        .choices{ display:grid; gap:10px }
        .choice{
          text-align:left; padding:12px 14px; border-radius:12px; border:2px solid var(--input-border); background:#fff; cursor:pointer; font-weight:600;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .choice:hover{ border-color: var(--accent-2) }
        .choice.selected{ border-color: var(--accent-2); box-shadow:0 0 0 3px rgba(163,196,243,.25) }
        .actions{ display:flex; gap:12px; margin-top:16px; }
        .btn{ padding:12px 16px; border-radius:12px; border:0; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px }
        .btn-primary{ background:linear-gradient(135deg, var(--accent), var(--accent-2)); color:#063a36 }
        .pill{ display:inline-block; padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid var(--border); background:#fff; color:#0e2a36 }
        .result-grid{ display:grid; grid-template-columns: 1fr; gap:16px; }
        .statbox{ display:flex; align-items:center; gap:10px; padding:12px; background:#fff; border-radius:12px; border:1px solid var(--border) }
        .topic-list{ display:grid; gap:8px; }
        .topic-chip{ display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:#fff; border:1px solid var(--border); border-radius:999px; }
        .good{ background:#e8fff6; border-color:#b9f3db }
        .bad{ background:#ffe9ee; border-color:#f3b6c2 }
        .note{ color: var(--muted); font-size: 13px; margin-top: 4px }
        .toolbar{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:8px; color: var(--muted) }
        .size-input{ width:80px; padding:8px 10px; border-radius:10px; border:2px solid var(--input-border); background:#fff; }
      `}</style>

      <div className="wrap">
        <header>
          <a className="back" href="/hero" onClick={(e) => { e.preventDefault(); window.history.length > 1 ? window.history.back() : window.location.assign("/hero"); }}>
            <ArrowLeft size={18} /> Back
          </a>
          <span className="pill">Quick Test • covers all topics</span>
        </header>

        <main>
          {!showResult ? (
            <div className="card" role="group" aria-label="Quick Test">
              <div className="toolbar">
                <span>Topics covered: <strong>{new Set(QUESTION_BANK.map(q => q.topic)).size}</strong></span>
                <span>Questions in this run: <strong>{quiz.length}</strong></span>
                <span className="note">You can change size with <code>?size=20</code> (optional)</span>
              </div>

              <h2 className="title">Question {index + 1} of {quiz.length}</h2>
              <p className="sub">Topic: <strong>{current.topic}</strong></p>

              <div className="progress" aria-label="Progress">
                <div className="bar" style={{ width: `${Math.round(((index) / quiz.length) * 100)}%` }} />
              </div>

              <div className="q">{current.question}</div>
              <div className="choices">
                {current.choices.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`choice ${selected === i ? "selected" : ""}`}
                    onClick={() => setSelected(i)}
                    aria-pressed={selected === i}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="actions">
                <button className="btn btn-primary" onClick={submitAnswer} disabled={selected === null}>
                  {index + 1 === total ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="card" role="region" aria-label="Test Results">
              <h2 className="title">Your Results</h2>
              <p className="sub">You answered <strong>{score}</strong> out of <strong>{total}</strong> correctly.</p>

              <div className="result-grid">
                <div className="statbox">
                  <Award size={20} color="#0a7a66" />
                  <div>
                    <div style={{ fontWeight: 700 }}>Score: {percent}%</div>
                    <div className="note">All topics were covered in this quick test.</div>
                  </div>
                </div>

                <div className="topic-list">
                  {topics.map((t) => {
                    const items = answeredByTopic[t] || [];
                    const totalT = quiz.filter(q => q.topic === t).length || 1;
                    const correctT = items.filter((i) => i.correct).length;
                    const ok = correctT / totalT >= 0.5; // arbitrary threshold for chip color
                    return (
                      <div key={t} className={`topic-chip ${ok ? "good" : "bad"}`}>
                        <span><strong>{t}</strong></span>
                        <span>{correctT}/{totalT} correct</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="actions" style={{ marginTop: 16 }}>
                <button className="btn btn-primary" onClick={restart}>
                  <RefreshCcw size={18} /> Retake Quick Test
                </button>
                <a className="btn" style={{ background:"#fff", border:"1px solid var(--border)" }} href="/hero">
                  <ArrowLeft size={18} /> Back to Home
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
