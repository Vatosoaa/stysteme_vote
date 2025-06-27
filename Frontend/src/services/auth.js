import api from './api';
import { jwtDecode } from "jwt-decode";

// Service pour la connexion
const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

// Service pour l'inscription
const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

// Service pour la déconnexion
const logout = () => {
    localStorage.removeItem('token');
};

// Fonction pour récupérer l'utilisateur à partir du token
const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwtDecode(token);
            return decodedUser;
        }
        return null;
    } catch (error) {
        console.error("Token invalide", error);
        return null;
    }
}


const authService = {
    login,
    signup,
    logout,
    getCurrentUser,
};

export default authService;
