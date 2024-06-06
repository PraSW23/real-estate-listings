// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined rootReducer

const store = configureStore({
  reducer: rootReducer, // Use the combined rootReducer
});

export default store;

