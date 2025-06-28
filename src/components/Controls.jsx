// src/components/Controls.jsx
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Controls({
    search,
    onSearchChange,
    region,
    onRegionChange,
    regions,
    darkMode,
    toggleDarkMode
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row */}
            <div className="flex justify-between items-center pt-6 pb-4">
                <h1 className="text-2xl font-bold dark:text-white">Where in the world?</h1>
                <button
                    onClick={toggleDarkMode}
                    className="text-2xl p-2 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? (
                        <FaSun className="text-yellow-400" />
                    ) : (
                        <FaMoon className="text-gray-900 dark:text-white" />
                    )}
                </button>
            </div>

            {/* Second Row */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center pb-6">
                <input
                    type="text"
                    placeholder="Search by country name..."
                    value={search}
                    onChange={onSearchChange}
                    className="w-full md:w-60 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                />

                <select
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
            </div>
        </div>
    );
}
