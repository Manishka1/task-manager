import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const { user } = useSelector(s => s.auth); // assume user = { id, role, ... }

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          TaskManager
        </Typography>

        {user ? (
          <Box>
            {user.role === 'admin' && (
              <Button color="inherit" onClick={()=>history.push('/users')}>
                Users
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={()=>history.push('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={()=>history.push('/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}