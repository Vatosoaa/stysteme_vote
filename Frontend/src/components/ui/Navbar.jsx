// @ts-ignore
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

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
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold text-indigo-700"> {}
                    VoteApp
                </NavLink>
                <div className="flex items-center space-x-4">
                    <NavLink to="/" className={({ isActive }) => `text-gray-600 hover:text-indigo-700 ${isActive ? 'font-semibold text-indigo-700' : ''}`}>
                        Accueil
                    </NavLink>
                    {user && (
                        <NavLink to="/vote" className={({ isActive }) => `text-gray-600 hover:text-indigo-700 ${isActive ? 'font-semibold text-indigo-700' : ''}`}>
                            Voter
                        </NavLink>
                    )}

                    {/* Menu Déroulant pour l'Admin */}
                    {user && user.
// @ts-ignore
                    isAdmin && (
                        <div className="relative group"> {}
                            <NavLink to="/admin" className={({ isActive }) => `text-gray-600 hover:text-indigo-700 ${isActive ? 'font-semibold text-indigo-700' : ''} cursor-pointer pr-4`}> {}
                                Admin {}
                            </NavLink>
                            {}
                            <div className="absolute left-0 top-full w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block transition-all duration-300 ease-in-out origin-top-left scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"> {}
                                <NavLink
                                    to="/admin/candidates"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700"
                                >
                                    Gérer les Candidats
                                </NavLink>
                                <NavLink
                                    to="/admin"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700"
                                >
                                    Tableau de Bord Admin
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-800">Bonjour, {displayName}</span>
                            <Button
                                label="Déconnexion"
                                onClick={handleLogout}
                                color="bg-pink-500"
                                hoverColor="hover:bg-pink-600"
                                textColor="text-white"
                                className="px-4 py-2 rounded-md"
                            />
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="text-gray-600 hover:text-indigo-700 font-semibold transition duration-300">
                                Connexion
                            </NavLink>
                            <Button
                                label="Inscription"
                                onClick={() => navigate('/register')}
                                color="bg-indigo-700"
                                hoverColor="hover:bg-indigo-600"
                                textColor="text-white"
                                className="px-4 py-2 rounded-md"
                            />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
