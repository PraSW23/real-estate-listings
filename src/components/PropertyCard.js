// src/components/PropertyCard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, IconButton, CardMedia, Box, Menu, MenuItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavoriteProperties } from '../actions/authActions';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  display: 'flex',
  flexDirection: 'column',
}));

const ScrollableCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 1 auto',
  overflowY: 'auto',
  maxHeight: 100, // Set a maximum height for the content area
  padding: theme.spacing(2),
}));

const AnimatedIconButton = styled(IconButton)({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
});

const PropertyCard = ({ property, onDelete }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.favoriteProperties && user.favoriteProperties.includes(property._id)) {
      setIsFavorite(true);
    }
  }, [user, property._id]);

  const handleFavoriteClick = () => {
    if (!user || !user._id) {
      navigate('/signup');
      return;
    }
    setIsFavorite(!isFavorite);
    dispatch(updateFavoriteProperties(property._id)); // Dispatch action to update favorites
  };

  const handleDeleteClick = () => {
    onDelete(property._id); // Call the parent component's delete handler
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="170"
        image={property.image || 'https://via.placeholder.com/140'}
        alt={property.title}
      />
      <ScrollableCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {property.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {property.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: Rs.{property.price}/-
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Location: {property.location}
        </Typography>
        {property.user && (
          <Typography variant="body2" color="textSecondary" component="p">
            Owner: {property.user.name}
          </Typography>
        )}
      </ScrollableCardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/PropertyDetails/${property._id}`}>
          View Details
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton aria-label="share" onClick={handleShareClick}>
          <ShareIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Share via Email</MenuItem>
          <MenuItem onClick={handleClose}>Share via Social Media</MenuItem>
        </Menu>
        <AnimatedIconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? 'secondary' : 'action'} />
        </AnimatedIconButton>
        {user && property.user && user._id === property.user._id && (
          <>
            <IconButton color="primary" onClick={() => navigate(`/UpdateProperty/${property._id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default PropertyCard;
