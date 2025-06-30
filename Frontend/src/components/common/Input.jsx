// src/components/common/Input.jsx

import React from 'react';

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
    <div className="mb-5">
      <label htmlFor={id} className="block text-gray-700 text-base font-medium mb-2">
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
          w-full px-5 py-3 border border-pink-200 rounded-xl shadow-sm
          focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400
          transition duration-200 ease-in-out text-gray-800 text-lg
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}
          ${className}
        `}
      />
    </div>
  );
}

export default Input;