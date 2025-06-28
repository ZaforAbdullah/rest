import React, { useEffect, useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryList from '../components/CountryList';
import axios from 'axios';

const queryClient = new QueryClient();

function CountriesPage() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [regions, setRegions] = useState([]);

    // Apply dark mode
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    }, [darkMode]);

    // Fetch region options only once
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/independent?status=true&fields=region')
            .then(res => {
                const uniqueRegions = Array.from(new Set(res.data.map(c => c.region).filter(Boolean)));
                setRegions(['All', ...uniqueRegions]);
            });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className={darkMode ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-100 min-h-screen'}>
                <div className="max-w-7xl mx-auto px-4">

                    {/* 🌙 Theme Toggle Button (top-right corner) */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => setDarkMode(prev => !prev)}
                            className="text-2xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
                            title="Toggle Theme"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>

                    {/* Heading */}
                    <div className="text-center text-2xl font-bold mt-4 mb-6 dark:text-white">
                        Independent Countries
                    </div>

                    {/* Controls row: Search left, Region right */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search by country name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-80 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        />
                        <select
                            value={region}
                            onChange={e => setRegion(e.target.value)}
                            className="w-full md:w-48 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                        >
                            {regions.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <CountryList search={search} region={region} />
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default CountriesPage;
