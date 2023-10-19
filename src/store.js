// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth'; // Import your authReducer
import propertyReducer from './reducers/property'; // Import your propertyReducer

const rootReducer = {
  auth: authReducer,
  property: propertyReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;