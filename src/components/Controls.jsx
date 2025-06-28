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
        <div className="max-w-7xl mx-auto px-4">
            {/* Top Row: Title and Toggle */}
            <div className="w-full flex justify-between items-center pt-6">
                <h1 className="text-2xl font-bold dark:text-white">Where in the world?</h1>
                <button
                    onClick={toggleDarkMode}
                    className="text-2xl p-2 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? (
                        <FaSun className="text-yellow-400 transition duration-300" />
                    ) : (
                        <FaMoon className="text-gray-900 dark:text-white transition duration-300" />
                    )}
                </button>
            </div>

            {/* Second Row: Search and Region */}
            <div className="w-full mt-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by country name..."
                        value={search}
                        onChange={onSearchChange}
                        className="w-full md:w-1/2 px-4 py-2 border rounded-lg transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />

                    <select
                        value={region}
                        onChange={onRegionChange}
                        className="w-full md:w-48 px-4 py-2 border rounded-lg transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                        {regions.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
