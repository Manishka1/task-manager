import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../api/taskService';

// Thunks
export const fetchTasks   = createAsyncThunk('tasks/fetchAll', async (params) => {
  const res = await service.fetchTasks(params);
  return res.data;
});
export const fetchTask    = createAsyncThunk('tasks/fetchOne', async (id) => {
  const res = await service.fetchTask(id);
  return res.data;
});
export const createTask   = createAsyncThunk('tasks/create', async (formData) => {
  const res = await service.createTask(formData);
  return res.data;
});
export const updateTask   = createAsyncThunk('tasks/update', async ({ id, data }) => {
  const res = await service.updateTask(id, data);
  return res.data;
});
export const deleteTask   = createAsyncThunk('tasks/delete', async (id) => {
  await service.deleteTask(id);
  return id;
});

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    total: 0,
    task: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchAll
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.total = action.payload.total;
      })
      // fetchOne
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      // create
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      // update
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
        if (state.task && state.task._id === action.payload._id) {
          state.task = action.payload;
        }
      })
      // delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
        if (state.task && state.task._id === action.payload) {
          state.task = null;
        }
      })
      // common error handling
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => { state.error = action.error.message; }
      );
  }
});

export default slice.reducer;
