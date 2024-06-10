// src/components/PropertySearch.js
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import { TextField, Box } from '@mui/material';
import debounce from 'lodash/debounce';

const PropertySearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    debounce((value) => {
      dispatch(getProperties({ query: value }));
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2} mb={2}>
      <TextField
        variant="outlined"
        value={query}
        onChange={handleChange}
        placeholder="Search properties..."
        fullWidth
        sx={{ marginRight: 2 }}
      />
    </Box>
  );
};

export default PropertySearch;
