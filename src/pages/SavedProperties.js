// src/pages/SavedProperties.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid } from '@mui/material';
import PropertyCard from '../components/PropertyCard';

const SavedProperties = () => {
  const favoriteProperties = useSelector(state => state.auth.user.favoriteProperties);

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
                {property && <PropertyCard property={property} />}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SavedProperties;
