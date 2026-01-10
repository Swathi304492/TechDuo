// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Mail, Lock } from 'lucide-react';
import UserProfile from '../pages/UserProfile';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isAdmin = email.includes('admin');
    navigate(isAdmin ? '/admin' : '/hero');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      
      {/* Background decoration */}
      <div className="position-absolute w-100 h-100" style={{ opacity: 0.1 }}>
        <div className="position-absolute rounded-circle" 
             style={{ width: '600px', height: '600px', background: 'white', top: '-15%', right: '-10%', filter: 'blur(120px)' }} />
        <div className="position-absolute rounded-circle" 
             style={{ width: '500px', height: '500px', background: 'white', bottom: '-15%', left: '-10%', filter: 'blur(120px)' }} />
      </div>

      {/* Login Card */}
      <div className="card border-0 shadow-lg position-relative" 
           style={{ width: '440px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px' }}>
        
        {/* Top accent bar */}
        <div style={{ height: '6px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }} />
        
        <div className="card-body p-5">
          {/* Logo */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm"
                 style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <BookOpen size={32} color="white" />
            </div>
            <h1 className="fw-bold mb-2" style={{ color: '#1e293b', fontSize: '32px' }}>TechLingo</h1>
            <p className="text-muted mb-0">Master technical vocabulary</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                <Mail size={16} className="me-2 mb-1" />Email Address
              </label>
              <input type="email" className="form-control py-3 px-4" 
                     placeholder="demo@techlingo.dev"
                     value={email} onChange={(e) => setEmail(e.target.value)} required
                     style={{ borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '15px' }} />
              <small className="text-muted d-block mt-2">💡 Tip: Use "admin@..." for admin access</small>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                <Lock size={16} className="me-2 mb-1" />Password
              </label>
              <input type="password" className="form-control py-3 px-4" 
                     placeholder="••••••••"
                     value={password} onChange={(e) => setPassword(e.target.value)} required
                     style={{ borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '15px' }} />
            </div>

            <button type="submit" className="btn w-100 fw-semibold py-3 border-0 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '12px', fontSize: '16px' }}>
              Sign In <ArrowRight size={20} className="ms-2 mb-1" />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
            <small className="text-muted">
              Don't have an account? <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>Sign up</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}