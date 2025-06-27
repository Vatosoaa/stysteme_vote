// @ts-ignore
import React, { useState, useEffect } from 'react';
import CandidateCard from "./CandidateCard.jsx";
import {getAllCandidates} from "../../services/vote.js";

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
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

        fetchCandidates();
    }, []);


    return (
        <div className="container shadow rounded-2xl mx-auto px-6 py-10"> {/* Assure un container avec padding pour les cartes */}

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Découvrez les Candidats</h2>

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
                    Aucun candidat disponible pour le moment. Revenez plus tard !
                </div>
            )}

            {!isLoading && !error && candidates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {}
                    {candidates.map((candidate) => (
                        // @ts-ignore
                        <CandidateCard key={candidate._id} candidate={candidate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CandidateList;
