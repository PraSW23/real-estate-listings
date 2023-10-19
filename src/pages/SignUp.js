import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/signup', { email, password });
      // Handle the response or perform additional actions after successful sign-up
      console.log(response.data);
    } catch (error) {
      // Handle any errors that occur during sign-up
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignUp}>
        <Form.Group>
          <label htmlFor="email">Email</label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <label htmlFor="password">Password</label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;