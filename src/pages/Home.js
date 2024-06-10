// src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties, deleteProperty } from '../actions/propertyActions'; // Import deleteProperty action
import PropertyCard from '../components/PropertyCard';
import PropertySearch from '../components/PropertySearch';
import { CircularProgress, Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const Home = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(state => state.property);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const handleDelete = (propertyId) => { // Define handleDelete function
    dispatch(deleteProperty(propertyId));
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
      <Title variant="h4" gutterBottom>
        Properties
      </Title>
      <Box mb={3}>
        <PropertySearch />
      </Box>
      <Grid container spacing={3}>
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <PropertyCard property={property} onDelete={handleDelete} /> {/* Pass onDelete function */}
            </Grid>
          ))
        ) : (
          <Typography variant="body1" gutterBottom>
            No properties found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
