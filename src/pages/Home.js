// src/pages/PropertyList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import PropertyCard from '../components/PropertyCard';

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(state => state.property);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Property List</h1>
      <div>
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;