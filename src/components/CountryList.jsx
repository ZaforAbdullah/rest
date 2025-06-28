import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CountryCard from './CountryCard';
import { Button } from './ui/button'; // ✅ import your custom Button

const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags,cca3'
    );
    return response.data;
};

export default function CountryList({ search, region }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5,
    });

    const [page, setPage] = useState(1);
    const perPage = 20;

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
        <div className="max-w-7xl mx-auto px-4 pb-8">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData.map((country) => (
                    <CountryCard key={country.cca3} country={country} highlight={search} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-4 items-center flex-wrap">
                <Button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    variant="secondary"
                >
                    Prev
                </Button>
                <span className="text-sm font-medium dark:text-white">
                    Page {page} of {totalPages}
                </span>
                <Button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    variant="secondary"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
