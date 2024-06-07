// src/components/ContactAgent.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ContactAgent = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle contact agent form submission
    console.log(`Contact agent for property ${propertyId}`, formData);
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off" sx={{ mt: 3 }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="message"
        label="Message"
        name="message"
        multiline
        rows={4}
        value={message}
        onChange={onChange}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Contact Agent
      </Button>
    </Box>
  );
};

export default ContactAgent;
