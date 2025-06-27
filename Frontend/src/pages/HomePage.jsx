import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import CandidateList from "../components/Candidate/CandidateList.jsx";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)] px-4 py-8">
            {}
            <div className="text-center max-w-2xl"> {}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight"> {}
                    Bienvenue sur VoteApp
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"> {}
                    Votre plateforme de vote en ligne, simple et sécurisée.
                </p>
                {}
                <Button
                    label="Commencer à Voter"
                    onClick={() => navigate('/vote')}
                    color="bg-indigo-700"
                    textColor="text-white"
                    hoverColor="hover:bg-indigo-600"
                    className="inline-block px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-105"
                />
                <CandidateList/>
            </div>
        </div>
    );
};

export default HomePage;
