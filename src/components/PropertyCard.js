//src/components/PropertyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, handleDelete }) => {
  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.price}</p>
      <p>{property.location}</p>
      <Link to={`/PropertyDetails/${property._id}`}>View Details</Link>
      {handleDelete && <button onClick={() => handleDelete(property._id)}>Delete</button>}
    </div>
  );
};

export default PropertyCard;

