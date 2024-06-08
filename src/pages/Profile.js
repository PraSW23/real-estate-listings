// src/pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, loadUser } from '../actions/authActions';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const AvatarLarge = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: 'auto',
}));

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    mobileNumber: '', // Add mobileNumber to the formData state
  });

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        mobileNumber: user.mobileNumber || '', // Initialize mobileNumber
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
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
      <StyledCard>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <AvatarLarge src={user && user.avatar} alt={user && user.name} />
              <Typography variant="h5" gutterBottom>
                {user && user.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user && user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  variant="outlined"
                  margin="normal"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  variant="outlined"
                  margin="normal"
                  value={formData.bio}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
                <CardActions>
                  <Button type="submit" color="primary" variant="contained" fullWidth>
                    Update Profile
                  </Button>
                </CardActions>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default UserProfile;
