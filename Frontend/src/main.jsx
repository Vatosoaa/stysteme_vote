// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext.jsx';

// Création d'une instance de QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Les données sont considérées "fraîches" pendant 5 minutes
            cacheTime: 1000 * 60 * 30, // Les données sont gardées en cache pendant 30 minutes
            refetchOnWindowFocus: false, // Évite de refaire un appel API à chaque focus sur la fenêtre
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* Fournit le client TanStack Query à toute l'application */}
        <QueryClientProvider client={queryClient}>
            {/* Fournit le contexte d'authentification */}
            <AuthProvider>
                {/* Gère la navigation */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
            {/* Outil de dev pour TanStack Query, très pratique ! */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
