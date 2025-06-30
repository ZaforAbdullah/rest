// src/features/countries/useCountries.js
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from './api';

export const useCountries = () => {
    return useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5,
    });
};
