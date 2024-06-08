// src/pages/AddProperty.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axiosInstance from '../utils/axiosInstance'; // Changed import

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '', 
    image: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the user's authentication token from localStorage
      const token = localStorage.getItem('token');
      
      // Set the authentication token in the axios instance
      axiosInstance.defaults.headers.common['x-auth-token'] = token;

      // Send the request with the formData
      await axiosInstance.post('/properties', formData);
      
      // Navigate to the MyProperties page
      navigate('/MyProperties');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Add New Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Property
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddProperty;
