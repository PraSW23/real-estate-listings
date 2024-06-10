// src/pages/SearchProperties.js
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties, getNewProperties } from '../actions/propertyActions';
import PropertyCard from '../components/PropertyCard';
import { CircularProgress, Container, Typography, Grid, Box, TextField, Button } from '@mui/material';
import debounce from 'lodash/debounce';

const SearchProperties = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(state => state.property);

  const handleInputChange = useCallback(
    debounce((params) => {
      dispatch(getProperties(params));
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange({ [name]: value });
  };

  const handleLatestProperties = () => {
    dispatch(getNewProperties());
  };

  const handleOldestProperties = () => {
    dispatch(getProperties({ sort: 'oldest' }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ margin: '20px' }}>
        Advanced Property Search
      </Typography>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Title"
              name="query"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Location"
              name="location"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Owner"
              name="owner"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Min Price"
              name="minPrice"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Max Price"
              name="maxPrice"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="secondary" onClick={handleLatestProperties}>
          Latest Properties
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOldestProperties} style={{ marginLeft: '10px' }}>
          Oldest Properties
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {properties.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchProperties;
