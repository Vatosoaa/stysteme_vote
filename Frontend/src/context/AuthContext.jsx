// @ts-ignore
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const currentUser = authService.getCurrentUser();
            // @ts-ignore
            setUser(currentUser);
        } catch (error) {
            console.error("Erreur lors du rafraîchissement de l'utilisateur:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                // @ts-ignore
                setUser(currentUser);
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            await authService.login(credentials);
            await refreshUser();
            return true;
        } catch (error) {
            console.error("Échec de la connexion dans AuthContext:", error);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const authContextValue = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider 
// @ts-ignore
        value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
