import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const loginService = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data; // return the token 
};

export const forgotPasswordService = async (email) =>{
  const response = await axios.post(`${BASE_URL}/forgot-password`, {email});
  return response.data; //send resetlink in email
}

export const resetPasswordService = async (newPassword, token) => {
  // Send the token along with the new password in the body
  const response = await axios.post(
    `${BASE_URL}/reset-password`,
    { token,newPassword } // Send both password and token in the body
  );
  return response.data; // Reset password
};

export const sendOtpService = async (email) =>{
  const response = await axios.post(`${BASE_URL}/pre-register`, {email});
  return response.data; //send otp in email
};

export const verifyOtpService = async (otp, email) =>{
  const response = await axios.post(`${BASE_URL}/verify-otp`, {email,otp});
  return response.data; //verify otp
};

export const registerService = async (email,username,password) =>{
  const response = await axios.post(`${BASE_URL}/register`, {email,username,password});
  return response.data; //return msg
};