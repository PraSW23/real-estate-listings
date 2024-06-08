// src/pages/UpdateProperty.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from '../utils/axiosInstance';

const UpdateProperty = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/properties/${id}`, formData);
      navigate('/MyProperties');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Update Property
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
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Update Property
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProperty;
