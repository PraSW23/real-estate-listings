import axios from 'axios';

// Action Types
const FETCH_PROPERTIES = 'FETCH_PROPERTIES';

// Action Creator
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

// Reducer
// ...

export default propertyReducer;
