import axiosInstance from './axiosInstance';

export const login = creds    => axiosInstance.post('/auth/login', creds);
export const register = creds => axiosInstance.post('/auth/register', creds);