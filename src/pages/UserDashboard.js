//src/pages/UserDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties, deleteProperty } from '../actions/propertyActions';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(state => state.property);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to="/add-property">Add Property</Link>
      <div>
        {properties.map(property => (
          <PropertyCard 
            key={property._id}
            property={property}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
