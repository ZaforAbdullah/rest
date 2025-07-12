// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60,
});

export default function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    );
}
