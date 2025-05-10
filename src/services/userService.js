import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Utility to get token from sessionStorage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");       
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all notes
export const getProfileInfo = async () => {
  const config = getAuthHeaders();
  const response = await axios.get(`${BASE_URL}/profile`, config);
  return response.data;
};

// delete account
export const deleteAccountService = async () => {
  const config = getAuthHeaders();
  const response = await axios.delete(`${BASE_URL}/delete-account`, config);
  return response.data;
};
