// src/features/countries/api.ts
import axios from 'axios';
import type { Country } from '@/features/countries/types';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags,cca3',
  );
  return response.data;
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
  return response.data[0];
};
