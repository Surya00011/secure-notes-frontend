import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const loginService = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data; // return the token 
};
