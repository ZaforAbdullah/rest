// src/components/CountryList.jsx
import React, { useMemo, useState } from 'react';
import CountryGrid from './CountryGrid';
import Pagination from './Pagination';

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

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading countries.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            <CountryGrid countries={paginatedData} />
            <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage(prev => Math.max(prev - 1, 1))}
                onNext={() => setPage(prev => Math.min(prev + 1, totalPages))}
            />
        </div>
    );
}
