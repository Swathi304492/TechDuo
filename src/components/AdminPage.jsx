// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, LogOut, Search, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import api from '../api/api';

export default function AdminPanel() {
  const [terms, setTerms] = useState([]);
  const [form, setForm] = useState({ term: '', definition: '', example: '', codeSnippet: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { loadTerms(); }, []);

  const loadTerms = async () => {
    const res = await api.get('/admin/terms');
    setTerms(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/admin/terms', form);
    setForm({ term: '', definition: '', example: '', codeSnippet: '' });
    loadTerms();
  };

  const handleUpdate = async (id) => {
    await api.put(`/admin/terms/${id}`, terms.find(t => t.id === id));
    setEditingId(null);
    loadTerms();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this term?")) {
      await api.delete(`/admin/terms/${id}`);
      loadTerms();
    }
  };

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex min-vh-100" style={{ background: '#f1f5f9' }}>
      
      {/* Sidebar */}
      <div className="d-flex flex-column shadow-lg" 
           style={{ width: '280px', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', position: 'fixed', height: '100vh' }}>
        
        {/* Logo */}
        <div className="p-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center"
                 style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <BookOpen size={24} color="white" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-white">TechLingo</h5>
              <small className="text-white-50">Admin Portal</small>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 p-4">
          <div className="d-flex flex-column gap-2">
            <button className="btn text-start d-flex align-items-center gap-3 border-0 py-3 px-3 rounded"
                    style={{ background: 'rgba(102, 126, 234, 0.2)', color: '#c7d2fe' }}>
              <BookOpen size={20} />
              <span className="fw-semibold">Term Manager</span>
            </button>
            <button className="btn text-start d-flex align-items-center gap-3 border-0 py-3 px-3 rounded"
                    style={{ background: 'transparent', color: '#94a3b8' }}>
              <BarChart3 size={20} />
              <span className="fw-semibold">Analytics</span>
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button onClick={() => navigate('/login')}
                  className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{ borderRadius: '10px' }}>
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
        <div className="p-5">
          
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Vocabulary Management</h2>
              <p className="text-muted mb-0">Create and manage technical terms</p>
            </div>
            <div className="badge px-3 py-2" 
                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px' }}>
              {terms.length} Terms
            </div>
          </div>

          {/* Create Form */}
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Plus size={24} style={{ color: '#667eea' }} />
                <h5 className="mb-0 fw-bold">Add New Term</h5>
              </div>
              
              <form onSubmit={handleCreate}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                      Term *
                    </label>
                    <input className="form-control py-2 px-3" placeholder="e.g., Docker, API"
                           value={form.term} onChange={e => setForm({...form, term: e.target.value})} required
                           style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                      Example Usage
                    </label>
                    <input className="form-control py-2 px-3" placeholder="Example context"
                           value={form.example} onChange={e => setForm({...form, example: e.target.value})}
                           style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }} />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                      Definition *
                    </label>
                    <textarea className="form-control py-2 px-3" placeholder="Explain the term..." rows={3}
                              value={form.definition} onChange={e => setForm({...form, definition: e.target.value})} required
                              style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }} />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label fw-semibold" style={{ color: '#475569', fontSize: '14px' }}>
                      Code Snippet (Optional)
                    </label>
                    <textarea className="form-control py-2 px-3" placeholder="docker run -p 3000:3000 app" rows={2}
                              value={form.codeSnippet} onChange={e => setForm({...form, codeSnippet: e.target.value})}
                              style={{ borderRadius: '10px', border: '2px solid #e2e8f0', fontFamily: 'monospace', background: '#f8fafc' }} />
                  </div>
                  
                  <div className="col-12 text-end">
                    <button type="submit" className="btn px-4 py-2 fw-semibold border-0"
                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '10px' }}>
                      <Save size={18} className="me-2 mb-1" />Save Term
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="position-relative" style={{ maxWidth: '400px' }}>
              <Search className="position-absolute" size={20} 
                      style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input type="text" className="form-control py-3 ps-5 pe-3" placeholder="Search terms..."
                     value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                     style={{ borderRadius: '12px', border: '2px solid #e2e8f0' }} />
            </div>
          </div>

          {/* Terms List */}
          <div className="row g-3">
            {filteredTerms.length === 0 ? (
              <div className="col-12 text-center py-5">
                <BookOpen size={48} style={{ color: '#cbd5e1' }} className="mb-3" />
                <p className="text-muted">No terms found. Create your first term!</p>
              </div>
            ) : (
              filteredTerms.map(term => (
                <div key={term.id} className="col-12">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      
                      {editingId === term.id ? (
                        // Edit Mode
                        <div>
                          <input className="form-control mb-3" value={term.term}
                                 onChange={(e) => setTerms(terms.map(t => t.id === term.id ? {...t, term: e.target.value} : t))}
                                 style={{ borderRadius: '8px', border: '2px solid #e2e8f0' }} />
                          <textarea className="form-control mb-3" value={term.definition} rows={3}
                                    onChange={(e) => setTerms(terms.map(t => t.id === term.id ? {...t, definition: e.target.value} : t))}
                                    style={{ borderRadius: '8px', border: '2px solid #e2e8f0' }} />
                          <input className="form-control mb-3" value={term.example || ''} placeholder="Example"
                                 onChange={(e) => setTerms(terms.map(t => t.id === term.id ? {...t, example: e.target.value} : t))}
                                 style={{ borderRadius: '8px', border: '2px solid #e2e8f0' }} />
                          <div className="d-flex gap-2">
                            <button onClick={() => setEditingId(null)} className="btn btn-sm"
                                    style={{ background: '#f1f5f9', color: '#475569', borderRadius: '8px' }}>
                              <X size={16} className="me-1 mb-1" />Cancel
                            </button>
                            <button onClick={() => handleUpdate(term.id)} className="btn btn-sm"
                                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px' }}>
                              <Save size={16} className="me-1 mb-1" />Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="d-flex justify-content-between">
                          <div className="flex-grow-1">
                            <h5 className="fw-bold mb-2" style={{ color: '#667eea' }}>{term.term}</h5>
                            <p className="text-muted mb-2">{term.definition}</p>
                            {term.example && <p className="mb-2" style={{ color: '#475569', fontSize: '14px' }}>Example: {term.example}</p>}
                            {term.codeSnippet && (
                              <code className="d-block p-2 rounded" 
                                    style={{ background: '#f1f5f9', color: '#475569', fontSize: '13px' }}>
                                {term.codeSnippet}
                              </code>
                            )}
                          </div>
                          <div className="d-flex gap-2 ms-3">
                            <button onClick={() => setEditingId(term.id)} className="btn btn-sm"
                                    style={{ background: '#dbeafe', color: '#2563eb', borderRadius: '8px' }}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(term.id)} className="btn btn-sm"
                                    style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '8px' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}