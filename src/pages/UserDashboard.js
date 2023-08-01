import React from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const savedProperties = useSelector((state) => state.auth.savedProperties);
  const contactHistory = useSelector((state) => state.auth.contactHistory);

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Saved Properties</h3>
      {savedProperties.length === 0 ? (
        <p>No saved properties.</p>
      ) : (
        <ul>
          {savedProperties.map((property) => (
            <li key={property.id}>{property.address}</li>
          ))}
        </ul>
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
