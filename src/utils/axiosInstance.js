//src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://real-estate-listings-api.vercel.app/api', // Updating with backend URL
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
