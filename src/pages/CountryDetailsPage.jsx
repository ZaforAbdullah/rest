import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountry } from '../features/countries/hooks/useCountries';
import useDarkMode from '../hooks/useDarkMode';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function CountryDetailsPage() {
    const [darkMode] = useDarkMode();
    const { code } = useParams();
    const { data: country, isLoading, isError } = useCountry(code);

    const {
        data: borderCountries,
        isLoading: bordersLoading,
    } = useQuery({
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

    const formattedPopulation = country?.population
        ? new Intl.NumberFormat().format(country.population)
        : '';
    const formattedLanguages = country?.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';
    const formattedCurrencies = country?.currencies
        ? Object.values(country.currencies).map(c => c.name).join(', ')
        : 'N/A';

    return (
        <motion.div
            key={`country-${code}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${darkMode ? 'dark' : ''}`}
        >
            <div className="min-h-screen bg-background text-foreground">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Button asChild variant="outline" size="icon" className="mb-6" aria-label="Back">
                        <Link to="/">
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Link>
                    </Button>

                    {isLoading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 w-1/3 bg-muted rounded" />
                            <div className="h-64 bg-muted rounded" />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-4 w-3/4 bg-muted rounded" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : isError || !country ? (
                        <div className="text-center mt-10 text-red-500 text-lg">
                            Country not found.
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-8">
                            <img
                                loading="lazy"
                                src={country.flags.svg}
                                alt={country.name.official}
                                className="w-full md:w-1/2 rounded object-contain max-h-[300px]"
                            />
                            <div className="flex-1 space-y-2">
                                <h1 className="text-3xl font-bold mb-4">{country.name.official}</h1>
                                <p><strong>Common Name:</strong> {country.name.common}</p>
                                <p><strong>Region:</strong> {country.region}</p>
                                <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                                <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                                <p><strong>Population:</strong> {formattedPopulation}</p>
                                <p><strong>Languages:</strong> {formattedLanguages}</p>
                                <p><strong>Currencies:</strong> {formattedCurrencies}</p>

                                <div className="mt-6">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-semibold">Border Countries:</p>

                                        {!country.borders?.length && (
                                            <span className="text-muted-foreground text-sm">None</span>
                                        )}

                                        {bordersLoading && (
                                            <div className="flex gap-2">
                                                {Array.from({ length: 3 }).map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-8 w-20 rounded-md bg-muted animate-pulse"
                                                    />
                                                ))}
                                            </div>
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
                    )}
                </div>
            </div>
        </motion.div>
    );
}
