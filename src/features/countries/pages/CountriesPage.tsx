// src/pages/CountriesPage.tsx
import type { JSX } from 'react';
import React, { useState, useMemo, useCallback } from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import { useCountries } from '@/features/countries/hooks/useCountries';
import Controls from '@/features/countries/components/Controls';
import CountryList from '@/features/countries/components/CountryList';

export default function CountriesPage(): JSX.Element {
    const [darkMode, setDarkMode] = useDarkMode();
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const { data: countries = [], isLoading, isError } = useCountries();

    const regions = useMemo(() => {
        const unique = Array.from(new Set(countries.map(c => c.region).filter(Boolean)));
        return ['All', ...unique];
    }, [countries]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);
    const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setRegion(e.target.value), []);
    const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <Controls
                        search={search}
                        onSearchChange={handleSearchChange}
                        region={region}
                        onRegionChange={handleRegionChange}
                        regions={regions}
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                    <CountryList
                        search={search}
                        region={region}
                        countries={countries}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
            </div>
        </div>
    );
}