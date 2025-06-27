import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                <p>&copy; {year} VoteApp. Tous droits réservés.</p>
                <p>Créé avec ❤️ pour la démocratie numérique.</p>
            </div>
        </footer>
    );
};

export default Footer;
