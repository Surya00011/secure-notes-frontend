import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllNotes = async (config) => {
    const response = await axios.get(`${BASE_URL}/view-notes`, config);
    return response;
  };