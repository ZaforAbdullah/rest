// src/pages/CountryDetailsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCountry } from '../features/countries/hooks/useCountries';

export default function CountryDetailsPage() {
    const { code } = useParams();
    const { data: country, isLoading, isError } = useCountry(code);

    if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (isError || !country) return <div className="text-center mt-10 text-red-500">Country not found.</div>;

    const formattedPopulation = new Intl.NumberFormat().format(country.population);
    const formattedLanguages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const formattedCurrencies = country.currencies
        ? Object.values(country.currencies).map(c => c.name).join(', ')
        : 'N/A';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Button asChild variant="secondary" className="mb-6 inline-block">
                    <Link to="/">← Back</Link>
                </Button>
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        loading="lazy"
                        src={country.flags.svg}
                        alt={country.name.official}
                        className="w-full md:w-1/2 rounded object-contain max-h-[300px]"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{country.name.official}</h1>
                        <p><strong>Common Name:</strong> {country.name.common}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                        <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                        <p><strong>Population:</strong> {formattedPopulation}</p>
                        <p><strong>Languages:</strong> {formattedLanguages}</p>
                        <p><strong>Currencies:</strong> {formattedCurrencies}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

