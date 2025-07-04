// src/features/countries/components/CountryList.jsx
import React, { useMemo, useState } from 'react';
import CountryCard from './CountryCard';
import Pagination from './Pagination';
import SkeletonCard from './SkeletonCard';

export default function CountryList({ search, region, countries, isLoading, isError }) {
    const [page, setPage] = useState(1);
    const perPage = 20;

    const filteredData = useMemo(() => {
        return countries.filter(country => {
            const matchRegion = region === 'All' || country.region === region;
            const matchSearch = country.name.official.toLowerCase().includes(search.toLowerCase());
            return matchRegion && matchSearch;
        });
    }, [countries, search, region]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * perPage;
        return filteredData.slice(start, start + perPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / perPage);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
                    : paginatedData.map((country) => (
                        <CountryCard key={country.cca3} country={country} search={search} />
                    ))}
            </div>
            {!isLoading && !isError && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}
            {isError && <div className="text-center mt-10 text-red-500">Error loading countries.</div>}
        </div>
    );
}
