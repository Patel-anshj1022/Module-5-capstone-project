import API from './api';

// User login
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.error || error.message);
    throw error;
  }
};

// User registration
export const register = async (userData) => {
  try {
    await API.post('/auth/register', userData);
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.error || error.message);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
};
