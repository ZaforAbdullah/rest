import React, { useState, useMemo } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import CountryCard from './components/CountryCard';

const queryClient = new QueryClient();

const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags,cca3'
    );
    return response.data;
};

function CountryList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5,
    });

    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [page, setPage] = useState(1);
    const perPage = 12;

    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter(country => {
            const matchRegion = region === 'All' || country.region === region;
            const matchSearch = country.name.official.toLowerCase().includes(search.toLowerCase());
            return matchRegion && matchSearch;
        });
    }, [data, search, region]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * perPage;
        return filteredData.slice(start, start + perPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / perPage);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading countries.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Search + Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by country name..."
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="px-4 py-2 border rounded-lg w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
                />

                <select
                    value={region}
                    onChange={e => {
                        setRegion(e.target.value);
                        setPage(1);
                    }}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                >
                    <option value="All">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData.map(country => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="self-center dark:text-white">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

// Dark Mode Toggle wrapper
function RootApp() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <div className={darkMode ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-100 min-h-screen'}>
                <div className="text-center text-2xl font-bold pt-6 dark:text-white">
                    Independent Countries
                </div>
                <div className="flex justify-center my-4">
                    <button
                        onClick={() => setDarkMode(prev => !prev)}
                        className="px-4 py-2 border rounded dark:text-white"
                    >
                        Toggle Dark Mode
                    </button>
                </div>
                <CountryList />
            </div>
        </QueryClientProvider>
    );
}

export default RootApp;
