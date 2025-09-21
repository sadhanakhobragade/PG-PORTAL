// frontend/src/api/auth.js
import api from './axios';

// Login API call
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Register API call
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};











// import axios from 'axios';
// const api = axios.create({
// baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
// withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('pg_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


// export const login = (payload) => api.post('/auth/login', payload);
// export const register = (payload) => api.post('/auth/register', payload);
// export default api;