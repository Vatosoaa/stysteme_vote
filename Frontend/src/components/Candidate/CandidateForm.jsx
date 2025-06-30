// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const CandidateForm = ({ candidateData, onSubmit, isLoading = false, error = '' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        description: '',
        slogan: '',
        party: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);

    useEffect(() => {
        if (candidateData) {
            setFormData({
                fullName: candidateData.fullName || '',
                age: candidateData.age || '',
                description: candidateData.description || '',
                slogan: candidateData.slogan || '',
                party: candidateData.party || '',
            });
            setPreviewImage(candidateData.image || null);
            setImageFile(null);
            setRemoveExistingImage(false);
        } else {
            setFormData({
                fullName: '',
                age: '',
                description: '',
                slogan: '',
                party: '',
            });
            setImageFile(null);
            setPreviewImage(null);
            setRemoveExistingImage(false);
        }
    }, [candidateData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
            setRemoveExistingImage(false);
        } else {
            setImageFile(null);
            setPreviewImage(candidateData?.image || null);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewImage(null);
        setRemoveExistingImage(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, imageFile, removeExistingImage);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">
                    {error}
                </p>
            )}

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
                id="description"
                label="Description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Courte description du candidat"
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

            <div>
                <label htmlFor="imageUpload" className="block text-gray-700 text-sm font-medium mb-1">
                    Photo du Candidat
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-pink-50 file:text-pink-700
                               hover:file:bg-pink-100 transition-colors duration-200"
                    disabled={isLoading}
                />
                {previewImage && (
                    <div className="mt-4 flex items-center space-x-3">
                        <img src={previewImage} alt="Aperçu" className="w-24 h-24 object-cover rounded-md shadow-md border border-gray-200" />
                        <Button
                            type="button"
                            label="Supprimer l'image"
                            onClick={handleRemoveImage}
                            color="bg-red-500"
                            hoverColor="hover:bg-red-600"
                            textColor="text-white"
                            className="px-3 py-1 text-sm rounded-md"
                            disabled={isLoading}
                        />
                    </div>
                )}
                {!imageFile && candidateData?.image && removeExistingImage && (
                    <p className="mt-2 text-sm text-red-500">L'image actuelle sera supprimée.</p>
                )}
                {!imageFile && candidateData?.image && !removeExistingImage && (
                    <p className="mt-2 text-sm text-gray-500">Image actuelle : <a href={candidateData.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Voir</a></p>
                )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <Button
                    type="submit"
                    label={isLoading ? 'Enregistrement...' : (candidateData ? 'Mettre à Jour' : 'Ajouter')}
                    disabled={isLoading}
                    className="w-full"
                />
            </div>
        </form>
    );
};

export default CandidateForm;