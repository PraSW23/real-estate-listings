import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ContactAgent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/contact-agent', { email, message });
      // Handle the response or perform additional actions after successful contact
      console.log(response.data);
    } catch (error) {
      // Handle any errors that occur during contact
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Contact Agent</h2>
      <Form onSubmit={handleContact}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Message
        </Button>
      </Form>
    </div>
  );
};

export default ContactAgent;
