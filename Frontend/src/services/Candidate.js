import api from './api';

const CANDIDATES_BASE_URL = '/candidates';

export async function createCandidate(candidateData, imageFile) {
    try {
        const formData = new FormData();

        formData.append('fullName', candidateData.fullName);
        formData.append('age', candidateData.age.toString());
        formData.append('description', candidateData.description || '');
        formData.append('slogan', candidateData.slogan || '');
        formData.append('party', candidateData.party || '');

        if (imageFile) {
            formData.append('image', imageFile, imageFile.name);
        }

        const response = await api.post(CANDIDATES_BASE_URL, formData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du candidat:', error);
        throw error;
    }
}

export async function getAllCandidates() {
    try {
        const response = await api.get(CANDIDATES_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des candidats:', error);
        throw error;
    }
}

export async function getCandidateById(id) {
    try {
        const response = await api.get(`${CANDIDATES_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

export async function updateCandidate(id, updateData, imageFile, removeExistingImage = false) {
    try {
        const formData = new FormData();

        formData.append('fullName', updateData.fullName);
        formData.append('age', updateData.age.toString());
        formData.append('description', updateData.description || '');
        formData.append('slogan', updateData.slogan || '');
        formData.append('party', updateData.party || '');

        if (imageFile) {
            formData.append('image', imageFile, imageFile.name);
        } else if (removeExistingImage) {
            formData.append('image', '');
        } else {
            if (updateData.image) {
                formData.append('image', updateData.image);
            }
        }

        const response = await api.put(`${CANDIDATES_BASE_URL}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

export async function deleteCandidate(id) {
    try {
        const response = await api.delete(`${CANDIDATES_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la suppression du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

export async function addVoteToCandidate(id) {
    try {
        const response = await api.patch(`${CANDIDATES_BASE_URL}/${id}/vote`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de l'ajout du vote pour le candidat avec l'ID ${id}:`, error);
        throw error;
    }
}