//src/components/PropertySearch.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProperties } from '../actions/propertyActions';

const PropertySearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    // Assuming the backend supports search query
    dispatch(getProperties(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search properties..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PropertySearch;

