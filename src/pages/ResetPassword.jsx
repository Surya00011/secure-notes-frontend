import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { resetPasswordService } from '../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { MdLockPerson } from 'react-icons/md';
import {Link} from 'react-router-dom';

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setErrorMessage] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const location = useLocation();
  const [token, setToken] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const response = await resetPasswordService(password, token); 
      setMessage(response.message);
      setErrorMessage(""); 
    } catch (error) {
      setErrorMessage("Reset failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <Card style={{ width: '24rem' }} className='p-4 shadow'>
        <div className="text-center mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            <h1 className="text-dark" style={{ fontSize: "1rem", fontWeight: "bold" }}>Secure Notes <MdLockPerson /></h1>
        </div>
        <Card.Title className='text-center mb-3'style={{fontSize:"2rem"}} >Reset Password</Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleResetPassword}>
            <Form.Group className='mb-3'>
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password@99"
                  ref={passwordRef}
                  required
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Password@99"
                  ref={confirmPasswordRef}
                  required
                />
                <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <Card.Body>
        <div className="d-flex justify-content-center">
                <Link to="/login" className="text-decoration-none">
                 Back to Login
                </Link>       
           </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPassword;
