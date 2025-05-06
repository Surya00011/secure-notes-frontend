import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllNotes } from "../services/noteService";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      navigate("/dashboard", { replace: true });
    }

    const fetchNotes = async () => {
      const token = tokenFromURL || localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        navigate("/");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await getAllNotes(config);
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes. " + (err.response?.data?.message || err.message));
      }
    };

    fetchNotes();
  }, [location, navigate]);

  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return "N/A";
    const [year, month, day] = dateArray;
    return `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;
  };

  return (
    <div style={{ minHeight: "100vh", padding: "24px", backgroundColor: "#f9fafb" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", textAlign: "left", color: "#1e40af", marginBottom: "30px" }}>
        Dashboard
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {notes.length === 0 && !error ? (
        <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>No notes added yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {notes.map((note) => (
            <div
              key={note.noteId}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.2s",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px", color: "#111827" }}>
                {note.noteTitle}
              </h2>
              <p style={{ color: "#374151", marginBottom: "12px" }}>{note.note}</p>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                <p><strong>Created:</strong> {formatDate(note.created)}</p>
                <p><strong>Deadline:</strong> {formatDate(note.deadline)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
