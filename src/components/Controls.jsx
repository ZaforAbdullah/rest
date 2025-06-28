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
        <>
            {/* Sticky Top-right 🌙 Toggle */}
            <div className="sticky top-0 z-10 bg-inherit px-4 py-2 flex justify-end">
                <button
                    onClick={toggleDarkMode}
                    className="text-2xl p-2 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? (
                        <FaSun className="text-yellow-400 transition-transform duration-500" />
                    ) : (
                        <FaMoon className="text-gray-900 dark:text-white transition-transform duration-500" />
                    )}
                </button>
            </div>

            {/* Controls Row */}
            <div className="w-full max-w-7xl mx-auto px-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by country name..."
                        value={search}
                        onChange={onSearchChange}
                        className="w-full md:w-80 px-4 py-2 border rounded-lg transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
        </>
    );
}
