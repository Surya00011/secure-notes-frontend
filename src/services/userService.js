import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getProfileInfo = async (config) =>{
   const response = await axios.get(`${BASE_URL}/profile`,config);
   return response.data;
}

export const deleteAccountServive = async (config) =>{
    const response = await axios.delete(`${BASE_URL}/delete-account`,config);
    return response.data;
}