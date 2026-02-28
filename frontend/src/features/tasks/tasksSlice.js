import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch task statistics action
export const fetchTaskStats = createAsyncThunk('tasks/fetchTaskStats', async () => {
  const response = await axios.get('/api/tasks/stats'); // Adjust endpoint as needed
  return response.data;
});

// Existing async actions
export const fetchTask = createAsyncThunk('tasks/fetchTask', async (taskId) => {
  const response = await axios.get(`/api/tasks/${taskId}`);
  return response.data.task;
});

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('/api/tasks');
  return response.data.tasks;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await axios.post('/api/tasks', taskData);
  return response.data.task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`/api/tasks/${taskId}`);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    error: null,
    stats: null, // For storing stats
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchTaskStats.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;