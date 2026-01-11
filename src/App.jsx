// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginPage';
import AdminPanel from './components/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './pages/UserProfile';
import HeroPage from './components/HeroPage';
import GameSection from './components/GamingSection';
import LearningSection from './components/LearningSection';
import TestPage from './components/TestPage';
import HtmlBasic from './components/HtmlBasic';
import CssBasic from './components/CssBasic';
import JsFundamentals from './components/JsFundamentals';
 
function App() {
  // 1. Logic: Check if user is logged in
  const isAuthenticated = true;
 
  // 2. Return: The JSX for the component
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

       
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
          path="/test"
          element={isAuthenticated ? <TestPage /> : <Navigate to="/login" />}
        />
        <Route path="/learn/html-basics" element={isAuthenticated ? <HtmlBasic /> : <Navigate to="/login" />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="/learn/css-basics" element={isAuthenticated ? <CssBasic /> : <Navigate to="/login" />} />
        <Route path="/learn/javascript-fundamentals" element={isAuthenticated ? <JsFundamentals /> : <Navigate to="/login" />} />
    
        {/* Redirect root to /hero if logged in, else login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/hero" /> : <Navigate to="/login" />} />
 
         {/* gaming and learning section */}
        <Route path="/game" element={isAuthenticated ? <GameSection /> : <Navigate to="/login" />} />
        <Route path="/learn" element={isAuthenticated ? <LearningSection /> : <Navigate to="/login" />} />
       
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 