// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginPage';
import AdminPanel from './components/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './pages/UserProfile';
import HeroPage from './components/HeroPage';

function App() {
  // 1. Logic: Check if user is logged in
  const isAuthenticated = !!localStorage.getItem('userId');

  // 2. Return: The JSX for the component
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* NEW: Explicitly add the Hero Page Route */}
        <Route 
          path="/hero" 
          element={isAuthenticated ? <HeroPage /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/profile" 
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* Redirect root to /hero if logged in, else login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/hero" /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;