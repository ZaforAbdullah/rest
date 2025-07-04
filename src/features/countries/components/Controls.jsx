// src/features/countries/components/Controls.jsx
import React from 'react';
import { FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Controls = React.memo(function Controls({
    search,
    onSearchChange,
    region,
    onRegionChange,
    regions,
    darkMode,
    toggleDarkMode
}) {
    const handleClear = () => {
        onSearchChange({ target: { value: '' } });
        onRegionChange({ target: { value: 'All' } });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 pt-6 pb-4 flex-nowrap">
                <h1 className="text-xl sm:text-2xl font-bold dark:text-white truncate">
                    Where in the world?
                </h1>
                <button
                    onClick={toggleDarkMode}
                    className="shrink-0 text-2xl p-2 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900 dark:text-white" />}
                </button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center pb-6">
                <input
                    type="text"
                    aria-label="Search countries by name"
                    placeholder="Search by country name..."
                    value={search}
                    onChange={onSearchChange}
                    className="w-full md:w-60 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                />
                <select
                    aria-label="Filter by region"
                    value={region}
                    onChange={onRegionChange}
                    className="w-full md:w-48 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                >
                    {regions.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <Button variant="outline" size="sm" onClick={handleClear} className="md:ml-4">
                    <FaTimes className="mr-2" /> Clear Filters
                </Button>
            </div>
        </div>
    );
});

export default Controls;
