import React from 'react';

export default function CountryCard({ country }) {
    return (
        <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col">
            {/* FLAG IMAGE: must be first and full width, no padding around it */}
            <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.official}`}
                className="block w-full h-32 object-cover" // block removes whitespace around img
            />

            {/* CARD CONTENT: this has padding, but only for text */}
            <div className="p-4 space-y-1 text-sm flex-grow">
                <h2 className="text-lg font-semibold truncate" title={country.name.official}>
                    {country.name.official}
                </h2>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'No capital'}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
        </div>
    );
}
