import axiosInstance from './axiosInstance';

export const fetchUsers = () => axiosInstance.get('/users');
export const deleteUser = id => axiosInstance.delete(`/users/${id}`);