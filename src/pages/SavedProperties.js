// src/pages/SavedProperties.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Grid, CircularProgress } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import axios from '../utils/axiosInstance';

const SavedProperties = () => {
  const favoritePropertyIds = useSelector(state => state.auth.user.favoriteProperties);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      try {
        const response = await axios.post('/properties/getPropertiesByIds', { propertyIds: favoritePropertyIds });
        setFavoriteProperties(response.data);
      } catch (error) {
        console.error('Error fetching favorite properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favoritePropertyIds && favoritePropertyIds.length > 0) {
      fetchFavoriteProperties();
    } else {
      setLoading(false);
    }
  }, [favoritePropertyIds]);

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
          Saved Properties
        </Typography>
        {favoriteProperties.length === 0 ? (
          <Typography variant="body1">You have no saved properties.</Typography>
        ) : (
          <Grid container spacing={4}>
            {favoriteProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SavedProperties;