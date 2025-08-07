// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const getHabits = async () => {
  const response = await api.get('/habits');
  return response.data;
};

export const createHabit = async (habitData) => {
  const response = await api.post('/habits', habitData);
  return response.data;
};

export const completeHabit = async (id) => {
  const response = await api.post(`/habits/${id}/complete`);
  return response.data;
};

export const deleteHabit = async (id) => {
  const response = await api.delete(`/habits/${id}`);
  return response.data;
};

export const getAISuggestions = async () => {
  const response = await api.get('/ai/suggestions');
  return response.data;
};

export const getProductivityTips = async () => {
  const response = await api.get('/ai/tips');
  return response.data;
};