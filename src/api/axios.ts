import axios from 'axios';

// Vite exposes environment variables under import.meta.env
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // `config.headers` may be an AxiosHeaders instance — use a safe any cast to set Authorization
        (config.headers as any) = (config.headers as any) || {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;