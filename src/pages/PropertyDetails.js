// src/pages/PropertyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Card, CardContent, CardMedia, Container, Typography, Box } from '@mui/material';
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
      <Card>
        {property.images && property.images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            height="140"
            image={image}
            alt={`Property image ${index + 1}`}
          />
        ))}
        <CardContent>
          <Typography variant="h5">{property.address}</Typography>
          <Typography variant="body1" color="textPrimary">
            Price: {property.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {property.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Location: {property.location}
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
