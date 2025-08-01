// src/features/countries/pages/__tests__/CountriesPage.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CountriesPage from '../CountriesPage';
import * as useCountriesHook from '@/features/countries/hooks/useCountries';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Country } from '@/features/countries/types';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/features/countries/hooks/useCountries');

const mockCountries = [{
  cca3: 'BGD',
  name: { common: 'Bangladesh', official: 'People\'s Republic of Bangladesh' },
  region: 'Asia',
  capital: ['Dhaka'],
  flags: { svg: 'flag.svg' },
  population: 1000,
}];

describe('CountriesPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('shows loading state', () => {
    vi.spyOn(useCountriesHook, 'useCountries').mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    } as unknown as UseQueryResult<Country[], Error>);

    renderWithRouter(<CountriesPage />);

    // Adjust according to your component's actual loading state render
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
  });

  it('shows error state', () => {
    vi.spyOn(useCountriesHook, 'useCountries').mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    } as unknown as UseQueryResult<Country[], Error>);

    renderWithRouter(<CountriesPage />);
    expect(screen.getByText(/Error loading countries/i)).toBeInTheDocument();
  });

  it('renders countries after loading', () => {
    vi.spyOn(useCountriesHook, 'useCountries').mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<Country[], Error>);

    renderWithRouter(<CountriesPage />);
    expect(screen.getByText(/Bangladesh/i)).toBeInTheDocument();
  });
});
