// src/actions/propertyActions.js

import axiosInstance from '../utils/axiosInstance';
import {
  GET_PROPERTIES,
  GET_PROPERTY,
  ADD_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
  GET_NEW_PROPERTIES,
} from '../reducers/ActionTypes';

export const getProperties = (params = {}) => async dispatch => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await axiosInstance.get(`/properties/new?${query}`);
    console.log('Fetched properties:', res.data);
    dispatch({
      type: GET_PROPERTIES,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching properties:', err);
  }
};

export const getProperty = id => async dispatch => {
  try {
    const res = await axiosInstance.get(`/properties/${id}`);
    dispatch({
      type: GET_PROPERTY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const addProperty = property => async dispatch => {
  try {
    const res = await axiosInstance.post('/properties', property);
    dispatch({
      type: ADD_PROPERTY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateProperty = (id, property) => async dispatch => {
  try {
    const res = await axiosInstance.put(`/properties/${id}`, property);
    dispatch({
      type: UPDATE_PROPERTY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteProperty = id => async dispatch => {
  try {
    await axiosInstance.delete(`/properties/${id}`);
    await axiosInstance.post('/properties/removeFavoriteProperty', { propertyId: id });
    dispatch({
      type: DELETE_PROPERTY,
      payload: id
    });
  } catch (err) {
    console.error(err);
  }
};

export const getNewProperties = () => async dispatch => { // Add this action
  try {
    const res = await axiosInstance.get('/properties/new');
    dispatch({
      type: GET_NEW_PROPERTIES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
