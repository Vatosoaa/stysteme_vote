// @ts-nocheck
// src/components/common/Input.jsx

import React from 'react';

/**
 * Composant d'entrée (input) réutilisable.
 * @param {object} props - Les props de l'input.
 * @param {string} props.id - L'ID unique de l'input (important pour l'accessibilité).
 * @param {string} props.label - Le texte du label associé à l'input.
 * @param {string} props.type - Le type de l'input (ex: 'text', 'email', 'password').
 * @param {string} props.value - La valeur actuelle de l'input (contrôlé).
 * @param {function} props.onChange - La fonction de rappel pour gérer le changement de valeur.
 * @param {string} [props.placeholder=''] - Le texte d'exemple à afficher dans l'input.
 * @param {boolean} [props.required=false] - Indique si le champ est requis.
 * @param {boolean} [props.disabled=false] - Indique si l'input est désactivé.
 * @param {string} [props.className=''] - Classes CSS supplémentaires à appliquer à l'input.
 */
function Input({
                  id,
                  label,
                  type,
                  value,
                  onChange,
                  placeholder = '',
                  required = false,
                  disabled = false,
                  className = ''
               }) {
   return (
       <div className="mb-4">
          <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
             {label}
          </label>
          <input
              type={type}
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              className={`
                    w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    transition duration-200 ease-in-out
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                    ${className}
                `}
          />
       </div>
   );
}

export default Input;
