import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';

const getAISuggestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/suggestions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return [];
  }
};

const getProductivityTips = async () => {
  try {
    const response = await axios.get(`${API_URL}/tips`);
    return response.data;
  } catch (error) {
    console.error('Error fetching productivity tips:', error);
    return [];
  }
};

export default {
  getAISuggestions,
  getProductivityTips
};