import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCountry } from '../features/countries/hooks/useCountries';
import useDarkMode from '../hooks/useDarkMode';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

export default function CountryDetailsPage() {
    const [darkMode] = useDarkMode();
    const { code } = useParams();
    const { data: country, isLoading, isError } = useCountry(code);

    // Fetch bordering countries
    const { data: borderCountries, isLoading: bordersLoading } = useQuery({
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
                <div className="max-w-7xl mx-auto animate-pulse">
                    <div className="mb-6 h-10 w-24 bg-muted rounded" />

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/2 h-64 bg-muted rounded" />

                        <div className="flex-1 space-y-3">
                            <div className="h-8 w-3/4 bg-muted rounded" />
                            <div className="h-4 w-1/2 bg-muted rounded" />
                            <div className="h-4 w-2/3 bg-muted rounded" />
                            <div className="h-4 w-1/3 bg-muted rounded" />
                            <div className="h-4 w-1/2 bg-muted rounded" />
                            <div className="h-4 w-2/3 bg-muted rounded" />
                            <div className="h-4 w-1/4 bg-muted rounded" />
                            <div className="h-6 w-40 mt-6 bg-muted rounded" />
                            <div className="flex gap-2 mt-2">
                                <div className="h-8 w-20 bg-muted rounded" />
                                <div className="h-8 w-20 bg-muted rounded" />
                                <div className="h-8 w-20 bg-muted rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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
                        <Link to="/" aria-label="Back to homepage">← Back</Link>
                    </Button>

                    <div className="flex flex-col md:flex-row gap-8">
                        <img
                            loading="lazy"
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.official}`}
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

                            {/* Border Countries */}
                            <div className="mt-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold">Border Countries:</p>

                                    {!country.borders?.length && (
                                        <p className="text-muted-foreground text-sm">None</p>
                                    )}

                                    {bordersLoading && (
                                        <div className="flex gap-2">
                                            {Array.from({ length: 4 }).map((_, idx) => (
                                                <Skeleton key={idx} className="h-8 w-20" />
                                            ))}
                                        </div>
                                    )}

                                    {!bordersLoading && borderCountries?.length > 0 && borderCountries.map((border) => (
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
