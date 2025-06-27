import api from './api';

const ADMIN_BASE_URL = '/admin';

export async function getAllVoters() {
    try {
        const response = await api.get(`${ADMIN_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les votants (Admin API):', error);
        throw error;
    }
}
