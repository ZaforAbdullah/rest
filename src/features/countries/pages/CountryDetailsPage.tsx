// src/pages/CountryDetailsPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCountry } from '@/features/countries/hooks/useCountries';
import type { Country } from '@/features/countries/types';
import useDarkMode from '@/hooks/useDarkMode';

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-wrap gap-2 text-sm mb-1">
            <span className="font-semibold">{label}:</span>
            <span className="text-foreground">{value}</span>
        </div>
    );
}

export default function CountryDetailsPage() {
    const [darkMode] = useDarkMode();
    const { code } = useParams<{ code: string }>();
    const { data: country, isLoading, isError } = useCountry(code);

    const {
        data: borderCountries,
        isLoading: bordersLoading,
    } = useQuery<Country[]>({
        queryKey: ['borders', country?.borders],
        queryFn: async () => {
            if (!country?.borders?.length) return [];
            const res = await axios.get(
                `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}&fields=name,cca3`
            );
            return res.data;
        },
        enabled: !!country?.borders?.length,
        staleTime: 1000 * 60 * 10,
    });

    if (isLoading)
        return <div className="text-center mt-10 text-lg">Loading country…</div>;

    if (isError || !country)
        return (
            <div className="text-center mt-10 text-red-500">Country not found.</div>
        );

    const formattedPopulation = new Intl.NumberFormat().format(country.population);
    const formattedLanguages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';
    const formattedCurrencies = country.currencies
        ? Object.values(country.currencies)
            .map((c) => `${c.name} (${c.symbol || ''})`)
            .join(', ')
        : 'N/A';

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mb-6"
                        aria-label="Go back"
                        data-testid="back-button"
                    >
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
                            <ArrowLeftIcon className="size-5" />
                        </Link>
                    </Button>

                    <motion.div
                        key={code}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row gap-8"
                    >
                        <div className="w-full md:w-1/2">
                            <img
                                src={country.flags.svg}
                                alt={country.name.official}
                                className="w-full h-auto max-h-[320px] object-contain rounded"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-6">
                                {country.name.official}
                            </h1>

                            <div className="space-y-1 text-sm">
                                <DetailRow label="Common Name" value={country.name.common} />
                                <DetailRow label="Region" value={country.region} />
                                <DetailRow label="Subregion" value={country.subregion || 'N/A'} />
                                <DetailRow
                                    label="Capital"
                                    value={country.capital?.join(', ') || 'N/A'}
                                />
                                <DetailRow
                                    label="Population"
                                    value={formattedPopulation || 'N/A'}
                                />
                                <DetailRow label="Languages" value={formattedLanguages} />
                                <DetailRow label="Currencies" value={formattedCurrencies} />
                                <DetailRow
                                    label="Border Countries"
                                    value={
                                        bordersLoading ? (
                                            <div className="flex gap-2">
                                                {Array.from({ length: 3 }).map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-8 w-20 rounded bg-muted animate-pulse"
                                                    />
                                                ))}
                                            </div>
                                        ) : (borderCountries?.length ?? 0) > 0 ? (
                                            <div
                                                data-testid="border-countries"
                                                className="flex flex-wrap gap-2"
                                            >
                                                {borderCountries?.map((border) => (
                                                    <Link
                                                        to={`/country/${border.cca3}`}
                                                        key={border.cca3}
                                                        data-testid={`border-country-${border.cca3}`}
                                                    >
                                                        <Button variant="outline" size="sm" className="text-xs">
                                                            {border.name.common}
                                                        </Button>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            'None'
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
