import axios from "axios";

const BASE_URL = "http://localhost:8080";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

export const getProfileInfo = async () =>{
   const config = getAuthHeaders() 
   const response = await axios.get(`${BASE_URL}/profile`,config);
   return response.data;
}

export const deleteAccountService = async () =>{
    const config = getAuthHeaders() 
    const response = await axios.delete(`${BASE_URL}/delete-account`,config);
    return response.data;
}