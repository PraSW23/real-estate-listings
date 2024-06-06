// src/actions/authActions.js
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED
} from '../reducers/ActionTypes';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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

    setAuthToken(res.data.token); // Set token in axios instance
    dispatch(loadUser()); // Load user data after successful registration
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
  setAuthToken(null); // Remove token from axios instance
};
