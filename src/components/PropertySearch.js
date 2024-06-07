// src/components/PropertySearch.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import { TextField, Button, Box } from '@mui/material';

const PropertySearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    // Assuming the backend supports search query
    dispatch(getProperties(query));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2} mb={2}>
      <TextField
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search properties..."
        fullWidth
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default PropertySearch;
