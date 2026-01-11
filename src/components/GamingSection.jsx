
import React, { useEffect, useMemo, useRef, useState } from "react";

/** Pastel green & blue theme */
const THEME = {
  bg: "#f0fbff",
  card: "#e6f2ff",
  accent: "#9be7d9",
  accent2: "#a3c4f3",
  text: "#0e2a36",
  muted: "#50708a",
  chipBg: "#eafaf5",
  chipBorder: "#cdeee2",
};

const DUMMY_QUESTIONS = [
  {
    questionId: "q1",
    term: "API",
    definition: "A way for software applications to communicate",
    example: "Frontend uses it to fetch data from backend",
    choices: ["API", "JWT", "CI/CD", "DOM"],
    tip: "Think 'interface' between two systems",
  },
  {
    questionId: "q2",
    term: "JWT",
    definition: "A token format used for authentication",
    example: "Sent in Authorization header",
    choices: ["OAuth", "Cookie", "JWT", "Session ID"],
    tip: "Three parts separated by dots",
  },
  {
    questionId: "q3",
    term: "Docker",
    definition: "A containerization platform",
    example: "Ensures app runs same in all environments",
    choices: ["Kubernetes", "Docker", "VMware", "RabbitMQ"],
    tip: "Packages app + dependencies together",
  },
];

