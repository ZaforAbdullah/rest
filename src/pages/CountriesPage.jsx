import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Controls from '../components/Controls';
import CountryList from '../components/CountryList';

const queryClient = new QueryClient();

export default function CountriesPage() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [regions, setRegions] = useState(['All']);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/independent?status=true&fields=region')
            .then(res => {
                const unique = Array.from(new Set(res.data.map(c => c.region).filter(Boolean)));
                setRegions(['All', ...unique]);
            });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
                <Controls
                    search={search}
                    onSearchChange={e => setSearch(e.target.value)}
                    region={region}
                    onRegionChange={e => setRegion(e.target.value)}
                    regions={regions}
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(prev => !prev)}
                />

                <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Where in the world?
                </h1>

                <CountryList search={search} region={region} />
            </div>
        </QueryClientProvider>
    );
}
