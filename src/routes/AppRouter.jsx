import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CountriesPage from '../pages/CountriesPage';
import { AnimatePresence } from 'framer-motion';

const CountryDetailsPage = lazy(() => import('../pages/CountryDetailsPage'));

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<CountriesPage />} />
                <Route
                    path="/country/:code"
                    element={
                        <Suspense fallback={<div className="p-6 text-center">Loading country…</div>}>
                            <CountryDetailsPage />
                        </Suspense>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}
