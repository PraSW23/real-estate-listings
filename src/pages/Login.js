// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [open, setOpen] = useState(false); // State to manage Snackbar open/close

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authError = useSelector(state => state.auth.error);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      navigate('/UserDashboard');
    } catch (err) {
      setOpen(true); // Open the Snackbar to display the error message
    }
  };

  return (
    <>
    <Header />
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
          <AlertTitle>Error! Invalid Password or Email</AlertTitle>
          {authError}
        </Alert>
      </Snackbar>
    </Container>
    </>
  );
};

export default Login;
