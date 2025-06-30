// src/features/countries/api.js
import axios from 'axios';

export const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags,cca3'
    );
    return response.data;
};
