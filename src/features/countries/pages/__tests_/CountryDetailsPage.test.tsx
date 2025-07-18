import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import * as useCountriesHook from '@/features/countries/hooks/useCountries';
import CountryDetailsPage from '../CountryDetailsPage';
import type { Country } from '@/features/countries/types';

// Fully mock react-query before imports resolve
vi.mock('@tanstack/react-query', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(typeof actual === 'object' && actual !== null ? actual : {}),
        useQuery: vi.fn(),
    };
});

const mockCountry: Country = {
    cca3: 'BGD',
    borders: ['IND'],
    name: { common: 'Bangladesh', official: 'People\'s Republic of Bangladesh' },
    region: 'Asia',
    subregion: 'South Asia',
    capital: ['Dhaka'],
    flags: { svg: 'flag.svg' },
    population: 1000,
    languages: { ben: 'Bengali' },
    currencies: { BDT: { name: 'Taka', symbol: '৳' } },
};

const mockBorderCountries: Country[] = [
    {
        cca3: 'IND',
        name: { common: 'India', official: 'Republic of India' },
        region: 'Asia',
        subregion: 'South Asia',
        capital: ['New Delhi'],
        flags: { svg: 'india-flag.svg' },
        population: 1380000000,
        languages: { hin: 'Hindi' },
        currencies: { INR: { name: 'Rupee', symbol: '₹' } },
        borders: [],
    },
];

describe('CountryDetailsPage', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    function renderWithProviders(route: string) {
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/country/:code" element={<CountryDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );
    }
    /*
    it('renders country details with borders', async () => {
        // Force react-query's useQuery to return mock border countries
        (reactQuery.useQuery as unknown as jest.MockInstance<any, any>).mockReturnValue({
            data: mockBorderCountries,
            isLoading: false,
            isError: false,
            error: null,
            refetch: vi.fn(),
            remove: vi.fn(),
        });

        // Spy useCountry hook
        vi.spyOn(useCountriesHook, 'useCountry').mockReturnValue({
            data: mockCountry,
            isLoading: false,
            isError: false,
        } as unknown as reactQuery.UseQueryResult<Country, Error>);

        renderWithProviders('/country/BGD');

        await waitFor(() => {
            expect(screen.getByText(/Bangladesh/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/India/)).toBeInTheDocument();
    });
    */

    it('renders error state', () => {
        (reactQuery.useQuery as unknown as jest.MockInstance<any, any>).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        vi.spyOn(useCountriesHook, 'useCountry').mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: new Error('Country not found'),
        } as unknown as reactQuery.UseQueryResult<Country, Error>);

        renderWithProviders('/country/XYZ');

        expect(screen.getByText(/Country not found/i)).toBeInTheDocument();
    });
});
