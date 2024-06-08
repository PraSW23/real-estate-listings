// src/actions/authActions.js
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  USER_UPDATED,
} from '../reducers/ActionTypes';

// Load user
export const loadUser = () => async dispatch => {
  const token = getCookie('token'); // Retrieve token from cookie
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axiosInstance.get('/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Login user
export const login = credentials => async dispatch => {
  try {
    const res = await axiosInstance.post('/auth/login', credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    setCookie('token', res.data.token, 1); // Store token in cookie for 1 day
    setAuthToken(res.data.token); // Set token in axios instance
    dispatch(loadUser()); // Load user data after successful login
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const register = user => async dispatch => {
  try {
    const res = await axiosInstance.post('/auth/register', user);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    setCookie('token', res.data.token, 1); // Store token in cookie for 1 day
    setAuthToken(res.data.token); // Set token in axios instance
    dispatch(loadUser()); // Load user data after successful registration
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Update user profile
export const updateUserProfile = (userData) => async dispatch => {
  try {
    const res = await axiosInstance.put('/auth/user', userData);
    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
    dispatch(loadUser()); // Refresh user data
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
  deleteCookie('token'); // Remove token cookie
  setAuthToken(null); // Remove token from axios instance
};

// Update user's favorite properties
export const updateFavoriteProperties = (propertyId) => async dispatch => {
  try {
    const res = await axiosInstance.put('/auth/user/favorite', { propertyId });
    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
    dispatch(loadUser()); // Refresh user data
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Cookie handling functions

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

