import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',       // adjust your primary color
    },
    secondary: {
      main: '#f50057',       // adjust your accent color
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // no uppercase
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;