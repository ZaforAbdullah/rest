// src/routes/AppRouter.tsx
import { Suspense, lazy } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountriesPage from "../features/countries/pages/CountriesPage";
import ScrollToTop from '../components/ui/ScrollToTop';

const CountryDetailsPage = lazy(() => import('../features/countries/pages/CountryDetailsPage'));

export default function AppRouter(): ReactElement {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="text-center py-20">Loading page…</div>}>
                <Routes>
                    <Route path="/" element={<CountriesPage />} />
                    <Route path="/country/:code" element={<CountryDetailsPage />} />
                    <Route path="*" element={<div className="text-center py-20 text-red-500 text-xl">Page not found</div>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}