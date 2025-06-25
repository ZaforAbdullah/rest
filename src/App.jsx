/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
// import OverView from './OverView'
// import QuickStart from './QuickStart'
//import HandleFocus from './HandleFocus'
import Basic from './Basic'
//import Card from './Card'
import Shadcn from './Shadcn'
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Shadcn />
    </React.StrictMode>
)
*/

import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import CountryCard from './components/CountryCard';

const queryClient = new QueryClient();

const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags,cca3'
    );
    return response.data;
};

function CountryList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading countries.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.map((country) => (
                    <CountryCard key={country.cca3 || country.name.official} country={country} />
                ))}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1 className="text-center text-2xl font-bold mt-6">Independent Countries</h1>
            <CountryList />
        </QueryClientProvider>
    );
}

