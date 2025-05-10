import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

// Utility to get token from sessionStorage
const getToken = () => sessionStorage.getItem("token");

// Login with email and password
export const loginService = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data; 
};

// Forgot Password – send reset link
export const forgotPasswordService = async (email) => {
  const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
  return response.data;
};

// Reset Password – send new password and token
export const resetPasswordService = async (newPassword, token) => {
  const response = await axios.post(`${BASE_URL}/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
};

// Pre-register – send OTP
export const sendOtpService = async (email) => {
  const response = await axios.post(`${BASE_URL}/pre-register`, { email });
  return response.data;
};

// Verify OTP
export const verifyOtpService = async (otp, email) => {
  const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
  return response.data;
};

// Register new user
export const registerService = async (email, username, password) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    email,
    username,
    password,
  });
  return response.data;
};

// Optional: Attach token for authenticated requests (used in userService.js)
export const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
