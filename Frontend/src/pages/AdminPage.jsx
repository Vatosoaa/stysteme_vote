// @ts-ignore
import React, { useState, useEffect } from 'react';
import { getAllVoters } from '../services/admin';
import Table from '../components/common/Table';

const AdminPage = () => {
    const [voters, setVoters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const data = await getAllVoters();
                setVoters(data);
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Échec du chargement des votants.';
                setError(errorMessage);
                console.error("Erreur lors de la récupération des votants (AdminPage):", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVoters();
    }, []);

    const voterTableHeaders = [
        {
            key: 'fullName',
            label: 'Nom Complet',
        },
        { key: 'email', label: 'Email' },
        {
            key: 'isAdmin',
            label: 'Admin',
            render: (isAdminValue) => (
                isAdminValue ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Oui</span>
                ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Non</span>
                )
            ),
            cellClassName: 'text-center'
        },
        {
            key: 'createdAt',
            label: 'Inscrit le',
            render: (createdAtValue) => new Date(createdAtValue).toLocaleDateString(),
            cellClassName: 'whitespace-nowrap'
        },
    ];

    
    const votersWithFullName = voters.map(voter => ({
        // @ts-ignore
        ...voter,
        // @ts-ignore
        fullName: `${voter.firstName} ${voter.lastName}`
    }));


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Tableau de Bord Administrateur</h1>

            {isLoading && (
                <div className="text-center text-lg text-gray-600">Chargement des utilisateurs...</div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
                    <p className="font-semibold mb-2">Erreur :</p>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && votersWithFullName.length === 0 && (
                <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6 text-center">
                    <p>Aucun votant enregistré pour le moment.</p>
                </div>
            )}

            {!isLoading && !error && votersWithFullName.length > 0 && (
                <Table
                    headers={voterTableHeaders}
                    data={votersWithFullName}
                    keyField="_id"
                />
            )}
        </div>
    );
};

export default AdminPage;
