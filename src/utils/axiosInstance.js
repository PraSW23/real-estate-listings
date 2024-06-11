//src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vercel.com/prakhars-projects-c3391123/real-estate-listings-x4pw/AAkR7Jo3MRL93ZKdLQXnv9GzQnBi/api', // Updating with backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axiosInstance.defaults.headers.common['x-auth-token'];
  }
  
};

export default axiosInstance;
