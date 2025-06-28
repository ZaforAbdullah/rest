import React from 'react';

function highlightText(text, highlight) {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, i) =>
        regex.test(part) ? <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">{part}</mark> : part
    );
}

function CountryCard({ country, highlight }) {
    return (
        <div className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
            <img src={country.flags.svg} alt={country.name.official} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-semibold mb-2">
                {highlightText(country.name.official, highlight)}
            </h2>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
    );
}

export default CountryCard;
