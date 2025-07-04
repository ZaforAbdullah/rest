// src/features/countries/hooks/useCountries.js
import { useQuery } from '@tanstack/react-query';
import { fetchCountries, fetchCountryByCode } from '../api';

export const useCountries = () => {
    return useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCountry = (code) => {
    return useQuery({
        queryKey: ['country', code],
        queryFn: () => fetchCountryByCode(code),
        staleTime: 1000 * 60 * 10, // 10 minutes
        enabled: !!code, // avoid running if code is undefined
    });
};