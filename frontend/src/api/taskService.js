import axios from './axiosInstance';

export const fetchTasks  = params    => axios.get('/tasks', { params });
export const fetchTask   = id        => axios.get(`/tasks/${id}`);
export const createTask  = data      => axios.post('/tasks', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateTask  = (id, data) => axios.put(`/tasks/${id}`, data);
export const deleteTask  = id        => axios.delete(`/tasks/${id}`);
export const downloadDoc = filename  =>
  axios.get(`/tasks/doc/${filename}`, { responseType: 'blob' });