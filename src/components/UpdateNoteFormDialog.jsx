import React, { useRef, useEffect } from 'react';
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
  const titleRef = useRef();
  const noteContentRef = useRef();
  const deadlineRef = useRef();

  useEffect(() => {
    if (note) {
      if (titleRef.current) titleRef.current.value = note.title ?? '';
      if (noteContentRef.current) noteContentRef.current.value = note.note ?? '';
      if (deadlineRef.current) deadlineRef.current.value = note.deadline ?? '';
    }
  }, [note]);

  const handleUpdateNote = async () => {
    const updatedNote = {
      title: titleRef.current.value,
      note: noteContentRef.current.value,
      deadline: deadlineRef.current.value,
    };

    try {
      await updateNote(note.noteId, updatedNote);
      onNoteUpdated();
      onClose();
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
          inputRef={titleRef}
          defaultValue={note?.title ?? ''}
        />
        <TextField
          label="Note"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          inputRef={noteContentRef}
          defaultValue={note?.note ?? ''}
        />
        <TextField
          label="Deadline"
          fullWidth
          margin="normal"
          type="date"
          inputRef={deadlineRef}
          defaultValue={note?.deadline ?? ''}
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
