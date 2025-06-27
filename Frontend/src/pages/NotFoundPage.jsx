import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="text-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page non trouvée</h2>
            <p className="text-gray-600 mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 bg-indigo-700">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;