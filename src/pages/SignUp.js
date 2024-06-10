// src/pages/SignUp.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '' // Added mobileNumber field
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { name, email, password, mobileNumber } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(register({ name, email, password, mobileNumber })); // Include mobileNumber in the register action
    navigate('/UserDashboard');
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
    </Container>
  );
};

export default SignUp;
