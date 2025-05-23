import axios from './axiosInstance';

export const login = creds    => axios.post('/auth/login', creds);
export const register = creds => axios.post('/auth/register', creds);