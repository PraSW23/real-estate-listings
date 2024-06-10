// src/pages/SignUp.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: ''
  });

  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authError = useSelector(state => state.auth.error);

  const { name, email, password, mobileNumber } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password, mobileNumber }));
      navigate('/UserDashboard');
    } catch (err) {
      setOpen(true); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 8, backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          margin="normal"
          required
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          margin="normal"
          required
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          margin="normal"
          required
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Mobile Number"
          name="mobileNumber"
          value={mobileNumber}
          onChange={onChange}
          margin="normal"
          sx={{ marginBottom: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: '20px' }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          Already a User? <Link to="/login" style={{ color: '#ff4081', textDecoration: 'none' }}>Login</Link>
        </Typography>
      </Box>
      {/* Snackbar to display error message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error! User already exists</AlertTitle>
          {authError}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
