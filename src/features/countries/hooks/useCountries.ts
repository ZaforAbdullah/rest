import { useQuery } from '@tanstack/react-query'
import { fetchCountries, fetchCountryByCode, fetchBorderCountries } from '@/features/countries/api'
import type { Country } from '@/features/countries/types'

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['independentCountries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCountry = (code: string | undefined) => {
  return useQuery<Country>({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code!),
    staleTime: 1000 * 60 * 10,
    enabled: !!code,
  })
}

export const useBorderCountries = (borders?: string[]) => {
  return useQuery<Country[]>({
    queryKey: ['borders', borders],
    queryFn: () => fetchBorderCountries(borders ?? []),
    enabled: !!borders?.length,
    staleTime: 1000 * 60 * 10,
  })
}
