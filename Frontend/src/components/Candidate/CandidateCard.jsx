// @ts-nocheck
import React from 'react';
import Button from '../common/Button';

/**
 * Composant pour afficher les informations détaillées d'un candidat.
 * @param {object} props - Les propriétés passées au composant.
 * @param {object} props.candidate - L'objet candidat contenant au moins
 * { _id, fullName, age, image, description, slogan, party, votes }.
 * @param {function} [props.onVote] - Fonction optionnelle appelée lorsqu'on clique sur le bouton "Voter".
 * @param {boolean} [props.disableVoteButton=false] - Indique si le bouton "Voter" doit être désactivé.
 * @returns {JSX.Element} Le composant carte du candidat.
 */
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

    return (
        <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 transition-transform duration-150 ease-in-out hover:scale-102 hover:shadow-2xl flex flex-col items-center text-center border border-gray-100">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-indigo-500 shadow-md transform -translate-y-2">
                <img
                    src={image || "https://placehold.co/144x144/E0E0E0/616161?text=No+Image"}
                    alt={`Profile de ${fullName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/144x144/E0E0E0/616161?text=Image+Error";
                    }}
                />
            </div>

            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 mt-2">
                {fullName || 'Nom Inconnu'}
            </h3>

            {party && (
                <p className="text-lg font-semibold text-indigo-700 mb-2 bg-indigo-50 px-3 py-1 rounded-full">
                    Parti : {party}
                </p>
            )}

            {age && (
                <p className="text-base text-gray-700 mb-3">
                    Âge : <span className="font-semibold">{age} ans</span>
                </p>
            )}

            {slogan && (
                <p className="text-lg italic text-gray-800 mb-4 px-2 max-w-sm">
                    "{slogan}"
                </p>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed px-2 break-words">
                {description || 'Aucune description disponible.'}
            </p>

            <div className="mt-auto pt-4 border-t-2 border-gray-100 w-full text-center">
                <p className="text-2xl font-bold text-green-700">
                    <span className="text-gray-500 text-base font-normal">Votes: </span>{votes}
                </p>
            </div>

            {}
            {onVote && (
                <div className="mt-5 w-full">
                    <Button
                        label={`Voter pour ${fullName.split(' ')[0]}`}
                        onClick={() => onVote(_id)}
                        color="bg-blue-600"
                        hoverColor="hover:bg-blue-700"
                        textColor="text-white"
                        className="w-full py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                        disabled={disableVoteButton}
                    />
                </div>
            )}
        </div>
    );
};

export default CandidateCard;
