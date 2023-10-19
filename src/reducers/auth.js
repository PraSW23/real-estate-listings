// ...
import { SAVE_PROPERTY, ADD_CONTACT_HISTORY } from './ActionTypes'; // Replace 'ActionTypes' with the actual file name

// Reducer
const initialState = {
    // ...
    savedProperties: [],
    contactHistory: [],
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // ...
  
      case SAVE_PROPERTY:
        return {
          ...state,
          savedProperties: [...state.savedProperties, action.payload],
        };
  
      case ADD_CONTACT_HISTORY:
        return {
          ...state,
          contactHistory: [...state.contactHistory, action.payload],
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  