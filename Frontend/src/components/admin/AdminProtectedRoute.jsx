// @ts-nocheck
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminProtectedRoute = ({ children }) => {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold text-gray-700">Vérification des droits...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && !user.isAdmin) {
        console.warn("Tentative d'accès non autorisé à la page admin par un non-administrateur.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
