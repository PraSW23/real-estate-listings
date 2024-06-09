// src/pages/MyProperties.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import axios from '../utils/axiosInstance';

const MyProperties = () => {
  const user = useSelector(state => state.auth.user);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.get(`/properties/user/${user._id}`);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching user properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProperties();
    }
  }, [user]);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`/properties/${propertyId}`);
      setProperties(properties.filter(property => property._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
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
          My Properties
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/AddProperty">
          Add New Property
        </Button>
        <Grid container spacing={4} my={4}>
          {properties.length === 0 ? (
            <Typography variant="body1">You have no properties listed.</Typography>
          ) : (
            properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <PropertyCard property={property} onDelete={handleDelete} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyProperties;
