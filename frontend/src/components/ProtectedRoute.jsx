import React from 'react';
import { Route } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector(state => state.auth.user);
  const history = useHistory();

  return (
  <Route
    {...rest}
    render={(props) =>
      user ? (
        <Component {...props} />
      ) : (
        <Box textAlign="center" mt={10}>
          <Typography variant="h5" gutterBottom>
            Please login to view tasks
          </Typography>
          <Button onClick={() => history.push('/login')}>
            Go to Login
          </Button>
        </Box>
      )
    }
  />
);
}