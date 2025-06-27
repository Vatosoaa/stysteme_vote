// @ts-ignore
import React from 'react';

/**
 * Composant de bouton réutilisable.
 * @param {object} props - Les props du bouton.
 * @param {string} props.label - Le texte affiché sur le bouton.
 * @param {function} props.onClick - La fonction à exécuter lors du clic.
 * @param {string} [props.color='bg-indigo-700'] - Classe Tailwind pour la couleur de fond du bouton.
 * @param {string} [props.textColor='text-white'] - Classe Tailwind pour la couleur du texte du bouton.
 * @param {string} [props.hoverColor='hover:bg-indigo-600'] - Classe Tailwind pour la couleur au survol.
 * @param {string} [props.type='button'] - Le type du bouton (ex: 'submit', 'button').
 * @param {boolean} [props.disabled=false] - Indique si le bouton est désactivé.
 * @param {string} [props.className=''] - Classes CSS supplémentaires à appliquer.
 */
function Button({
                   label = "Clique",
                   onClick,
                   color = "bg-indigo-700", // Couleur primaire par défaut
                   textColor = "text-white",
                   hoverColor = "hover:bg-indigo-600",
                   type = "button",
                   disabled = false,
                   className = ''
                }) {
   return (
       <button
           // @ts-ignore
           type={type}
           // @ts-ignore
           onClick={onClick}
           className={`
                ${color}
                ${textColor}
                ${hoverColor}
                px-6 py-3 rounded-full!
                font-semibold text-lg
                transition duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
           disabled={disabled}
       >
          {label}
       </button>
   );
}

export default Button;
