import { fetchCountries, fetchCountryByCode } from '@/features/countries/api';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('countries API', () => {
  afterEach(() => vi.resetAllMocks());

  it('fetchCountries returns data', async () => {
    mockedAxios.get.mockResolvedValue({ data: [{ name: { common: 'Bangladesh', official: 'People\'s Republic of Bangladesh' }, population: 1, region: 'Asia', flags: { svg: 'flag.svg' }, cca3: 'BGD' }] });
    const countries = await fetchCountries();
    expect(countries[0].name.common).toBe('Bangladesh');
  });

  it('fetchCountryByCode returns data', async () => {
    mockedAxios.get.mockResolvedValue({ data: [{ name: { common: 'Bangladesh', official: 'People\'s Republic of Bangladesh' }, cca3: 'BGD' }] });
    const country = await fetchCountryByCode('BGD');
    expect(country.name.common).toBe('Bangladesh');
  });
});
