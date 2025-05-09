import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProfileInfo from '../components/ProfileInfo';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { MdLockPerson, MdPersonOutline } from 'react-icons/md';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteDashboard from '../components/NoteDashboard';
import NoteFormDialog from '../components/NoteFormDialog';
import UpdateNoteFormDialog from '../components/UpdateNoteFormDialog';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <MdPersonOutline />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardContent({ pathname }) {
  const [openForm, setOpenForm] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState(null);
  const [reloadFlag, setReloadFlag] = React.useState(false);

  const handleNoteCreated = () => {
    setReloadFlag((prev) => !prev);
  };

  const handleNoteUpdated = () => {
    setReloadFlag((prev) => !prev);
    setOpenUpdateDialog(false);
    setSelectedNote(null);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setOpenUpdateDialog(true);
  };

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column' }}>
      {pathname === '/dashboard' && (
        <>
          <NoteDashboard
            reloadTrigger={reloadFlag}
            onEditNote={handleEditNote}
          />

          <NoteFormDialog
            open={openForm}
            onClose={() => setOpenForm(false)}
            onNoteCreated={handleNoteCreated}
          />

          <UpdateNoteFormDialog
            open={openUpdateDialog}
            onClose={() => setOpenUpdateDialog(false)}
            note={selectedNote}
            onNoteUpdated={handleNoteUpdated}
          />

          <Fab
            color="primary"
            size="medium"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1000,
            }}
            onClick={() => setOpenForm(true)}
          >
            <AddIcon />
          </Fab>
        </>
      )}

      {pathname === '/profile' && <ProfileInfo />}
    </Box>
  );
}

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const dashboardWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <MdLockPerson />,
        title: 'Secure Notes',
        homeUrl: '/dashboard',
      }}
      router={router}
      theme={theme}
      window={dashboardWindow}
    >
      <DashboardLayout>
        <DashboardContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
