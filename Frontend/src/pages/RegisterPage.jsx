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

    /**
     * Handles the form submission for registration.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simple client-side validation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
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

            const loginSuccess = await login({ email, password });

            if (loginSuccess) {
                console.log('Registration and login successful!');
                navigate('/vote');
            } else {
                setError('Registration successful, but automatic login failed.');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred during registration.';
            setError(errorMessage);
            console.error("API registration error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
            {}
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}

            <form onSubmit={handleSubmit}>
                {}
                <Input
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="lastName"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your last name"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype your password"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    disabled={isLoading}
                />

                {}
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                        Gender
                    </label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                        required
                        disabled={isLoading}
                    >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {}
                <Input
                    id="country"
                    label="Country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Your country"
                    required
                    disabled={isLoading}
                />

                {}
                <Input
                    id="city"
                    label="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city"
                    required
                    disabled={isLoading}
                />

                {}
                <div className="mt-6">
                    <Button
                        type="submit"
                        label={isLoading ? 'Registering...' : 'Register'}
                        disabled={isLoading}
                        className="w-full"
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
