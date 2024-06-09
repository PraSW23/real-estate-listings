// src/pages/PropertyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Card, CardContent, CardMedia, Container, Typography, Box, Grid } from '@mui/material';
import ContactAgent from '../components/ContactAgent';
import axios from '../utils/axiosInstance';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ margin: 2 }}>
        Property Details
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={property.image || 'https://via.placeholder.com/150'}
          alt="Property image"
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>{property.title}</Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            Price: Rs.{property.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {property.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Location: {property.location}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Listed on: {new Date(property.date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={4}>
        <ContactAgent propertyId={property._id} />
      </Box>
    </Container>
  );
};

export default PropertyDetails;
