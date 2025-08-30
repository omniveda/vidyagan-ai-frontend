import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vidyagan-ai.com', // Replace with your actual API URL
  // baseURL: 'http://localhost:4000', // Change this if your backend runs elsewhere
  // baseURL: 'http://localhost:4000', // Change this if your backend runs elsewhere
  withCredentials: true, // Set to true if you use cookies/auth
});

export default api; 