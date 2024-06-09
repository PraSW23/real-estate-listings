// src/pages/PropertyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Card, CardContent, CardMedia, Container, Typography, Box, Grid, IconButton } from '@mui/material';
import ContactAgent from '../components/ContactAgent';
import axios from '../utils/axiosInstance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavoriteProperties } from '../actions/authActions';
import { styled } from '@mui/system';

const AnimatedIconButton = styled(IconButton)({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
});

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLikeClick = () => {
    if (!user || !user._id) {
      // Redirect to signup/login page if user is not authenticated
      navigate('/signup');
      return;
    }
    const propertyId = property._id;
    dispatch(updateFavoriteProperties(propertyId)); // Dispatch action to update favorites
    setProperty(prevProperty => ({
      ...prevProperty,
      isLiked: !prevProperty.isLiked
    }));
  };

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
          height="500"
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
          {property.user && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Owner: {property.user.name}</strong>
            </Typography>
          )}
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, marginRight: 2 }}>
          <AnimatedIconButton onClick={handleLikeClick}>
            {property.isLiked ? <FavoriteIcon sx={{ fontSize: 60 }} color="secondary" /> : <FavoriteBorderIcon sx={{ fontSize: 60 }} />}
          </AnimatedIconButton>
        </Box>
      </Card>
      <Box mt={4}>
        <ContactAgent propertyId={property._id} />
      </Box>
    </Container>
  );
};

export default PropertyDetails;
