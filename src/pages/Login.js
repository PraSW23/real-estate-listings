import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      // Handle the response or perform additional actions after successful login
      console.log(response.data);
    } catch (error) {
      // Handle any errors that occur during login
      console.error(error);
    }
  }, [email, password]);

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;