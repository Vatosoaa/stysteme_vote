// src/services/Candidate.js

/**
 * @fileoverview Fonctions de service pour interagir avec l'API des candidats et des votes.
 * Utilise l'instance Axios `api` configurée dans `api.js` pour envoyer les requêtes.
 * Grâce à l'intercepteur configuré dans `api.js`, le token d'authentification est automatiquement
 * ajouté aux en-têtes des requêtes.
 */

import api from './api'; // Importe l'instance Axios que tu as configurée

const CANDIDATES_BASE_URL = '/candidates';

/**
 * Crée un nouveau candidat.
 *
 * @param {object} candidateData - Les données du nouveau candidat (ex: { name: '...', description: '...' }).
 * @returns {Promise<object>} - Le candidat créé (via response.data d'Axios).
 */
export async function createCandidate(candidateData) {
    try {
        const response = await api.post(CANDIDATES_BASE_URL, candidateData);
        return response.data; // Axios retourne la réponse dans la propriété .data
    } catch (error) {
        console.error('Erreur lors de la création du candidat:', error);
        throw error; // Relancer l'erreur pour une gestion supérieure (par exemple, dans les composants)
    }
}

/**
 * Récupère tous les candidats.
 *
 * @returns {Promise<Array<object>>} - Une liste de tous les candidats (via response.data d'Axios).
 */
export async function getAllCandidates() {
    try {
        const response = await api.get(CANDIDATES_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des candidats:', error);
        throw error;
    }
}

/**
 * Récupère un candidat par son ID.
 *
 * @param {string} id - L'ID du candidat.
 * @returns {Promise<object>} - Le candidat correspondant à l'ID (via response.data d'Axios).
 */
export async function getCandidateById(id) {
    try {
        const response = await api.get(`${CANDIDATES_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

/**
 * Met à jour un candidat existant.
 *
 * @param {string} id - L'ID du candidat à mettre à jour.
 * @param {object} updateData - Les données de mise à jour du candidat.
 * @returns {Promise<object>} - Le candidat mis à jour (via response.data d'Axios).
 */
export async function updateCandidate(id, updateData) {
    try {
        const response = await api.put(`${CANDIDATES_BASE_URL}/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

/**
 * Supprime un candidat.
 *
 * @param {string} id - L'ID du candidat à supprimer.
 * @returns {Promise<object>} - Un objet vide ou un message de succès après suppression (via response.data d'Axios).
 */
export async function deleteCandidate(id) {
    try {
        const response = await api.delete(`${CANDIDATES_BASE_URL}/${id}`);
        return response.data; // Peut être vide si le backend retourne 204 No Content
    } catch (error) {
        console.error(`Erreur lors de la suppression du candidat avec l'ID ${id}:`, error);
        throw error;
    }
}

/**
 * Ajoute un Candidate à un candidat.
 *
 * @param {string} id - L'ID du candidat à qui ajouter un Candidate.
 * @returns {Promise<object>} - Le candidat avec le nombre de votes mis à jour (via response.data d'Axios).
 */
export async function addVoteToCandidate(id) {
    try {
        const response = await api.patch(`${CANDIDATES_BASE_URL}/${id}/vote`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de l'ajout du vote pour le candidat avec l'ID ${id}:`, error);
        throw error;
    }
}
