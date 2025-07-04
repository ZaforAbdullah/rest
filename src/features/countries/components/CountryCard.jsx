// src/features/countries/components/CountryCard.jsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const CountryCard = React.memo(function CountryCard({ country }) {
    const navigate = useNavigate();
    const populationText = useMemo(() => country.population.toLocaleString(), [country.population]);

    const handleClick = () => {
        navigate(`/country/${country.cca3}`);
    };

    return (
        <Card
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            role="button"
            tabIndex={0}
            className="cursor-pointer overflow-hidden hover:shadow-md transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-ring/70 p-0"
        >
            <img
                src={country.flags.svg}
                alt={country.name.official}
                className="w-full h-40 object-cover"
                loading="lazy"
            />
            <CardContent className="pt-4 pb-6 px-4">
                <h2 className="font-bold text-lg mb-2 text-foreground">{country.name.official}</h2>
                <p className="text-sm text-muted-foreground space-y-1">
                    <span className="block">
                        <strong>Region:</strong> {country.region}
                    </span>
                    <span className="block">
                        <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                    </span>
                    <span className="block">
                        <strong>Population:</strong> {populationText}
                    </span>
                </p>
            </CardContent>
        </Card>
    );
});

export default CountryCard;
