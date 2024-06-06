// src/reducers/property.js
import { 
  GET_PROPERTIES, 
  GET_PROPERTY, 
  ADD_PROPERTY, 
  UPDATE_PROPERTY, 
  DELETE_PROPERTY 
} from './ActionTypes';

const initialState = {
  properties: [],
  property: null,
  loading: true,
  error: null,
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
        loading: false,
      };
    case GET_PROPERTY:
      return {
        ...state,
        property: action.payload,
        loading: false,
      };
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.payload],
        loading: false,
      };
    case UPDATE_PROPERTY:
      return {
        ...state,
        properties: state.properties.map(property =>
          property._id === action.payload._id ? action.payload : property
        ),
        loading: false,
      };
    case DELETE_PROPERTY:
      return {
        ...state,
        properties: state.properties.filter(property => property._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default propertyReducer;

