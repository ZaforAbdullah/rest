import React from 'react';
import { Link } from 'react-router-dom';

function highlightText(text, highlight) {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, i) =>
        regex.test(part) ? <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">{part}</mark> : part
    );
}

function CountryCard({ country, highlight }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
            <img src={country.flags.svg} alt={country.name.official} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="font-bold text-lg mb-2 dark:text-white">{country.name.official}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Region:</strong> {country.region}<br />
                    <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
                    <strong>Population:</strong> {country.population.toLocaleString()}
                </p>
            </div>
        </div>
    );
}

export default CountryCard;
