import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/auth.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter future={{ v7_relativeSplatPath: true }}>
                <Toaster />
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);
