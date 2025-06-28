import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CountryDetailsPage() {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
            .then(res => {
                setCountry(res.data[0]);
                setLoading(false);
            }).catch(() => setLoading(false));
    }, [code]);

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (!country) return <div className="text-center mt-10 text-red-500">Country not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6 max-w-5xl mx-auto">
            <Link to="/" className="text-blue-600 dark:text-blue-300 underline mb-6 inline-block">← Back</Link>
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={country.flags.svg}
                    alt={country.name.official}
                    className="w-full md:w-1/2 rounded shadow-md object-contain max-h-[300px]"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{country.name.official}</h1>
                    <p><strong>Common Name:</strong> {country.name.common}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                    <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                    <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

