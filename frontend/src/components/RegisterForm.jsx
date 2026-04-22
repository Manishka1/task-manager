import React, { useState, useEffect } from 'react';
import {
  Box, Paper, TextField, Button, Typography, Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {

  const dispatch = useDispatch();
  const history  = useHistory();
  const { error, user, loading } = useSelector(s => s.auth);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password: pw }));
  };

  useEffect(() => {
    if (user) {
      history.push('/login');
    }
  }, [user, history]);

  const inputStyle = {
    input: { color: '#fff' },
    label: { color: 'rgba(255,255,255,0.6)' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.2)'
      },
      '&:hover fieldset': {
        borderColor: '#ab00ff'
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          radial-gradient(circle at 20% 30%, rgba(171,0,255,0.15), transparent 40%),
          #0b040d
        `,
        px: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          width: '100%',
          maxWidth: 900,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >

        {/* LEFT — REGISTER */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff'
          }}
        >
          <Typography variant="h5" mb={1} fontWeight={600}>
            Create your account
          </Typography>

          <Typography variant="body2" mb={2} color="rgba(255,255,255,0.6)">
            Start managing your team with MiniTeam
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={inputStyle}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              sx={inputStyle}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #7f00ff, #e100ff)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #6a00d4, #c400d6)'
                }
              }}
            >
              {loading ? 'Creating...' : 'Get Started'}
            </Button>
          </Box>
        </Paper>

        {/* RIGHT — DEMO CARD */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(171,0,255,0.25)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h6" mb={1} fontWeight={600}>
            Explore Role-Based Access
          </Typography>

          <Typography fontSize={14} mb={3} color="rgba(255,255,255,0.6)">
            Try demo accounts to see how permissions change between Admin and User roles.
          </Typography>

          {/* ADMIN */}
          <Box mb={2}>
            <Typography fontWeight={600} color="#ddbbf1">
              Admin
            </Typography>
            <Typography fontSize={13}>admin@gmail.com</Typography>
            <Typography fontSize={13}>123456</Typography>
          </Box>

          {/* USER */}
          <Box mb={3}>
            <Typography fontWeight={600} color="#ddbbf1">
              User
            </Typography>
            <Typography fontSize={13}>user@gmail.com</Typography>
            <Typography fontSize={13}>123456</Typography>
          </Box>

          <Typography fontSize={13} color="rgba(255,255,255,0.6)">
            Use the <span style={{ color: "#ab00ff" }}>Admin account</span> to access admin features.
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
}