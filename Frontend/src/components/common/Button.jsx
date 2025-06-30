// @ts-nocheck
import React from 'react';

function Button({
  label = "Clique",
  onClick,
  color = "bg-pink-600",
  textColor = "text-white",
  hoverColor = "hover:bg-pink-700",
  type = "button",
  disabled = false,
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${color}
        ${textColor}
        ${hoverColor}
        px-8 py-4 rounded-full
        font-bold text-xl
        shadow-lg hover:shadow-xl
        transform hover:scale-105 transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
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