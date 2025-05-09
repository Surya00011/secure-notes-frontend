import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import NoteCard from './NoteCard';
import { getAllNotes } from '../services/noteService';

const NoteDashboard = ({ reloadTrigger, onEditNote }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [reloadTrigger]);

  const handleNoteDeleted = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3, py: 2 }}>
      {notes.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No notes found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.noteId}>
              <NoteCard
                note={note}
                onEdit={() => onEditNote(note)} // Call parent handler
                onDelete={handleNoteDeleted}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default NoteDashboard;
