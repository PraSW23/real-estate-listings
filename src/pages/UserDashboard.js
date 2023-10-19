import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const savedProperties = useSelector((state) => state.auth.savedProperties);
  const contactHistory = useSelector((state) => state.auth.contactHistory);
  const [activeProperty, setActiveProperty] = useState(null);

  const handlePropertyClick = (property) => {
    setActiveProperty(property);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Saved Properties</h3>
      {savedProperties.length === 0 ? (
        <p>No saved properties.</p>
      ) : (
        <ul>
          {savedProperties.map((property) => (
            <li
              key={property.id}
              onClick={() => handlePropertyClick(property)}
              style={{ cursor: 'pointer', fontWeight: activeProperty === property ? 'bold' : 'normal' }}
            >
              {property.address}
            </li>
          ))}
        </ul>
      )}

      {activeProperty && (
        <div>
          <h3>Active Selection</h3>
          <p>{activeProperty.address}</p>
          {/* Add other details about the active property */}
        </div>
      )}

      <h3>Contact History</h3>
      {contactHistory.length === 0 ? (
        <p>No contact history.</p>
      ) : (
        <ul>
          {contactHistory.map((contact) => (
            <li key={contact.id}>
              {contact.agentName}: {contact.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;