// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    navigate('/UserDashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 8, backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
          Login
        </Typography>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: '20px' }}
        >
          Login
        </Button>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          New User? <Link to="/signup" style={{ color: '#ff4081', textDecoration: 'none' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
