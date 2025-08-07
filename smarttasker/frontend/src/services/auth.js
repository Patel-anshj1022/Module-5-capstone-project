import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', response.data.access_token);
  return { username: credentials.username };
};

export const registerUser = async (userData) => {
  await axios.post(`${API_URL}/register`, userData);
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { username: response.data.username };
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};