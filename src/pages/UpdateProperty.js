// src/pages/UpdateProperty.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, CircularProgress, CardMedia } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const UpdateProperty = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
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
      await axiosInstance.put(`/properties/${id}`, formData);
      navigate('/MyProperties');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleCancel = () => {
    navigate('/MyProperties');
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
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            required
          />
          <CardMedia
            component="img"
            alt="Property Image"
            height="140"
            image={formData.image || 'https://via.placeholder.com/150'}
            style={{ maxWidth: '100%', height: 'auto', margin: '10px 0' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Property
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProperty;
