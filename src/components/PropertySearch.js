// src/components/PropertySearch.js
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import { TextField, Box } from '@mui/material';
import debounce from 'lodash/debounce';

const PropertySearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      dispatch(getProperties({ query: searchQuery }));
    }, 500),
    [dispatch]
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2} mb={2}>
      <TextField
        variant="outlined"
        value={query}
        onChange={handleSearch}
        placeholder="Search properties..."
        fullWidth
        sx={{ marginRight: 2 }}
      />
    </Box>
  );
};

export default PropertySearch;

