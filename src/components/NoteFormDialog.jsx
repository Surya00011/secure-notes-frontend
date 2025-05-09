import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { createNote } from '../services/noteService';

const NoteFormDialog = ({ open, onClose, onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async () => {
    try {
      await createNote({ title, note, deadline });
      onClose();
      onNoteCreated(); // Reload notes
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Note"
          fullWidth
          multiline
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Deadline"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteFormDialog;
