import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { updateNote } from '../services/noteService';

const UpdateNoteFormDialog = ({ open, onClose, onNoteUpdated, note }) => {
  const [title, setTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);             // ✅ use `title` from backend
      setNoteContent(note.note);
      setDeadline(note.deadline);
    }
  }, [note]);

  const handleUpdateNote = async () => {
    const updatedNote = {
      title,                            // ✅ send `title` not `noteTitle`
      note: noteContent,
      deadline,
    };

    try {
      await updateNote(note.noteId, updatedNote); // Update the note
      onNoteUpdated(); // Callback to reload notes
      onClose();       // Close the dialog
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Note</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Note"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <TextField
          label="Deadline"
          fullWidth
          margin="normal"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateNote} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateNoteFormDialog;
