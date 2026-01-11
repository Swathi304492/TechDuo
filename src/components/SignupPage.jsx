
// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Use at least 6 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerMsg(data?.message || "Signup failed. Try again.");
      } else {
        // Optional: store token for authenticated routes
        if (data?.token) localStorage.setItem("tl_token", data.token);
        // Navigate: admin emails can go to /admin, others to /hero
        const isAdmin = (data?.user?.role === "admin") || form.email.toLowerCase().includes("admin");
        navigate(isAdmin ? "/admin" : "/hero");
      }
    } catch (err) {
      setServerMsg("Network error—please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          --danger: #f59fb0;
          --success: #94e2c6;
          --shadow: 0 8px 24px rgba(20, 52, 76, .12);
          --radius: 24px; --border: #d9e9ff; --input-border: #cfe1ff;
        }
        html, body, #root { height: 100% }
        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue","Noto Sans", Arial;
          color: var(--text);
          background: radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%), var(--bg);
        }
        .wrap{ min-height:100vh; display:grid; place-items:center; position:relative; overflow:hidden }
        .bg{ position:absolute; inset:0; opacity:.18; pointer-events:none }
        .blob{ position:absolute; border-radius:50%; filter:blur(120px) }
        .blob-a{ width:620px; height:620px; background:var(--accent-2); top:-16%; right:-10% }
        .blob-b{ width:520px; height:520px; background:var(--accent); bottom:-16%; left:-12% }
        .card{
          width: 520px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
          border-radius: var(--radius); border:1px solid var(--border); box-shadow: var(--shadow);
        }
        .accent{ height: 6px; background: linear-gradient(90deg, var(--accent), var(--accent-2)); border-radius: 24px 24px 0 0 }
        .body{ padding: 32px }
        .logo{ width:64px; height:64px; border-radius:50%; display:grid; place-items:center; margin:0 auto 14px;
               background:linear-gradient(135deg, var(--accent), var(--accent-2)); box-shadow:0 8px 14px rgba(20,52,76,.12) }
        .brand{ text-align:center; margin-bottom: 8px }
        .brand h1{ margin:0 0 6px; font-size:32px; font-weight:800; color:#1e293b }
        .brand p{ margin:0; color: var(--muted) }
        .row{ margin-bottom: 14px }
        .label{ font-weight:600; color:#475569; font-size:14px; margin-bottom:6px; display:flex; align-items:center; gap:8px }
        .input{ width:100%; padding: 14px; border-radius:12px; border:2px solid var(--input-border); font-size:15px; background:#fff;
                transition: border-color .2s ease, box-shadow .2s ease }
        .input:focus{ outline:none; border-color: var(--accent-2); box-shadow: 0 0 0 3px rgba(163,196,243,.25) }
        .group{ position:relative }
        .toggle{ position:absolute; right:10px; top:50%; transform:translateY(-50%); background:transparent; border:0; cursor:pointer; padding:6px; border-radius:10px }
        .hint{ color: var(--muted); font-size:12px; margin-top:6px }
        .error{ color:#7a1a1a; background:#ffe5ea; border:1px solid #f3b6c2; padding:8px 10px; border-radius:10px; font-size:13px; margin-top:8px }
        .server{ color:#5b1d21; background:#ffe1e6; border:1px solid #f3b6c2; padding:10px 12px; border-radius:10px; margin-bottom:12px }
        .btn{ width:100%; padding:14px 18px; border-radius:12px; font-weight:700; border:0; cursor:pointer;
              transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
              background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #063a36; box-shadow: var(--shadow);
              display:flex; align-items:center; justify-content:center; gap:10px }
        .btn:active{ transform:scale(.98) }
        .footer{ text-align:center; margin-top:18px; padding-top:14px; border-top:1px solid var(--border); color: var(--muted) }
        .meta{ display:flex; justify-content:center; gap:8px; font-size:14px; margin-top:10px }
        .link{ color:#2563eb; font-weight:600; text-decoration:none } .link:hover{ text-decoration:underline }
      `}</style>

      <div className="wrap">
        <div className="bg" aria-hidden="true">
          <div className="blob blob-a"></div>
          <div className="blob blob-b"></div>
        </div>

        <div className="card" role="region" aria-label="Create your TechLingo account">
          <div className="accent"></div>
          <div className="body">
            <div className="logo" aria-hidden="true"><BookOpen size={32} color="white" /></div>
            <div className="brand">
              <h1>TechLingo</h1>
              <p>Create your account</p>
            </div>

            {serverMsg && <div className="server" role="alert">{serverMsg}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <label className="label" htmlFor="name"><User size={16} /> Full Name</label>
                <input id="name" className="input" value={form.name} onChange={onChange("name")} placeholder="Aarav Shah" />
                {errors.name && <div className="error" role="alert">{errors.name}</div>}
              </div>

              <div className="row">
                <label className="label" htmlFor="email"><Mail size={16} /> Email</label>
                <input id="email" type="email" className="input" value={form.email} onChange={onChange("email")} placeholder="you@techlingo.dev" />
                <small className="hint">Tip: use <strong>admin@…</strong> if you want to preview admin routing.</small>
                {errors.email && <div className="error" role="alert">{errors.email}</div>}
              </div>

              <div className="row">
                <label className="label" htmlFor="password"><Lock size={16} /> Password</label>
                <div className="group">
                  <input id="password" type={showPw ? "text" : "password"} className="input" value={form.password} onChange={onChange("password")} placeholder="••••••••" />
                  <button type="button" className="toggle" aria-label={showPw ? "Hide password" : "Show password"} onClick={() => setShowPw(s => !s)}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div className="error" role="alert">{errors.password}</div>}
              </div>

              <div className="row">
                <label className="label" htmlFor="confirm"><Lock size={16} /> Confirm Password</label>
                <div className="group">
                  <input id="confirm" type={showConfirmPw ? "text" : "password"} className="input" value={form.confirm} onChange={onChange("confirm")} placeholder="••••••••" />
                  <button type="button" className="toggle" aria-label={showConfirmPw ? "Hide password" : "Show password"} onClick={() => setShowConfirmPw(s => !s)}>
                    {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirm && <div className="error" role="alert">{errors.confirm}</div>}
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Creating account…" : <>Create Account <ArrowRight size={20} /></>}
              </button>
            </form>

            <div className="meta">
              <span>Already have an account?</span>
              <Link className="link" to="/login">Sign in</Link>
            </div>

            <div className="footer">
              <small>Techlingo • Learn, test, and lead with pastel blue &amp; green.</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
``
