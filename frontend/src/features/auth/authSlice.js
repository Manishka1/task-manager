import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../api/authService';
import {jwtDecode} from 'jwt-decode';
// Import as a named import

// Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    const res = await authService.login({ email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    const res = await authService.register({ email, password });
    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const decodedToken = jwtDecode(action.payload.token); 
        state.user = { token: action.payload.token, role: decodedToken.role };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

// Selector to get user role
export const selectUserRole = (state) => state.auth.user?.role;

export default authSlice.reducer;