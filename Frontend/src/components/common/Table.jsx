import React from 'react';

/**
 *
 * @param {object} props - Les propriétés passées au composant.
 * @param {Array<object>} props.headers - Un tableau d'objets définissant les colonnes du tableau.
 * Chaque objet doit avoir au moins `key` (le nom de la propriété dans les données) et `label` (le texte de l'en-tête).
 * Peut aussi inclure `render` (une fonction pour rendre le contenu de la cellule) ou `className` pour les styles de colonne.
 * Ex: [{ key: 'name', label: 'Nom' }, { key: 'email', label: 'Email' }, { key: 'isAdmin', label: 'Admin', render: (value) => value ? 'Oui' : 'Non' }]
 * @param {Array<object>} props.data - Le tableau des objets à afficher dans les lignes du tableau.
 * @param {string} [props.keyField='_id'] - La clé unique de chaque élément de données pour la prop `key` de React.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur du tableau.
 */
const Table = ({ headers, data, keyField = '_id', className = '' }) => {
    if (!headers || headers.length === 0) {
        console.warn("Le composant Table a été rendu sans en-têtes.");
        return null;
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-600 p-4 bg-gray-50 rounded-lg">
                Aucune donnée à afficher.
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto bg-white shadow-lg rounded-lg ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header.key} // Utilise la clé de l'en-tête pour la key de React
                            scope="col"
                            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.className || ''}`}
                        >
                            {header.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                    <tr key={item[keyField]} className="hover:bg-gray-50 transition-colors duration-150">
                        {headers.map((header) => (
                            <td
                                key={`${item[keyField]}-${header.key}`} // Clé unique pour chaque cellule
                                className={`px-6 py-4 whitespace-nowrap text-left text-sm ${header.render ? '' : 'text-gray-900'} ${header.cellClassName || ''}`}
                            >
                                {}
                                {header.render ? header.render(item[header.key], item) : item[header.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
