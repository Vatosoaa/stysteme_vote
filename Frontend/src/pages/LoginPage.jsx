// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth.js";
import authService from "../services/auth.js";
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.login({ email, password });

            const loginSuccess = await login({ email, password });

            if (loginSuccess) {
                console.log('Connexion réussie avec l\'API !');
                if (user && user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/vote');
                }
            } else {
                setError('Connexion échouée. Vérifiez vos identifiants.');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Une erreur inattendue est survenue.';
            setError(errorMessage);
            console.error("Erreur de connexion API:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Connexion</h2>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    disabled={isLoading}
                />
                <Input
                    id="password"
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    disabled={isLoading}
                />
                <div className="mt-6">
                    <Button
                        type="submit"
                        label={isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        disabled={isLoading}
                        className="w-full"
                    />
                </div>
            </form>
            <p className="mt-6 text-center text-gray-600">
                Pas encore de compte ?{' '}
                <NavLink to="/register" className="text-indigo-700 hover:text-indigo-900 font-semibold transition duration-300">
                    S'inscrire ici
                </NavLink>
            </p>
        </div>
    );
};

export default LoginPage;
