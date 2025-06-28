import React, { useState, useMemo } from 'react';
import { useCountries } from '../features/countries/useCountries';
import CountryCard from './CountryCard';

function CountryList({ search }) {
    const { data, isLoading, isError } = useCountries();
    const [region, setRegion] = useState('All');
    const [page, setPage] = useState(1);
    const perPage = 20;

    const regions = useMemo(() => {
        if (!data) return [];
        const allRegions = data.map((c) => c.region).filter(Boolean);
        return ['All', ...Array.from(new Set(allRegions))];
    }, [data]);

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter((country) => {
            const matchRegion = region === 'All' || country.region === region;
            const matchSearch = country.name.official.toLowerCase().includes(search.toLowerCase());
            return matchRegion && matchSearch;
        });
    }, [data, region, search]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * perPage;
        return filteredData.slice(start, start + perPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / perPage);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading countries.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <select
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setPage(1);
                    }}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                >
                    {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            {/* Country Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData.map((country) => (
                    <CountryCard key={country.cca3} country={country} highlight={search} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="self-center dark:text-white">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CountryList;
