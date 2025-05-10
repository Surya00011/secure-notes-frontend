import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;

// Get the token from sessionStorage 
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all notes
export const getAllNotes = async () => {
  const config = getAuthHeaders();
  const response = await axios.get(`${BASE_URL}/view-notes`, config);
  return response;
};

// create a new note
export const createNote = async (note) => {
  const config = getAuthHeaders();
  const response = await axios.post(`${BASE_URL}/add-notes`, note, config);
  return response;
};

// edit a note
export const updateNote = async (noteId, note) => {
  const config = getAuthHeaders();
  const response = await axios.put(`${BASE_URL}/update-note/${noteId}`, note, config);
  return response;
};

// delete a note
export const deleteNote = async (noteId) => {
  const config = getAuthHeaders();
  const response = await axios.delete(`${BASE_URL}/delete-note/${noteId}`, config);
  return response;
};
