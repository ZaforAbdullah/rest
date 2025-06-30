// src/pages/CountriesPage.jsx
import React, { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Controls from '../components/Controls';
import CountryList from '../components/CountryList';
import { useCountries } from '../features/countries/useCountries';

const queryClient = new QueryClient();

function InnerPage() {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const { data: countries = [], isLoading, isError } = useCountries();

    const regions = useMemo(() => {
        const uniqueRegions = Array.from(new Set(countries.map(c => c.region).filter(Boolean)));
        return ['All', ...uniqueRegions];
    }, [countries]);

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <Controls
                    search={search}
                    onSearchChange={e => setSearch(e.target.value)}
                    region={region}
                    onRegionChange={e => setRegion(e.target.value)}
                    regions={regions}
                />
                <CountryList search={search} region={region} countries={countries} isLoading={isLoading} isError={isError} />
            </div>
        </div>
    );
}

export default function CountriesPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <InnerPage />
        </QueryClientProvider>
    );
}
