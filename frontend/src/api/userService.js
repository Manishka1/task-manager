import axios from './axiosInstance';

export const fetchUsers = () => axios.get('/users');
export const deleteUser = id => axios.delete(`/users/${id}`);