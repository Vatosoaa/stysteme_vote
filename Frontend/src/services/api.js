import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: API_URL,
});

// --- Intercepteur de requête ---
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
