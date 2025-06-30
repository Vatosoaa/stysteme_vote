// @ts-nocheck
// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/auth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
    // States for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    // States for error and loading management
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // React Router hooks and your authentication context
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.'); // Message en français, plus cohérent !
            setIsLoading(false);
            return;
        }

        try {
            await authService.signup({
                firstName,
                lastName,
                email,
                password,
                dateOfBirth,
                gender,
                country,
                city,
            });

            // Après une inscription réussie, l'utilisateur est automatiquement connecté
            const loginSuccess = await login({ email, password });

            if (loginSuccess) {
                console.log('Inscription et connexion réussies !');
                navigate('/vote'); // Redirige vers la page de vote après l'inscription/connexion
            } else {
                setError('Inscription réussie, mais la connexion automatique a échoué. Veuillez vous connecter manuellement.');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Une erreur inattendue est survenue lors de l\'inscription.';
            setError(errorMessage);
            console.error("Erreur API lors de l'inscription :", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
            <div className="max-w-4xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-pink-100">
                <h2 className="text-4xl font-extrabold text-center mb-8 text-pink-700 tracking-wide">
                    Créer Votre Compte ✨
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-base font-medium text-center border border-red-200">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {/* Colonne 1 */}
                        <div>
                            <Input
                                id="firstName"
                                label="Prénom" // Traduction en français pour cohérence
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Votre prénom"
                                required
                                disabled={isLoading}
                            />
                            <Input
                                id="lastName"
                                label="Nom de Famille"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Votre nom de famille"
                                required
                                disabled={isLoading}
                            />
                            <Input
                                id="email"
                                label="Adresse Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre.email@exemple.com"
                                required
                                disabled={isLoading}
                            />
                            <Input
                                id="password"
                                label="Mot de Passe"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimum 6 caractères"
                                required
                                disabled={isLoading}
                            />
                            <Input
                                id="confirmPassword"
                                label="Confirmer le Mot de Passe"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmez votre mot de passe"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Colonne 2 */}
                        <div>
                            <Input
                                id="dateOfBirth"
                                label="Date de Naissance"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                disabled={isLoading}
                            />

                            <div className="mb-5"> {/* Utilisation de mb-5 pour cohérence avec Input */}
                                <label htmlFor="gender" className="block text-gray-700 text-base font-medium mb-2">
                                    Genre
                                </label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={`
                                        w-full px-5 py-3 border border-pink-200 rounded-xl shadow-sm
                                        focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400
                                        transition duration-200 ease-in-out text-gray-800 text-lg
                                        ${isLoading ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}
                                    `}
                                    required
                                    disabled={isLoading}
                                >
                                    <option value="">Sélectionnez votre genre</option>
                                    <option value="male">Homme</option>
                                    <option value="female">Femme</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <Input
                                id="country"
                                label="Pays"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Votre pays"
                                required
                                disabled={isLoading}
                            />
                            <Input
                                id="city"
                                label="Ville"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Votre ville"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <div className="mt-8">
                        <Button
                            type="submit"
                            label={isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                            disabled={isLoading}
                            className="w-full"
                            // Les couleurs par défaut du Button sont déjà "Miss" (rose/violet)
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;