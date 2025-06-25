// App.jsx
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// Create React Query client
const queryClient = new QueryClient();

// Fetch function
const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags'
    );
    return response.data;
};

// Country Card Component
function CountryList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
    });

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading countries.</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.map((country, index) => (
                    <div
                        key={index}
                        className="w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
                    >
                        <img
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.official}`}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4 space-y-1 text-sm">
                            <h2 className="text-lg font-semibold">{country.name.official}</h2>
                            <p><strong>Capital:</strong> {country.capital?.[0] || 'No capital'}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Root App
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1 className="text-center text-2xl font-bold mt-6">Independent Countries</h1>
            <CountryList />
        </QueryClientProvider>
    );
}
