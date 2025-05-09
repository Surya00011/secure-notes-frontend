import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Get the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllNotes = async () => {
  const config = getAuthHeaders();
  const response = await axios.get(`${BASE_URL}/view-notes`, config);
  return response;
};

export const createNote = async (note) => {
  const config = getAuthHeaders();
  const response = await axios.post(`${BASE_URL}/add-notes`, note, config);
  return response;
};

export const updateNote = async (noteId, note) =>{
  const config = getAuthHeaders();
  const response = await axios.put(`${BASE_URL}/update-note/${noteId}`, note, config)
  return response;
}

export const deleteNote = async (noteId) =>{
  const config = getAuthHeaders();
  const response = await axios.delete(`${BASE_URL}/delete-note/${noteId}`, config)
  return response;
}