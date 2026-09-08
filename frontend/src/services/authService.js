import api, { unwrap } from "./api.js";

export const register = (payload) => unwrap(api.post('/users/register', payload));

export const login = (payload) => unwrap(api.post('/users/login', payload));

export const logout = () => unwrap(api.post('/users/logout'));

export const getCurrentUser = () => unwrap(api.get('/users/current-user'));

export const updateAccount = (payload) => unwrap(api.patch('/users/update-account', payload));

export const changePassword = (payload) => unwrap(api.post('/users/change-password', payload));

