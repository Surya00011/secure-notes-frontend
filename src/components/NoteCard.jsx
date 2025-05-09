import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { deleteNote } from '../services/noteService';

const parseBackendDateArray = (dateArray) => {
  if (!Array.isArray(dateArray)) return null;

  const [year, month, day, hour = 0, minute = 0, second = 0, nano = 0] = dateArray;
  const millisecond = Math.floor(nano / 1_000_000);

  return new Date(year, month - 1, day, hour, minute, second, millisecond);
};

const formatDate = (dateArray) => {
  const date = parseBackendDateArray(dateArray);
  if (!date || isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('en-GB');
};

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formattedCreatedDate = formatDate(note.created);
  const formattedDeadlineDate = formatDate(note.deadline);

  const handleDelete = async () => {
    try {
      await deleteNote(note.noteId); // Call the delete service
      onDelete(note.noteId); // Callback to remove note from list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
      <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 3 }}>
        <CardHeader
          title={note.noteTitle}
          subheader={`Created on: ${formattedCreatedDate}`}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" onClick={() => onEdit(note)}>
                <MdEdit />
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <MdDeleteForever />
              </IconButton>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {note.note}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deadline: {formattedDeadlineDate}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoteCard;
