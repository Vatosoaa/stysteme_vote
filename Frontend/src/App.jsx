// App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VotePage from './pages/VotePage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import {useAuth} from "./hooks/useAuth.js";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CandidateManagementPage from "./pages/CandidateManagementPage.jsx";


function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-700">Chargement de l'authentification...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

function App() {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        {/* Routes publiques */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Routes protégées */}
                        <Route
                            path="/vote"
                            element={
                                <ProtectedRoute>
                                    <VotePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <AdminProtectedRoute>
                                    <AdminPage />
                                </AdminProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/candidates"
                            element={
                                <AdminProtectedRoute>
                                    <CandidateManagementPage /> {}
                                </AdminProtectedRoute>
                            }
                        />

                        {/* Page non trouvée */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
