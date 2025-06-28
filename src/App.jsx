import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountriesPage from './pages/CountriesPage';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CountriesPage />
        </QueryClientProvider>
    );
}

export default App;
