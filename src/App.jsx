// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginPage';
import AdminPanel from './components/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // 1. Logic: Check if user is logged in
  const isAuthenticated = !!localStorage.getItem('userId');

  // 2. Return: The JSX for the component
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Route */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Catch-all: If user goes to /hero or others you haven't built yet */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;