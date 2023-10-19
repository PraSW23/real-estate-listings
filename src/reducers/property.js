import axios from 'axios';

// Action Types
const FETCH_PROPERTIES = 'FETCH_PROPERTIES';
const SELECT_PROPERTY = 'SELECT_PROPERTY';

// Action Creators
export const fetchProperties = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3000/api/properties');
      const properties = response.data;
      dispatch({ type: FETCH_PROPERTIES, payload: properties });
    } catch (error) {
      console.error(error);
    }
  };
};

export const selectProperty = (property) => {
  return { type: SELECT_PROPERTY, payload: property };
};

// Reducer
const initialState = {
  properties: [],
  activeProperty: null
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTIES:
      return { ...state, properties: action.payload };
    case SELECT_PROPERTY:
      return { ...state, activeProperty: action.payload };
    default:
      return state;
  }
};

export default propertyReducer;