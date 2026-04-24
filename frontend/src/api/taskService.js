import axiosInstance from './axiosInstance';

export const fetchTasks  = params    => axiosInstance.get('/tasks', { params });
export const fetchTask   = id        => axiosInstance.get(`/tasks/${id}`);
export const createTask  = data      => axiosInstance.post('/tasks', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateTask  = (id, data) => axiosInstance.put(`/tasks/${id}`, data);
export const deleteTask  = id        => axiosInstance.delete(`/tasks/${id}`);
export const downloadDoc = filename  =>
  axiosInstance.get(`/tasks/doc/${filename}`, { responseType: 'blob' });