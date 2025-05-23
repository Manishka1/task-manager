import React, { useState } from 'react';
import {
  Box, Paper, TextField, Button, Typography, Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const auth     = useSelector(s => s.auth);
  const [email, setEmail] = useState('');
  const [pw, setPw]       = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(register({ email, password: pw }));
    if (!auth.error) history.push('/login');
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper elevation={3} sx={{ p:4, width:350 }}>
        <Typography variant="h5" mb={2}>Register</Typography>
        {auth.error && <Alert severity="error">{auth.error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email" fullWidth margin="normal"
            value={email} onChange={e=>setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password" type="password"
            fullWidth margin="normal"
            value={pw} onChange={e=>setPw(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt:2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
