//src/components/ContactAgent.js
import React, { useState } from 'react';

const ContactAgent = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle contact agent form submission
    console.log(`Contact agent for property ${propertyId}`, formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <label>Message</label>
        <textarea name="message" value={message} onChange={onChange} required />
      </div>
      <button type="submit">Contact Agent</button>
    </form>
  );
};

export default ContactAgent;