/** Utility: shuffle array */
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function GameSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("mcq"); // 'mcq' or 'type'
  const [timeLimit, setTimeLimit] = useState(20); // seconds per question
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [feedback, setFeedback] = useState(null); // {correct, answer}
  const [userAnswer, setUserAnswer] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timeLimit);
  const [mcqChoices, setMcqChoices] = useState([]);
  const submitBtnRef = useRef(null);

  const total = DUMMY_QUESTIONS.length;
  const currentQ = DUMMY_QUESTIONS[currentIndex];

  /** Prepare MCQ choices per question */
  useEffect(() => {
    if (mode === "mcq") {
      setMcqChoices(shuffle(currentQ.choices));
    }
  }, [currentIndex, mode]);

  /** Timer effect */
  useEffect(() => {
    if (!isPlaying) return;
    setSecondsLeft(timeLimit);
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying, currentIndex, timeLimit]);

  /** Auto-submit when time runs out */
  useEffect(() => {
    if (!isPlaying) return;
    if (secondsLeft <= 0 && !feedback) {
      // Treat as wrong if no answer
      handleJudge(null);
    }
  }, [secondsLeft, feedback, isPlaying]);

  /** Keyboard shortcuts */
  useEffect(() => {
    function onKey(e) {
      if (!isPlaying) return;
      if (e.key === "Enter" && submitBtnRef.current) {
        submitBtnRef.current.click();
      } else if (e.key.toLowerCase() === "h") {
        setHintShown(true);
      } else if (e.key.toLowerCase() === "s") {
        handleSkip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, userAnswer]);

  /** Judge answer (common for mcq/type and timeout) */
  function handleJudge(given) {
    const normalizedGiven =
      typeof given === "string" ? given.trim().toLowerCase() : (userAnswer || "").trim().toLowerCase();
    const isCorrect = normalizedGiven === currentQ.term.toLowerCase();

    setFeedback({ correct: isCorrect, answer: currentQ.term });

    // Update score and streak
    if (isCorrect) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }

    // Record attempt
    setAttempts((arr) => [
      ...arr,
      {
        questionId: currentQ.questionId,
        correct: isCorrect,
        given: normalizedGiven || "(no answer)",
        expected: currentQ.term,
        timeTaken: timeLimit - secondsLeft,
      },
    ]);

    // Delay and move next / finish
    const delay = isCorrect ? 1200 : 1800; // slightly longer on wrong
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
        setFeedback(null);
        setUserAnswer("");
        setHintShown(false);
      } else {
        // End
        setIsPlaying(false);
      }
    }, delay);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleJudge(userAnswer);
  }

  function handleSkip() {
    setFeedback({ correct: false, answer: currentQ.term });
    setStreak(0);
    setAttempts((arr) => [
      ...arr,
      {
        questionId: currentQ.questionId,
        correct: false,
        given: "(skipped)",
        expected: currentQ.term,
        timeTaken: timeLimit - secondsLeft,
      },
    ]);
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
        setFeedback(null);
        setUserAnswer("");
        setHintShown(false);
      } else {
        setIsPlaying(false);
      }
    }, 1000);
  }

  function restart() {
    setIsPlaying(true);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts([]);
    setFeedback(null);
    setUserAnswer("");
    setHintShown(false);
    setSecondsLeft(timeLimit);
  }

  /** Progress percentage */
  const progressPct = Math.round(((currentIndex) / total) * 100);

  /** Header / setup screen */
  if (!isPlaying) {
    return (
      <div className="container py-5" style={{ background: THEME.bg, borderRadius: 16 }}>
        <div
          className="card border-0 shadow-sm mx-auto"
          style={{ maxWidth: 720, borderRadius: 16, background: THEME.card, border: `1px solid ${THEME.accent2}` }}
        >
          <div className="card-body p-4">
            <h2 className="fw-bold mb-2" style={{ color: THEME.text }}>Tech Quiz</h2>
            <p style={{ color: THEME.muted }}>
              Test your knowledge with quick questions. Earn <strong>10 points</strong> per correct answer, keep a <strong>streak</strong>,
              and beat the timer!
            </p>

            {/* Mode & time settings */}
            <div className="row g-3 my-3">
              <div className="col-md-6">
                <label className="form-label" style={{ color: THEME.text }}>Mode</label>
                <select
                  className="form-select"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  style={{ border: `1px solid ${THEME.accent2}`, borderRadius: 10 }}
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="type">Type Answer</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: THEME.text }}>Time per Question (seconds)</label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  className="form-control"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  style={{ border: `1px solid ${THEME.accent2}`, borderRadius: 10 }}
                />
              </div>
            </div>

            <div className="alert" role="status" style={{ background: THEME.chipBg, border: `1px dashed ${THEME.chipBorder}` }}>
              <div className="small" style={{ color: THEME.muted }}>
                Shortcuts: <span className="fw-bold">Enter</span> submit, <span className="fw-bold">H</span> hint, <span className="fw-bold">S</span> skip
              </div>
            </div>

            <button
              className="btn fw-bold w-100 mt-2"
              onClick={() => setIsPlaying(true)}
              style={{ background: THEME.accent, color: "#063a36", borderRadius: 12, border: `2px solid ${THEME.accent2}` }}
            >
              Start Game
            </button>
          </div>
        </div>

        {/* Summary if there are previous attempts */}
        {attempts.length > 0 && (
          <div className="card border-0 shadow-sm mt-4 mx-auto" style={{ maxWidth: 720, borderRadius: 16 }}>
            <div className="card-body p-4">
              <h4 className="fw-bold" style={{ color: THEME.text }}>Last Run Summary</h4>
              <p className="mb-1" style={{ color: THEME.muted }}>
                Score: <strong>{score}</strong> • Correct: {attempts.filter(a => a.correct).length}/{total}
              </p>
              <ul className="small" style={{ color: THEME.muted }}>
                {attempts.map((a, i) => (
                  <li key={i}>
                    Q{i + 1}: expected <strong>{a.expected}</strong> • given <em>{a.given}</em> • time {a.timeTaken}s • {a.correct ? "✅" : "❌"}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline-primary"
                onClick={restart}
                style={{ borderRadius: 12, border: `2px solid ${THEME.accent2}`, color: THEME.text }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ background: THEME.bg, borderRadius: 16 }}>
      <div
        className="card border-0 shadow-lg mx-auto"
        style={{ maxWidth: 720, borderRadius: 20, background: THEME.card, border: `1px solid ${THEME.accent2}` }}
      >
        {/* Header: score, progress, streak, timer */}
        <div className="card-header bg-white border-0 p-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold" style={{ color: THEME.text }}>Score: {score}</span>
            <span className="text-muted">Question {currentIndex + 1}/{total}</span>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center">
            <span className="badge" style={{ background: THEME.accent, color: "#063a36", border: `1px solid ${THEME.chipBorder}` }}>
              Streak: {streak}
            </span>
            <span className="badge" style={{ background: THEME.accent2, color: "#063a36" }}>
              Time: {Math.max(secondsLeft, 0)}s
            </span>
          </div>

          {/* Progress bar */}
          <div className="progress mt-3" style={{ height: 8, background: "#e9f3fb", borderRadius: 999 }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${THEME.accent}, ${THEME.accent2})` }}
            />
          </div>
        </div>

        {/* Body: question */}
        <div className="card-body p-4 text-start">
          <h3 className="mb-3" style={{ color: THEME.text }}>{currentQ.definition}</h3>
          <div
            className="alert mb-4"
            style={{ background: THEME.chipBg, border: `1px dashed ${THEME.chipBorder}`, color: THEME.muted }}
          >
            <small className="d-block fw-bold text-uppercase" style={{ opacity: 0.7 }}>Example</small>
            {currentQ.example}
          </div>

          {/* Hints */}
          <div className="d-flex gap-2 mb-3">
            <button
              className="btn btn-sm fw-bold"
              onClick={() => setHintShown(true)}
              style={{ background: "transparent", color: THEME.text, borderRadius: 10, border: `2px solid ${THEME.accent2}` }}
            >
              Show Hint
            </button>
            <button
              className="btn btn-sm fw-bold"
              onClick={handleSkip}
              style={{ background: "transparent", color: THEME.text, borderRadius: 10, border: `2px solid ${THEME.accent2}` }}
            >
              Skip
            </button>
          </div>
          {hintShown && (
            <div className="alert alert-info py-2">
              <small>
                Hint: <em>{currentQ.tip}</em> • First letter: <strong>{currentQ.term[0]}</strong>
              </small>
            </div>
          )}

          {/* Answer: MCQ or Type */}
          {mode === "mcq" ? (
            <div className="row g-3">
              {mcqChoices.map((c) => (
                <div key={c} className="col-12 col-sm-6">
                  <button
                    className="btn w-100 fw-bold"
                    onClick={() => handleJudge(c)}
                    disabled={!!feedback}
                    style={{
                      background: "#ffffff",
                      color: THEME.text,
                      borderRadius: 12,
                      border: `2px solid ${THEME.accent2}`,
                    }}
                  >
                    {c}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                className="form-control form-control-lg mb-3 text-center"
                placeholder="Your Answer"
                value={userAnswer}
                disabled={!!feedback}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
                style={{ border: `1px solid ${THEME.accent2}`, borderRadius: 12 }}
              />
              <button
                ref={submitBtnRef}
                className="btn w-100 py-2 fw-bold"
                style={{ background: THEME.accent, color: "#063a36", borderRadius: 12, border: `2px solid ${THEME.accent2}` }}
                disabled={!!feedback}
              >
                Submit
              </button>
            </form>
          )}

          {/* Feedback */}
          {feedback && (
            <div
              className="mt-3 alert"
              role="status"
              style={{
                background: feedback.correct ? "#d8f3dc" : "#ffe9dd",
                color: feedback.correct ? "#164b37" : "#7a4a2b",
                border: `1px solid ${feedback.correct ? THEME.chipBorder : "#f0c3a3"}`,
              }}
            >
              {feedback.correct ? "✅ Correct!" : `❌ Wrong! It was ${feedback.answer}`}
            </div>
          )}
        </div>

        {/* Footer: controls */}
        <div className="card-footer bg-white border-0 p-3 d-flex gap-2">
          <button
            className="btn fw-bold"
            onClick={() => setIsPlaying(false)}
            style={{ background: "transparent", color: THEME.text, borderRadius: 12, border: `2px solid ${THEME.accent2}` }}
          >
            End Game
          </button>
          <button
            className="btn fw-bold"
            onClick={restart}
            style={{ background: THEME.accent, color: "#063a36", borderRadius: 12, border: `2px solid ${THEME.accent2}` }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
