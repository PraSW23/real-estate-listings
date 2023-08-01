import React from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = ({ property }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={property.image} />
      <Card.Body>
        <Card.Title>{property.address}</Card.Title>
        <Card.Text>{property.price}</Card.Text>
        {/* Add other property details */}
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
