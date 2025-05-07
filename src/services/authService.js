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