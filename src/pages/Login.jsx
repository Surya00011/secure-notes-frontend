import React, { useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginService } from "../services/authService";
import { Button, Form, Alert, Card } from "react-bootstrap";
import { MdLockPerson } from "react-icons/md";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await loginService({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        setErrorMessage("Network Error");
      }
    } catch (error) {
      setErrorMessage("Login Failed. " + (error.response?.data?.message || error.message));
      console.error(error.message);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      {/* Header with App Name */}
      <div className="text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h1 className="text-dark" style={{ fontSize: "3rem", fontWeight: "bold" }}>Secure Notes <MdLockPerson /></h1>
      </div>

      <Card style={{ width: "100%", maxWidth: "400px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          {/* Error Message */}
          {errorMessage && (
            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
              <Alert.Heading>Login Failed</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}


          {/* Login Form */}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <p style={{textAlign:"center"}}>Sign up with Email</p>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <div className="d-flex justify-content-between mb-3">
                <Link to="/forgot-password" className="text-decoration-none">
                 Forgot Password?
                </Link>
               <Link to="/register" className="text-decoration-none">
                 Create Account
               </Link>
            </div>

            <div className="text-center mb-3">
              <p>Or sign in with</p>
              <Button variant="light" onClick={() => handleOAuthLogin("github")} className="me-2">
                <i className="ci ci-github"></i> GitHub
              </Button>
              <Button variant="light" onClick={() => handleOAuthLogin("google")}>
                <i className="ci ci-google"></i> Google
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Footer */}
      <div className="mt-4 text-center text-muted">
        <small>Secure Notes - Your safe place to store and manage notes</small>
      </div>
    </div>
  );
};

export default Login;
