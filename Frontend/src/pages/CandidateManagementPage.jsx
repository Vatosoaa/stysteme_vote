// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    getAllCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from '../services/Candidate';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import CandidateForm from '../components/Candidate/CandidateForm';


const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL || 'http://localhost:5000';

const CandidateManagementPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCandidates = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllCandidates();
            setCandidates(data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Échec du chargement des candidats.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

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

    const handleSubmitCandidate = async (formData, imageFile, removeExistingImage) => {
        setIsSubmitting(true);
        setFormError('');
        try {
            if (currentCandidate) {
                await updateCandidate(currentCandidate._id, formData, imageFile, removeExistingImage);
            } else {
                await createCandidate(formData, imageFile);
            }
            handleCloseModal();
            fetchCandidates();
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Erreur lors de l\'enregistrement.';
            setFormError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCandidate = async (candidateId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ? Cette action est irréversible.")) {
            setIsLoading(true);
            try {
                await deleteCandidate(candidateId);
                fetchCandidates();
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Échec de la suppression du candidat.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const candidateTableHeaders = [
        { key: 'fullName', label: 'Nom Complet' },
        { key: 'party', label: 'Parti' },
        { key: 'age', label: 'Âge' },
        { key: 'slogan', label: 'Slogan', className: 'lg:w-1/4' },
        {
            key: 'image',
            label: 'Image',
            render: (imageUrl) => {
                const fullImageUrl = imageUrl ? `${IMAGES_BASE_URL}${imageUrl}` : null;
                return (
                    <img src={fullImageUrl} />
                );
            },
            cellClassName: 'text-center'
        },
        {
            key: 'actions',
            label: 'Actions',
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
                    color="bg-pink-600"
                    hoverColor="hover:bg-pink-700"
                    textColor="text-white"
                    className="px-6 py-3 rounded-full shadow-lg"
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