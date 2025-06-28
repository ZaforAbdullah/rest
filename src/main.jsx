// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountriesPage from './pages/CountriesPage';
import CountryDetails from './pages/CountryDetailsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CountriesPage />} />
                <Route path="/country/:code" element={<CountryDetails />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
