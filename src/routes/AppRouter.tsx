// src/routes/AppRouter.tsx
import { Suspense, lazy } from 'react'
import type { ReactElement } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import CountriesPage from '@/features/countries/pages/CountriesPage'

const CountryDetailsPage = lazy(() => import('@/features/countries/pages/CountryDetailsPage'))

export default function AppRouter(): ReactElement {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<CountriesPage />} />
          <Route path="/country/:code" element={<CountryDetailsPage />} />
          <Route
            path="*"
            element={<div className="text-center py-20 text-red-500 text-xl">Page not found</div>}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
