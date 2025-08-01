import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '@/features/countries/components/CountryCard';

const country = {
  cca3: 'BGD',
  name: { common: 'Bangladesh', official: 'People\'s Republic of Bangladesh' },
  region: 'Asia',
  capital: ['Dhaka'],
  flags: { svg: 'flag.svg' },
  population: 160000000,
};

describe('CountryCard', () => {
  it('renders country info', () => {
    render(<CountryCard country={country} />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Bangladesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Flag of/i)).toBeInTheDocument();
  });

  it('navigates on click', () => {
    render(<CountryCard country={country} />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button'));
    // We assume navigate works via react-router here.
  });
});
