// src/pages/CountryDetailsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCountry } from '../features/countries/hooks/useCountries';
import useDarkMode from '../hooks/useDarkMode';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function CountryDetailsPage() {
    const [darkMode] = useDarkMode();
    const { code } = useParams();
    const { data: country, isLoading, isError } = useCountry(code);

    // Fetch bordering countries
    const { data: borderCountries } = useQuery({
        queryKey: ['borders', country?.borders],
        queryFn: async () => {
            if (!country?.borders?.length) return [];
            const response = await axios.get(
                `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}&fields=name,cca3`
            );
            return response.data;
        },
        enabled: !!country?.borders?.length,
        staleTime: 1000 * 60 * 10,
    });

    if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (isError || !country) return <div className="text-center mt-10 text-red-500">Country not found.</div>;

    const formattedPopulation = new Intl.NumberFormat().format(country.population);
    const formattedLanguages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const formattedCurrencies = country.currencies
        ? Object.values(country.currencies).map(c => c.name).join(', ')
        : 'N/A';

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
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

                            {/* Border Country Links */}
                            <div className="mt-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold">Border Countries:</p>

                                    {country.borders?.length === 0 && (
                                        <p className="text-muted-foreground text-sm">None</p>
                                    )}

                                    {country.borders?.length > 0 && !borderCountries && (
                                        <p className="text-sm text-muted-foreground">Loading borders…</p>
                                    )}

                                    {borderCountries?.length > 0 && (
                                        borderCountries.map((border) => (
                                            <Button
                                                asChild
                                                key={border.cca3}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs"
                                            >
                                                <Link to={`/country/${border.cca3}`}>
                                                    {border.name.common}
                                                </Link>
                                            </Button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
