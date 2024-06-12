// src/components/PropertyCard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, IconButton, CardMedia, Box, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
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
    transform: 'scale(1.7)',
  },
});

const AnimatedMenuIcon = styled(IconButton)({
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
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/PropertyDetails/${property._id}`);
    handleClose();
    alert('Link copied to clipboard!');
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleShareVia = (platform) => {
    const propertyLink = `${window.location.origin}/PropertyDetails/${property._id}`;
    let shareUrl = '';
    switch (platform) {
      case 'gmail':
        shareUrl = `mailto:?subject=Check out this property&body=${propertyLink}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=Check out this property: ${propertyLink}`;
        break;
      case 'instagram':
        // Instagram does not support direct sharing via URL. You can open Instagram and paste the link manually.
        alert('Instagram does not support direct sharing. Please copy the link and share manually.');
        return;
      default:
        break;
    }
    window.open(shareUrl, '_blank');
    setDialogOpen(false);
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
        <AnimatedMenuIcon aria-label="share" onClick={handleShareClick}>
          <ShareIcon />
        </AnimatedMenuIcon>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleCopyLink}>
            <ContentCopyIcon sx={{ marginRight: 1 }} />
            Copy Link
          </MenuItem>
          <MenuItem onClick={handleDialogOpen}>
            <ShareIcon sx={{ marginRight: 1 }} />
            Share via...
          </MenuItem>
        </Menu>
        <AnimatedIconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? 'secondary' : 'action'} />
        </AnimatedIconButton>
        {user && property.user && user._id === property.user._id && (
          <>
            <AnimatedIconButton color="primary" onClick={() => navigate(`/UpdateProperty/${property._id}`)}>
              <EditIcon />
            </AnimatedIconButton>
            <AnimatedIconButton color="secondary" onClick={handleDeleteClick}>
              <DeleteIcon />
            </AnimatedIconButton>
          </>
        )}
      </CardActions>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Share via</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <IconButton onClick={() => handleShareVia('gmail')}>
                <EmailIcon fontSize="large" color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleShareVia('whatsapp')}>
                <WhatsAppIcon fontSize="large" style={{ color: '#25D366' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleShareVia('instagram')}>
                <InstagramIcon fontSize="large" style={{ color: '#E4405F' }} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default PropertyCard;
