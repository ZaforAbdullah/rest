// src/features/countries/components/__tests__/CountryList.test.tsx
import { render, screen } from '@testing-library/react';
import CountryList from '@/features/countries/components/CountryList';
import { MemoryRouter } from 'react-router-dom';

const mockCountries = Array.from({ length: 30 }).map((_, idx) => ({
  cca3: `C${idx}`,
  name: { common: `Country ${idx}`, official: `Official Country ${idx}` },
  region: 'TestRegion',
  capital: ['Capital'],
  flags: { svg: 'flag.svg' },
  population: 1000 * idx,
}));

describe('CountryList', () => {
  it('shows skeletons when loading', () => {
    render(
            <MemoryRouter>
                <CountryList
                    countries={[]}
                    isLoading
                    isError={false}
                    search=""
                    region="All"
                />
            </MemoryRouter>,
    );
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
  });

  it('renders paginated countries', () => {
    render(
            <MemoryRouter>
                <CountryList
                    countries={mockCountries}
                    isLoading={false}
                    isError={false}
                    search=""
                    region="All"
                />
            </MemoryRouter>,
    );
    expect(screen.getByText(/Country 0/)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
            <MemoryRouter>
                <CountryList
                    countries={[]}
                    isLoading={false}
                    isError
                    search=""
                    region="All"
                />
            </MemoryRouter>,
    );
    expect(screen.getByText(/Error loading countries/i)).toBeInTheDocument();
  });
});
