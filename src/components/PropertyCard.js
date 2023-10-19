import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = ({ property, onPropertySelect }) => {
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = () => {
    setIsActive(!isActive);
    onPropertySelect(property);
  };

  return (
    <Card
      style={{ width: '18rem', cursor: 'pointer', border: isActive ? '2px solid blue' : 'none' }}
      onClick={handleCardClick}
    >
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