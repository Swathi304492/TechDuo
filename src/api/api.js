// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (userId) config.headers['x-user-id'] = userId; // 
  if (isAdmin) config.headers['x-admin'] = 'true'; // 
  
  return config;
});

export default api;