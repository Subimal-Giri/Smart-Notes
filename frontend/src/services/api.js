import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let redirecting = false;

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status;
        const url = err.config?.url || '';

        // Do not force-logout on a failed login/register attempt itself
        const isAuthEndpoint = url.includes('/users/login') || url.includes('/users/register');

        if (status === 401 && !isAuthEndpoint && !redirecting) {
            redirecting = true;
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }

        return Promise.reject(err);
    }
);

export const unwrap = (promise) => promise.then((res) => res.data);

export default api;

