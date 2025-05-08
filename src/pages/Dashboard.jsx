import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProfileInfo from '../components/ProfileInfo';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { MdLockPerson, MdPersonOutline } from 'react-icons/md';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <MdPersonOutline/>,
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
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
     {pathname === '/dashboard' && (
        <Typography>Dashboard content for {pathname}</Typography>
      )}

      {pathname === '/profile' && <ProfileInfo />}
    </Box>
  )
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
        logo: <MdLockPerson/>,
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
