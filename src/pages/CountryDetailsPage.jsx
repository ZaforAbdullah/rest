// src/pages/CountryDetailsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCountryByCode = async (code) => {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    return response.data?.[0];
};

function CountryDetailsPage() {
    const { code } = useParams();

    const { data: country, isLoading, isError } = useQuery({
        queryKey: ['country', code],
        queryFn: () => fetchCountryByCode(code),
    });

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError || !country) return <div className="text-center mt-10 text-red-500">Country not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="text-blue-600 dark:text-blue-400 underline mb-4 inline-block">&larr; Back</Link>
                <h1 className="text-3xl font-bold mb-4">{country.name.official}</h1>
                <img src={country.flags.svg} alt={country.name.official} className="w-64 mb-6" />

                <p><strong>Common Name:</strong> {country.name.common}</p>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Subregion:</strong> {country.subregion}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
                <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
            </div>
        </div>
    );
}

export default CountryDetailsPage;
