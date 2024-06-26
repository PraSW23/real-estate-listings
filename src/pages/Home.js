// src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties, deleteProperty } from '../actions/propertyActions';
import PropertyCard from '../components/PropertyCard';
import PropertySearch from '../components/PropertySearch';
import { CircularProgress, Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  textAlign: 'center',
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontSize: '2rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}));

const Home = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(state => state.property);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty(propertyId));
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!Array.isArray(properties)) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Failed to load properties.
        </Typography>
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
        {properties.map(property => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard property={property} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
