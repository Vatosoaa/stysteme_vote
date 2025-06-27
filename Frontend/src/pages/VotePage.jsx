// @ts-ignore
import React, { useState, useEffect } from 'react';
import { getAllCandidates, addVoteToCandidate } from '../services/vote';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import CandidateCard from "../components/Candidate/CandidateCard.jsx";

const VotePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voteMessage, setVoteMessage] = useState('');
    const [isVoting, setIsVoting] = useState(false);
    const { user, isAuthenticated } = useAuth();

    // @ts-ignore
    const [hasUserVotedLocally, setHasUserVotedLocally] = useState(user ? user.hasVoted : false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [candidateToVoteId, setCandidateToVoteId] = useState(null);

    useEffect(() => {
        if (user) {
            // @ts-ignore
            setHasUserVotedLocally(user.hasVoted);
        } else {
            setHasUserVotedLocally(false);
        }
    }, [user]);

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

    const handleInitiateVote = (candidateId) => {
        if (!isAuthenticated) {
            // @ts-ignore
            setVoteMessage({ type: 'error', text: 'Vous devez être connecté pour voter.' });
            return;
        }
        if (hasUserVotedLocally) {
            // @ts-ignore
            setVoteMessage({ type: 'error', text: 'Vous avez déjà voté.' });
            return;
        }
        if (isVoting) {
            return;
        }

        setCandidateToVoteId(candidateId);
        setShowConfirmModal(true);
    };

    const confirmVote = async () => {
        setShowConfirmModal(false);
        if (!candidateToVoteId) return;

        setIsVoting(true);
        setVoteMessage('');

        try {
            await addVoteToCandidate(candidateToVoteId);

            setHasUserVotedLocally(true);
            // @ts-ignore
            setVoteMessage({ type: 'success', text: 'Votre vote a été enregistré avec succès !' });

            fetchCandidates();

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Une erreur est survenue lors du vote.';
            // @ts-ignore
            setVoteMessage({ type: 'error', text: errorMessage });
            console.error("Erreur lors du vote:", err);
        } finally {
            setIsVoting(false);
            setCandidateToVoteId(null);
        }
    };

    const cancelVote = () => {
        setShowConfirmModal(false);
        setCandidateToVoteId(null);
        setVoteMessage('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Page de Vote</h1>

            {voteMessage.
// @ts-ignore
            text && (
                <div className={`p-4 rounded-lg mb-6 text-center ${voteMessage.
// @ts-ignore
                type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <p className="font-semibold">{voteMessage.
// @ts-ignore
                    text}</p>
                </div>
            )}

            {isAuthenticated && hasUserVotedLocally && (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6 text-center">
                    <p className="font-semibold">Vous avez déjà voté. Vous ne pouvez voter qu'une seule fois.</p>
                </div>
            )}

            {isLoading && (
                <div className="text-center text-lg text-gray-600">Chargement des candidats...</div>
            )}

            {error && (
                <div className="text-center text-red-700 bg-red-100 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Erreur :</p>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && candidates.length === 0 && (
                <div className="text-center text-lg text-gray-600 p-6 bg-gray-50 rounded-lg shadow-sm">
                    Aucun candidat disponible pour le moment.
                </div>
            )}

            {!isLoading && !error && candidates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map((candidate) => (
                        <CandidateCard
                            // @ts-ignore
                            key={candidate._id}
                            candidate={candidate}
                            onVote={isAuthenticated && !hasUserVotedLocally && !isVoting ? handleInitiateVote : undefined}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={showConfirmModal}
                onClose={cancelVote}
                title="Confirmer votre vote"
            >
                <p className="mb-4 text-gray-700 text-2xl">
                    Êtes-vous sûr de vouloir voter pour ce candidat ? Vous ne pourrez voter qu'une seule fois.
                </p>
                <div className="flex justify-end space-x-4">
                    <Button
                        label="Annuler"
                        onClick={cancelVote}
                        color="bg-gray-500"
                        hoverColor="hover:bg-gray-600"
                        textColor="text-white"
                    />
                    <Button
                        label="Confirmer le vote"
                        onClick={confirmVote}
                        color="bg-blue-600"
                        hoverColor="hover:bg-blue-700"
                        textColor="text-white"
                        disabled={isVoting}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default VotePage;
