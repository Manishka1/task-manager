import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/tasks', { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// fetch single task
export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// create task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, data);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

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

    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;  
      state.total = action.payload.total; 
    })

    .addCase(fetchTask.fulfilled, (state, action) => {
      state.task = action.payload;
    })

    .addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    })

    .addCase(updateTask.fulfilled, (state, action) => {
      state.task = action.payload;
      state.tasks = state.tasks.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
    })

    .addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    });
},
});

export default tasksSlice.reducer;