// @ts-nocheck
import React from 'react';
const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto" onClick={onClose}>
            <div
                className={`bg-white rounded-lg shadow-xl p-6 m-4 max-w-lg w-full transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn ${className}`}
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 cursor-pointer hover:bg-gray-700/50 rounded-full hover:text-gray-600 transition-colors duration-150"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <style jsx="true">{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s forwards;
        }
      `}</style>
        </div>
    );
};

export default Modal;
