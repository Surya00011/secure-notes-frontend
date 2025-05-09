import React, { useState } from 'react';
import { deleteAccountService } from '../services/userService';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
} from '@mui/material';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ProfileInfo = () => {
  const { profile, token, logout } = useAuth();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  if (!profile) {
    return <div className="d-flex justify-content-center">Loading...</div>;
  }

  const handleDeleteAccount = async () => {
    try {
      
      await deleteAccountService();

      setShowDeleteDialog(false);
      setShowAlert(true);

      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Account deletion failed.");
    }
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    logout();
  };

  return (
    <div className='d-flex justify-content-center'>
    <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5 }}>
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 3 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#1976d2' }}>
              {profile.username?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title="User Profile"
          subheader="Account Information"
        />
        <Divider />
        <CardContent>
         
          <Typography variant="h6" gutterBottom>{profile.email}</Typography>
     
          <Typography variant="h6" gutterBottom>{profile.username}</Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" gap={2}>
            <Button variant="danger" onClick={() => setShowDeleteDialog(true)}>
              Delete Account
            </Button>
            <Button variant="primary" onClick={() => setShowLogoutDialog(true)}>
              Logout
            </Button>
          </Box>

          {showAlert && (
            <Alert variant="danger" className="mt-3">
              Your account has been deleted. Redirecting to login page...
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setShowDeleteDialog(false)} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteAccount} color="error">
            Yes, Delete
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setShowLogoutDialog(false)} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleLogoutConfirm} color="error">
            Yes, Logout
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default ProfileInfo;
