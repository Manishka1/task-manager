import React from 'react';
import { Route } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Box textAlign="center" mt={10}>
            <Typography variant="h5" gutterBottom>
              Please login to view tasks
            </Typography>
            <Button
              variant="contained"
              onClick={() => history.push('/login')}
            >
              Go to Login
            </Button>
          </Box>
        )
      }
    />
  );
}