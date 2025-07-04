// src/features/countries/components/CountryGrid.jsx
import React from 'react';
import CountryCard from './CountryCard';

export default function CountryGrid({ countries }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    );
}
