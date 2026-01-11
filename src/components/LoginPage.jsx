
// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, ArrowRight, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  // View state: "login" or "signup"
  const [view, setView] = useState("login");

  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);

  // Signup form
  const [sgName, setSgName] = useState("");
  const [sgEmail, setSgEmail] = useState("");
  const [sgPassword, setSgPassword] = useState("");
  const [sgConfirm, setSgConfirm] = useState("");
  const [sgShowPw, setSgShowPw] = useState(false);
  const [sgShowConfirmPw, setSgShowConfirmPw] = useState(false);

  // Errors & server messages
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Shared palette & styles (aligned with your HeroPage)
  const styleVars = `
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
      --shadow: 0 8px 24px rgba(20, 52, 76, .12);
      --radius: 24px; --radius-sm: 14px; --radius-xs: 10px;
      --border: #d9e9ff; --input-border: #cfe1ff;
    }
    html, body, #root { height:100% }
    body {
      margin:0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue","Noto Sans", Arial;
      color: var(--text);
      background:
        radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%),
        var(--bg);
    }
    .login-wrap{ min-height:100vh; display:grid; place-items:center; position:relative; overflow:hidden }
    .bg-blobs{ position:absolute; inset:0; pointer-events:none; opacity:.18 }
    .blob{ position:absolute; border-radius:50%; filter:blur(120px) }
    .blob--a{ width:620px; height:620px; background:var(--accent-2); top:-16%; right:-10% }
    .blob--b{ width:520px; height:520px; background:var(--accent); bottom:-16%; left:-12% }
    .card{
      width: 480px; background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px); border-radius: var(--radius);
      box-shadow: var(--shadow); border:1px solid var(--border);
      position: relative;
    }
    .card__accent{ height:6px; background: linear-gradient(90deg, var(--accent), var(--accent-2)); border-radius: 24px 24px 0 0 }
    .card__body{ padding:32px }
    .logo-dot{ width:64px; height:64px; border-radius:50%; display:grid; place-items:center; margin:0 auto 14px;
               background:linear-gradient(135deg, var(--accent), var(--accent-2)); box-shadow:0 8px 14px rgba(20,52,76,.12) }
    .brand{ text-align:center; margin-bottom: 6px }
    .brand h1{ margin:0 0 6px; font-size:32px; font-weight:800; color:#1e293b }
    .brand p{ margin:0; color: var(--muted) }
    .tabs{ display:flex; gap:8px; justify-content:center; margin:16px 0 8px }
    .tab{
      padding:10px 14px; border-radius:999px; font-weight:700; font-size:14px; cursor:pointer;
      border:1px solid var(--border); color:var(--text); background:#fff;
    }
    .tab.active{ color:#063a36; background:linear-gradient(135deg, var(--accent), var(--accent-2)) }
    .form-label{ font-weight:600; color:#475569; font-size:14px; margin-bottom:6px; display:flex; align-items:center; gap:8px }
    .input{
      width:100%; padding:14px; border-radius:12px;
      border: 2px solid var(--input-border); font-size:15px; background:#fff;
      transition: border-color .2s ease, box-shadow .2s ease;
    }
    .input:focus{ outline:none; border-color: var(--accent-2); box-shadow: 0 0 0 3px rgba(163,196,243,.25) }
    .input-group{ position:relative }
    .pw-toggle{
      position:absolute; right:10px; top:50%; transform:translateY(-50%);
      background: transparent; border:0; cursor:pointer; padding:6px; border-radius:10px; color:#0e2a36;
    }
    .hint{ color: var(--muted); font-size:12px; margin-top:6px }
    .hint--admin { color:#0b5b4f; background:#eafaf5; border:1px solid #cdeee2; padding:6px 10px; border-radius:999px; display:inline-block; margin-top:8px }
    .error{ color:#7a1a1a; background:#ffe5ea; border:1px solid #f3b6c2; padding:8px 10px; border-radius:10px; font-size:13px; margin-top:8px }
    .server{ color:#5b1d21; background:#ffe1e6; border:1px solid #f3b6c2; padding:10px 12px; border-radius:10px; margin-bottom:12px }
    .row{ margin-bottom: 14px }
    .row-flex{ display:flex; align-items:center; justify-content:space-between; margin-top: 10px }
    .checkbox{ display:flex; align-items:center; gap:8px; color: var(--muted); font-size:14px }
    .link{ color:#2563eb; text-decoration:none; font-weight:600 }
    .link:hover{ text-decoration:underline }
    .btn{
      appearance:none; border:0; width:100%; padding: 14px 18px;
      border-radius:12px; font-weight:700; cursor:pointer;
      transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
      background: linear-gradient(135deg, var(--accent), var(--accent-2)); color:#063a36; box-shadow: var(--shadow);
      display:flex; align-items:center; justify-content:center; gap:10px;
    }
    .btn:active{ transform: scale(.98) }
    .footer{ text-align:center; margin-top:18px; padding-top:14px; border-top:1px solid var(--border); color: var(--muted) }
    .switchline{ text-align:center; margin-top:12px; color: var(--muted); font-size:14px }
  `;

  const validateLogin = () => {
    const next = {};
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateSignup = () => {
    const next = {};
    if (!sgName.trim()) next.sgName = "Name is required.";
    if (!sgEmail) next.sgEmail = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sgEmail)) next.sgEmail = "Please enter a valid email.";
    if (!sgPassword) next.sgPassword = "Password is required.";
    else if (sgPassword.length < 6) next.sgPassword = "Use at least 6 characters.";
    if (!sgConfirm) next.sgConfirm = "Please confirm your password.";
    else if (sgPassword !== sgConfirm) next.sgConfirm = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerMsg(null);
    if (!validateLogin()) return;

    // For now keep your original routing behavior (admin includes)
    const isAdmin = email.toLowerCase().includes("admin");
    // (Optional) real backend login:
    // try {
    //   setLoading(true);
    //   const res = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) return setServerMsg(data?.message || "Login failed.");
    //   localStorage.setItem("tl_token", data.token);
    //   navigate(data.user.role === "admin" ? "/admin" : "/hero");
    // } catch {
    //   setServerMsg("Network error—please try again.");
    // } finally { setLoading(false); }

    navigate(isAdmin ? "/admin" : "/hero");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerMsg(null);
    if (!validateSignup()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sgName.trim(),
          email: sgEmail.trim(),
          password: sgPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerMsg(data?.message || "Signup failed. Try again.");
      } else {
        if (data?.token) localStorage.setItem("tl_token", data.token);
        const isAdmin =
          data?.user?.role === "admin" ||
          sgEmail.toLowerCase().startsWith("admin@") ||
          sgEmail.toLowerCase().includes("admin");
        navigate(isAdmin ? "/admin" : "/hero");
      }
    } catch {
      setServerMsg("Network error—please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isAdminHint = email.trim().toLowerCase().startsWith("admin@");

  return (
    <>
      <style>{styleVars}</style>

      <div className="login-wrap" role="main">
        {/* Background decoration */}
        <div className="bg-blobs" aria-hidden="true">
          <div className="blob blob--a" />
          <div className="blob blob--b" />
        </div>

        {/* Auth card */}
        <div className="card" role="region" aria-label="Authenticate to TechLingo">
          <div className="card__accent" />
          <div className="card__body">
            <div className="logo-dot" aria-hidden="true">
              <BookOpen size={32} color="white" />
            </div>
            <div className="brand">
              <h1>TechLingo</h1>
              <p>{view === "login" ? "Sign in to continue" : "Create your account"}</p>
            </div>

            {/* Tabs to switch between Login and Signup */}
            <div className="tabs" role="tablist" aria-label="Authentication options">
              <button
                className={`tab ${view === "login" ? "active" : ""}`}
                role="tab"
                aria-selected={view === "login"}
                onClick={() => { setView("login"); setServerMsg(null); setErrors({}); }}
              >
                Login
              </button>
              <button
                className={`tab ${view === "signup" ? "active" : ""}`}
                role="tab"
                aria-selected={view === "signup"}
                onClick={() => { setView("signup"); setServerMsg(null); setErrors({}); }}
              >
                Signup
              </button>
            </div>

            {serverMsg && (
              <div className="server" role="alert">{serverMsg}</div>
            )}

            {/* LOGIN VIEW */}
            {view === "login" && (
              <form onSubmit={handleLogin} noValidate>
                <div className="row">
                  <label className="form-label" htmlFor="email">
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    placeholder="demo@techlingo.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : "email-hint"}
                    required
                  />
                  {!errors.email && (
                    <small id="email-hint" className="hint">
                      Tip: Use <strong>admin@…</strong> to preview the admin area.
                    </small>
                  )}
                  {isAdminHint && (
                    <small className="hint hint--admin" role="note">
                      Admin detected • You’ll be redirected to <strong>/admin</strong>
                    </small>
                  )}
                  {errors.email && (
                    <div id="email-error" className="error" role="alert">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="row">
                  <label className="form-label" htmlFor="password">
                    <Lock size={16} /> Password
                  </label>
                  <div className="input-group">
                    <input
                      id="password"
                      name="password"
                      type={showPw ? "text" : "password"}
                      className="input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      required
                    />
                    <button
                      type="button"
                      className="pw-toggle"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      onClick={() => setShowPw((s) => !s)}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div id="password-error" className="error" role="alert">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="row-flex">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      aria-label="Remember me"
                    />
                    Remember me
                  </label>
                  <Link className="link" to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Signing in…" : <>Sign In <ArrowRight size={20} /></>}
                </button>

                <div className="switchline">
                  New here?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={() => setView("signup")}
                  >
                    Create an account
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP VIEW */}
            {view === "signup" && (
              <form onSubmit={handleSignup} noValidate>
                <div className="row">
                  <label className="form-label" htmlFor="sg-name">
                    <User size={16} /> Full Name
                  </label>
                  <input
                    id="sg-name"
                    className="input"
                    value={sgName}
                    onChange={(e) => setSgName(e.target.value)}
                    placeholder="Aarav Shah"
                    aria-invalid={Boolean(errors.sgName)}
                    required
                  />
                  {errors.sgName && (
                    <div className="error" role="alert">
                      {errors.sgName}
                    </div>
                  )}
                </div>

                <div className="row">
                  <label className="form-label" htmlFor="sg-email">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    id="sg-email"
                    type="email"
                    className="input"
                    value={sgEmail}
                    onChange={(e) => setSgEmail(e.target.value)}
                    placeholder="you@techlingo.dev"
                    aria-invalid={Boolean(errors.sgEmail)}
                    required
                  />
                  <small className="hint">
                    Tip: use <strong>admin@…</strong> to preview admin routing.
                  </small>
                  {errors.sgEmail && (
                    <div className="error" role="alert">
                      {errors.sgEmail}
                    </div>
                  )}
                </div>

                <div className="row">
                  <label className="form-label" htmlFor="sg-password">
                    <Lock size={16} /> Password
                  </label>
                  <div className="input-group">
                    <input
                      id="sg-password"
                      type={sgShowPw ? "text" : "password"}
                      className="input"
                      value={sgPassword}
                      onChange={(e) => setSgPassword(e.target.value)}
                      placeholder="••••••••"
                      aria-invalid={Boolean(errors.sgPassword)}
                      required
                    />
                    <button
                      type="button"
                      className="pw-toggle"
                      aria-label={sgShowPw ? "Hide password" : "Show password"}
                      onClick={() => setSgShowPw((s) => !s)}
                    >
                      {sgShowPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.sgPassword && (
                    <div className="error" role="alert">
                      {errors.sgPassword}
                    </div>
                  )}
                </div>

                <div className="row">
                  <label className="form-label" htmlFor="sg-confirm">
                    <Lock size={16} /> Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      id="sg-confirm"
                      type={sgShowConfirmPw ? "text" : "password"}
                      className="input"
                      value={sgConfirm}
                      onChange={(e) => setSgConfirm(e.target.value)}
                      placeholder="••••••••"
                      aria-invalid={Boolean(errors.sgConfirm)}
                      required
                    />
                    <button
                      type="button"
                      className="pw-toggle"
                      aria-label={sgShowConfirmPw ? "Hide password" : "Show password"}
                      onClick={() => setSgShowConfirmPw((s) => !s)}
                    >
                      {sgShowConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.sgConfirm && (
                    <div className="error" role="alert">
                      {errors.sgConfirm}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Creating account…" : <>Create Account <ArrowRight size={20} /></>}
                </button>

                <div className="switchline">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={() => setView("login")}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            <div className="footer">
              <small>TechLingo • Learn, test, and lead with pastel blue &amp; green.</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
