import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PropertySearch = ({ onSearch, onClear }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass the search criteria to the parent component
    onSearch({ location, priceRange });
    setIsActive(true);
  };

  const handleClear = () => {
    setLocation('');
    setPriceRange('');
    setIsActive(false);
    onClear();
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
            name="location"
          />
        </Form.Group>

        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            name="priceRange"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isActive}>
          Search
        </Button>
        <Button variant="secondary" type="button" onClick={handleClear} disabled={!isActive}>
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default PropertySearch;