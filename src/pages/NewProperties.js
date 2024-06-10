// src/pages/NewProperties.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProperties } from '../actions/propertyActions';
import { Grid, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';


const Container = styled('div')({
  flexGrow: 1,
  padding: '20px',
  minHeight: '100vh',
  backgroundColor: '#e0f7fa',
});

const PropertyCard = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const NewProperties = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getNewProperties());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        New Properties
      </Typography>
      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard>
              <img src={property.image} alt={property.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
              <Typography variant="h6" gutterBottom>
                {property.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {property.description}
              </Typography>
              <Typography variant="body1" color="primary">
                Rs.{property.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {property.location}
              </Typography>
              <Button component={Link} to={`/PropertyDetails/${property._id}`} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                View Details
              </Button>
            </PropertyCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewProperties;
