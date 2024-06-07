// src/components/PropertyCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, IconButton, CardMedia, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PropertyCard = ({ property, handleDelete }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={property.image || 'https://via.placeholder.com/140'}
        alt={property.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {property.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {property.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {property.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Location: {property.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/PropertyDetails/${property._id}`}>
          View Details
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? 'secondary' : 'action'} />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

export default PropertyCard;
