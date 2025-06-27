// @ts-ignore
import React, { useState, useEffect } from 'react';
import {
    getAllCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from '../services/vote';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import CandidateForm from '../components/Candidate/CandidateForm';

const CandidateManagementPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fonction pour recharger les candidats
    const fetchCandidates = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllCandidates();
            // @ts-ignore
            setCandidates(data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Échec du chargement des candidats.';
            setError(errorMessage);
            console.error("Erreur lors de la récupération des candidats:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    // Gestion de l'ouverture du formulaire d'ajout/édition
    const handleAddCandidate = () => {
        setCurrentCandidate(null);
        setFormError('');
        setIsModalOpen(true);
    };

    const handleEditCandidate = (candidate) => {
        setCurrentCandidate(candidate);
        setFormError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCandidate(null);
        setFormError('');
    };

    const handleSubmitCandidate = async (formData) => {
        setIsSubmitting(true);
        setFormError('');
        try {
            if (currentCandidate) {
                // @ts-ignore
                await updateCandidate(currentCandidate._id, formData);
            } else {
                await createCandidate(formData);
            }
            handleCloseModal();
            fetchCandidates();
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Erreur lors de l\'enregistrement.';
            setFormError(msg);
            console.error("Erreur de soumission du candidat:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Gestion de la suppression d'un candidat
    const handleDeleteCandidate = async (candidateId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ? Cette action est irréversible.")) {
            setIsLoading(true); // Active le chargement pour toute la page
            try {
                await deleteCandidate(candidateId);
                console.log('Candidat supprimé avec succès !');
                fetchCandidates(); // Recharge la liste
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Échec de la suppression du candidat.';
                setError(errorMessage);
                console.error("Erreur lors de la suppression du candidat:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };


    // Définition des en-têtes pour le composant Table
    const candidateTableHeaders = [
        { key: 'fullName', label: 'Nom Complet' },
        { key: 'party', label: 'Parti' },
        { key: 'age', label: 'Âge' },
        { key: 'slogan', label: 'Slogan', className: 'lg:w-1/4' },
        {
            key: 'image',
            label: 'Image',
            render: (imageUrl) => (
                <img src={imageUrl || "https://placehold.co/40x40/E0E0E0/616161?text=No"} alt="Candidat" className="w-10 h-10 rounded-full object-cover" />
            ),
            cellClassName: 'text-center'
        },
        {
            key: 'actions',
            label: 'Actions',
            // @ts-ignore
            render: (value, candidate) => (
                <div className="flex space-x-2 justify-center">
                    <Button
                        label="Modifier"
                        onClick={() => handleEditCandidate(candidate)}
                        color="bg-blue-500"
                        hoverColor="hover:bg-blue-600"
                        textColor="text-white"
                        className="px-3 py-1 text-sm rounded-md"
                    />
                    <Button
                        label="Supprimer"
                        onClick={() => handleDeleteCandidate(candidate._id)}
                        color="bg-red-500"
                        hoverColor="hover:bg-red-600"
                        textColor="text-white"
                        className="px-3 py-1 text-sm rounded-md"
                    />
                </div>
            ),
            cellClassName: 'text-center'
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Gestion des Candidats</h1>

            <div className="mb-6 flex justify-end">
                <Button
                    label="Ajouter un Candidat"
                    onClick={handleAddCandidate}
                    color="bg-green-600"
                    hoverColor="hover:bg-green-700"
                    textColor="text-white"
                    className="px-6 py-3 rounded-xl shadow-md"
                />
            </div>

            {isLoading && (
                <div className="text-center text-lg text-gray-600">Chargement des candidats...</div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
                    <p className="font-semibold mb-2">Erreur :</p>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && candidates.length === 0 && (
                <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6 text-center">
                    <p>Aucun candidat enregistré pour le moment.</p>
                </div>
            )}

            {!isLoading && !error && candidates.length > 0 && (
                <Table
                    headers={candidateTableHeaders}
                    data={candidates}
                    keyField="_id"
                />
            )}

            {/* Modale pour l'ajout/édition de candidat */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={currentCandidate ? 'Modifier le Candidat' : 'Ajouter un Nouveau Candidat'}
            >
                <CandidateForm
                    candidateData={currentCandidate}
                    onSubmit={handleSubmitCandidate}
                    isLoading={isSubmitting}
                    error={formError}
                />
            </Modal>
        </div>
    );
};

export default CandidateManagementPage;
