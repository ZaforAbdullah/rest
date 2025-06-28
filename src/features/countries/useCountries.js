import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from './api.js';

export const useCountries = () => {
    return useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 5,
    });
};
