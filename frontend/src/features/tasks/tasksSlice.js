import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

/* =========================
   THUNKS
========================= */

// Fetch all tasks (with filters + pagination)
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('/tasks', { params });
      return response.data; // { tasks, total }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch single task
export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.get(`/tasks/${taskId}`);
      return response.data; // IMPORTANT FIX
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Create task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', taskData);
      return response.data; // IMPORTANT FIX
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`/tasks/${id}`, data);
      return response.data; // IMPORTANT FIX
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH ALL */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.total = action.payload.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ONE */
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;