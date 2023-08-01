import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import PropertySearch from '../components/PropertySearch';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const handleSearch = (criteria) => {
    axios.get('http://localhost:3000/api/properties', {
      params: {
        location: criteria.location,
        priceRange: criteria.priceRange
      }
    })
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Property List</h2>
      <PropertySearch onSearch={handleSearch} />
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <Card key={property.id}>
            <Card.Body>
              <Card.Title>{property.address}</Card.Title>
              <Card.Text>{property.price}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default PropertyList;
