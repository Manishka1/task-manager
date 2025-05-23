import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../api/userService';

// Thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const res = await userService.fetchUsers();
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId) => {
    await userService.deleteUser(userId);
    return userId;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;