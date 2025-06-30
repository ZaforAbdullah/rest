import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function CountryCard({ country }) {
    const navigate = useNavigate();

    const populationText = useMemo(() => {
        return country.population.toLocaleString();
    }, [country.population]);

    return (
        <div
            onClick={() => navigate(`/country/${country.cca3}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
        >
            <img
                loading="lazy"
                src={country.flags.svg}
                alt={country.name.official}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="font-bold text-lg mb-2 dark:text-white">{country.name.official}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Region:</strong> {country.region}<br />
                    <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
                    <strong>Population:</strong> {populationText}
                </p>
            </div>
        </div>
    );
}

export default React.memo(CountryCard);
