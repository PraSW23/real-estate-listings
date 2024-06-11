//src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://a1ce-2402-3a80-401c-61ff-cfbe-f5f4-cb9d-8007.ngrok-free.app/api', // Updating with backend URL
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
