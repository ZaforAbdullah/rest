// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountriesPage from '../pages/CountriesPage';
import CountryDetailsPage from '../pages/CountryDetailsPage';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CountriesPage />} />
                <Route path="/country/:code" element={<CountryDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
