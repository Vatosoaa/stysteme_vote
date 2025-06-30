// @ts-ignore
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button'; // Assure-toi que ton composant Button est stylé avec les couleurs choisies

const Navbar = () => {
    const { user, logout, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // @ts-ignore
        logout();
        navigate('/login');
    };

    // @ts-ignore
    const displayName = user ? (user.fullName || user.name || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email)) : 'Utilisateur';

    if (isLoading) {
        return null;
    }

    return (
        <header className="bg-white shadow-lg border-b border-pink-100">
            <nav className="container mx-auto px-4 py-4 md:py-3 flex justify-between items-center">
                {/* Logo / Nom de l'application */}
                <NavLink to="/" className="text-3xl font-extrabold text-pink-700 tracking-wide hover:text-purple-700 transition-colors duration-300">
                    Vote Miss <span className="text-xl">👑</span>
                </NavLink>

                {/* Liens de navigation principaux */}
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" className={({ isActive }) =>
                        `text-gray-700 hover:text-pink-600 font-medium text-lg transition-all duration-300 ${isActive ? 'text-pink-700 font-semibold border-b-2 border-pink-500 pb-1' : ''}`
                    }>
                        Accueil
                    </NavLink>
                    {user && (
                        <NavLink to="/vote" className={({ isActive }) =>
                            `text-gray-700 hover:text-pink-600 font-medium text-lg transition-all duration-300 ${isActive ? 'text-pink-700 font-semibold border-b-2 border-pink-500 pb-1' : ''}`
                        }>
                            Voter
                        </NavLink>
                    )}

                    {/* Menu Déroulant pour l'Admin */}
                    {user && user.
// @ts-ignore
                    isAdmin && (
                        <div className="relative group">
                            <NavLink to="/admin" className={({ isActive }) =>
                                `text-gray-700 hover:text-pink-600 font-medium text-lg transition-all duration-300 ${isActive ? 'text-pink-700 font-semibold' : ''} cursor-pointer pr-4 flex items-center`
                            }>
                                Admin
                                <svg className="ml-1 w-4 h-4 text-gray-500 group-hover:text-pink-600 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </NavLink>
                            {/* Le menu déroulant lui-même */}
                            <div className="absolute left-0 top-full w-56 bg-white rounded-lg shadow-xl py-2 z-20 opacity-0 scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                                <NavLink
                                    to="/admin/candidates"
                                    className="block px-4 py-2 text-md text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200"
                                >
                                    Gérer les Candidats
                                </NavLink>
                                <NavLink
                                    to="/admin"
                                    className="block px-4 py-2 text-md text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200"
                                >
                                    Tableau de Bord Admin
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section Droite (Connexion / Déconnexion / Nom d'utilisateur) */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-800 font-semibold text-lg">
                                Bonjour, <span className="text-pink-600">{displayName}</span>
                            </span>
                            <Button
                                label="Déconnexion"
                                onClick={handleLogout}
                                color="bg-purple-600" // Couleur plus affirmée pour l'action principale
                                hoverColor="hover:bg-purple-700"
                                textColor="text-white"
                                className="px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            />
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-300 text-lg">
                                Connexion
                            </NavLink>
                            <Button
                                label="Inscription"
                                onClick={() => navigate('/register')}
                                color="bg-pink-600" // Couleur principale pour l'inscription
                                hoverColor="hover:bg-pink-700"
                                textColor="text-white"
                                className="px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            />
                        </>
                    )}
                </div>

                {/* Hamburger Menu pour mobile (à implémenter si tu veux une version responsive complète) */}
                <div className="md:hidden">
                    {/* Ici, tu mettrais ton icône de hamburger et la logique pour ouvrir un menu mobile */}
                    <button className="text-gray-600 hover:text-pink-600 focus:outline-none">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;