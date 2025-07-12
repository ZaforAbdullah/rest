// src/features/countries/hooks/useCountries.ts
import { useQuery } from '@tanstack/react-query';
import { fetchCountries, fetchCountryByCode } from '../api';
import { Country } from '../types';

export const useCountries = () => {
    return useQuery<Country[]>({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCountry = (code: string | undefined) => {
    return useQuery<Country>({
        queryKey: ['country', code],
        queryFn: () => fetchCountryByCode(code!),
        staleTime: 1000 * 60 * 10,
        enabled: !!code,
    });
};
