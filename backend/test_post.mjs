// backend/test_post.mjs
import axios from 'axios';

const addProperty = async (propertyData, token) => {
  try {
    const response = await axios.post('http://localhost:5000/api/properties', propertyData, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    console.log('Property added:', response.data);
  } catch (error) {
    console.error('Error adding property:', error);
  }
};

// Example usage:
const propertyData = {
  title: "New Title",
  description: "New Description",
  price: 123,
  location: "New Location",
  image: "https://via.placeholder.com/150"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDRiM2UxOGIxYjI2ODEyNDEzZjI0In0sImlhdCI6MTcxNzg1MDMxMCwiZXhwIjoxNzE3ODUzOTEwfQ.01gQ8Ih58FI1k3ttcHKxF9KDO4qNBk-vwA0oIx9EUi4';

addProperty(propertyData, token);

