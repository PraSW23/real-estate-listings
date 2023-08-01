import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PropertySearch = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass the search criteria to the parent component
    onSearch({ location, priceRange });
  };

  return (
    <div>
      <h2>Property Search</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default PropertySearch;
