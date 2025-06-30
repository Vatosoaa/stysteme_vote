// @ts-nocheck
import React from 'react';
import Button from '../common/Button';

const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL || 'http://localhost:5000';

const CandidateCard = ({ candidate, onVote, disableVoteButton = false }) => {
    if (!candidate) {
        return null;
    }

    const {
        _id,
        fullName,
        age,
        image,
        description,
        slogan,
        party,
        votes
    } = candidate;
    const fullImageUrl = image ? `${IMAGES_BASE_URL}${image}` : null;

    return (
        <div
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-6 pb-4
                       transition-all duration-300 ease-in-out transform
                       hover:scale-105 hover:shadow-xl hover:border-pink-400
                       flex flex-col items-center text-center
                       border border-pink-100 group">

            <div className="w-48 h-48 rounded-full overflow-hidden mb-5
                            border-6 border-pink-500 shadow-xl transform -translate-y-4
                            group-hover:border-purple-500 group-hover:scale-108 transition-all duration-300 ease-in-out
                            flex items-center justify-center bg-gray-100">
                <img
                    src={fullImageUrl}
                    alt={`Profil de ${fullName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-candidate.png'; // Utilisation de l'image par défaut côté serveur
                    }}
                />
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-pink-700 mb-2 leading-tight
                           truncate max-w-[calc(100%-20px)]">
                {fullName || 'Nom Inconnu'}
            </h3>

            {party && (
                <p className="text-md font-semibold text-purple-700 mb-3 bg-purple-100 px-4 py-1 rounded-full shadow-sm">
                    {party}
                </p>
            )}

            {age && (
                <p className="text-base text-gray-700 mb-3">
                    Âge : <span className="font-bold text-gray-800">{age} ans</span>
                </p>
            )}

            {slogan && (
                <p className="text-lg italic text-gray-800 mb-4 px-2 max-w-sm font-serif">
                    "{slogan}"
                </p>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed px-2 break-words max-w-md">
                {description || 'Aucune description disponible pour ce candidat.'}
            </p>

            <div className="mt-auto pt-4 border-t-2 border-purple-200 w-full text-center">
                <p className="text-4xl font-bold text-pink-600">
                    <span className="text-gray-500 text-xl font-normal">Votes : </span>{votes}
                </p>
            </div>

            {onVote && (
                <div className="mt-6 w-full px-4">
                    <Button
                        label={`Voter pour ${fullName.split(' ')[0]}`}
                        onClick={() => onVote(_id)}
                        color="bg-gradient-to-r from-pink-600 to-purple-700"
                        hoverColor="hover:from-pink-700 hover:to-purple-800"
                        textColor="text-white"
                        className="w-full py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl
                                   transform hover:scale-105 transition-all duration-300 ease-out
                                   focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-75"
                        disabled={disableVoteButton}
                    />
                </div>
            )}
        </div>
    );
};

export default CandidateCard;