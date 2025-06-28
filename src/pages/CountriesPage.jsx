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
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <Controls
                        search={search}
                        onSearchChange={e => setSearch(e.target.value)}
                        region={region}
                        onRegionChange={e => setRegion(e.target.value)}
                        regions={regions}
                        darkMode={darkMode}
                        toggleDarkMode={() => setDarkMode(prev => !prev)}
                    />
                    <CountryList search={search} region={region} />
                </div>
            </div>
        </QueryClientProvider>
    );
}
