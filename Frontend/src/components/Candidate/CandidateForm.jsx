// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const CandidateForm = ({ candidateData, onSubmit, isLoading = false, error = '' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        image: '',
        description: '',
        slogan: '',
        party: '',
    });

    
    useEffect(() => {
        if (candidateData) {
            setFormData({
                fullName: candidateData.fullName || '',
                age: candidateData.age || '',
                image: candidateData.image || '',
                description: candidateData.description || '',
                slogan: candidateData.slogan || '',
                party: candidateData.party || '',
            });
        }
    }, [candidateData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}

            <Input
                id="fullName"
                label="Nom Complet"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nom complet du candidat"
                required
                disabled={isLoading}
            />
            <Input
                id="age"
                label="Âge"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Âge du candidat"
                required
                disabled={isLoading}
            />
            <Input
                id="image"
                label="URL de l'Image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                placeholder="Lien vers l'image du candidat"
                disabled={isLoading}
            />
            <Input
                id="description"
                label="Description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Courte description du candidat"
                required
                disabled={isLoading}
            />
            <Input
                id="slogan"
                label="Slogan"
                type="text"
                value={formData.slogan}
                onChange={handleChange}
                placeholder="Slogan de campagne"
                disabled={isLoading}
            />
            <Input
                id="party"
                label="Parti Politique"
                type="text"
                value={formData.party}
                onChange={handleChange}
                placeholder="Nom du parti"
                disabled={isLoading}
            />

            <div className="mt-6 flex justify-end space-x-4">
                <Button
                    type="submit"
                    label={isLoading ? 'Enregistrement...' : (candidateData ? 'Mettre à jour' : 'Ajouter')}
                    disabled={isLoading}
                    className="min-w-[120px]"
                />
            </div>
        </form>
    );
};

export default CandidateForm;
