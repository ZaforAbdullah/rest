import React from 'react';

export default function CountryCard({ country, highlight }) {
    const name = country.name.official;

    const getHighlightedName = () => {
        if (!highlight?.trim()) return name;

        const regex = new RegExp(`(${highlight})`, 'gi');
        return name.split(regex).map((part, i) =>
            regex.test(part) ? (
                <mark
                    key={i}
                    className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 rounded"
                >
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200 flex flex-col">
            <img
                src={country.flags.svg}
                alt={`Flag of ${name}`}
                className="block w-full h-32 object-cover"
            />
            <div className="p-4 space-y-1 text-sm flex-grow">
                <h2 className="text-lg font-semibold truncate" title={name}>
                    {getHighlightedName()}
                </h2>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'No capital'}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
        </div>
    );
}
