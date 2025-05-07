import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { forgotPasswordService } from "../services/authService";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    try {
      const response = await forgotPasswordService(email);
      setMessage(response.message || "Password reset link sent!");
      setError("");
    } catch (error) {
      setError("Failed to send email. " + (error.response?.data?.message || error.message));
      setMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card style={{ width: "22rem" }} className="p-3 shadow-lg">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Forgot Password</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleForgotPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Send Reset Link
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
