import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { resetPasswordService } from '../services/authService';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setErrorMessage] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (!token) {
      setErrorMessage("Invalid or expired token");
    } else {
      setToken(token);
      setErrorMessage(""); 
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault(); 

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await resetPasswordService(password, token); // ✅ pass password + token
      setMessage(response.message);
      setErrorMessage(""); 
    } catch (error) {
      setErrorMessage("Reset failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <Card style={{ width: '24rem' }} className='p-4 shadow'>
        <Card.Title className='text-center mb-3'>Reset Password</Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleResetPassword}>
            <Form.Group className='mb-3'>
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password@99"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password@99"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPassword;
