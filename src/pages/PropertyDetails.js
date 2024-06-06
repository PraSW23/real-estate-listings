//src/pages/PropertyDetails
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ContactAgent from '../components/ContactAgent';
import axios from '../utils/axiosInstance';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Property Details</h2>
      <Card style={{ width: '18rem' }}>
        {property.images && property.images.map((image, index) => (
          <Card.Img key={index} variant="top" src={image} />
        ))}
        <Card.Body>
          <Card.Title>{property.address}</Card.Title>
          <Card.Text>{property.price}</Card.Text>
          <Card.Text>{property.description}</Card.Text>
          <Card.Text>{property.location}</Card.Text>
          {/* Add other property details */}
        </Card.Body>
      </Card>
      <ContactAgent />
    </div>
  );
};

export default PropertyDetails;
