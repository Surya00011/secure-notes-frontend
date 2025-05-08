import React, { useEffect, useState } from 'react';
import { getProfileInfo, deleteAccountServive } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button as MuiButton } from '@mui/material';
import { Button, Alert } from 'react-bootstrap';

const ProfileInfo = () => {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({});
  const [error, setError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const queryParams = new URLSearchParams(location.search);
      const tokenFromURL = queryParams.get("token");

      if (tokenFromURL) {
        localStorage.setItem("token", tokenFromURL);
      }

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
        const response = await getProfileInfo(config);
        setProfileInfo(response);
      } catch (error) {
        setError(error);
      }
    };
    fetchProfileInfo();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await deleteAccountServive(config);

      localStorage.removeItem("token");
      setProfileInfo(null);
      setError("");
      setShowConfirmDialog(false);
      setShowAlert(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Account deletion failed.");
    }
  };

  if (!profileInfo || Object.keys(profileInfo).length === 0) {
    return <div className='d-flex justify-content-center'>Loading...</div>;
  }

  return (
    <div>
      <Box sx={{ py: 4, px: 4, textAlign: 'left' }}>
        <Typography variant="h5" gutterBottom>Profile</Typography>
        <Typography variant="body2">Welcome to your profile.</Typography>
        <Typography variant="body1">Email: {profileInfo.email}</Typography>
        <Typography variant="body1">Username: {profileInfo.username}</Typography>

        <Button
          variant="danger"
          onClick={() => setShowConfirmDialog(true)}
          style={{ marginTop: '1rem' }}
        >
          Delete Account
        </Button>

        {/* Confirmation Dialog */}
        <Dialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={() => setShowConfirmDialog(false)} color="primary">
              Cancel
            </MuiButton>
            <MuiButton onClick={handleDeleteAccount} color="error">
              Yes, Delete
            </MuiButton>
          </DialogActions>
        </Dialog>

        {/* Success Alert */}
        {showAlert && (
          <Alert variant="danger" className="mt-3">
            Your account has been deleted. Redirecting to login page...
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default ProfileInfo;
