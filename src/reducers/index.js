// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth';
import propertyReducer from './property';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
});

export default rootReducer;

