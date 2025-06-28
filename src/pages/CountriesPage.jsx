import React, { useState } from 'react';
import CountryList from '../components/CountryList';
import useDarkMode from '../hooks/useDarkMode';

function CountriesPage() {
    const [search, setSearch] = useState('');
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <div className={darkMode ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-100 min-h-screen'}>
            <div className="text-center text-2xl font-bold pt-6 dark:text-white">
                Independent Countries
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 my-4 max-w-7xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by country name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
                />
                <button
                    onClick={() => setDarkMode((prev) => !prev)}
                    className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
                >
                    Toggle Dark Mode
                </button>
            </div>

            <CountryList search={search} />
        </div>
    );
}

export default CountriesPage;
