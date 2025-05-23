import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function NotFound(){
  const history = useHistory();
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>404 – Page Not Found</Typography>
      <Button variant="contained" onClick={()=>history.push('/')}>
        Go Home
      </Button>
    </Box>
  );
}