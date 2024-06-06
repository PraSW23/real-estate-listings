//src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import PropertyCard from '../components/PropertyCard';
import PropertySearch from '../components/PropertySearch';

const Home = () => {
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
      <h1>Properties</h1>
      <PropertySearch />
      <div>
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
