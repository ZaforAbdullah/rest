import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// Create Query Client
const queryClient = new QueryClient();

// Fetch Function
const fetchCountries = async () => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/independent?status=true&fields=name,population,region,capital,flags' // Fetching only necessary fields
  );
  return response.data;
};

// Component to display official names
function CountryList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['independentCountries'],
    queryFn: fetchCountries,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading countries.</div>;

  return (
    <div>
      <h2>Official Names of Independent Countries</h2>
      <ul>
        {data.map((country, index) => (
          <li key={index}>{country.name.official}</li>
        ))}
      </ul>
      <ul>
        {data.map((country, index) => (
          <li key={index}>{country.population}</li>
        ))}
      </ul>
      <ul>
        {data.map((country, index) => (
          <li key={index}>{country.region}</li>
        ))}
      </ul>
      <ul>
        {data.map((country, index) => (
          <li key={index}>{country.capital ? country.capital[0] : 'No capital'}</li>
        ))}
      </ul>
      <ul>
        {data.map((country, index) => (
          <li key={index}>
            <img src={country.flags.svg} alt={`Flag of ${country.flags}`} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Official Country Names (Independent Countries)</h1>
      <CountryList />
    </QueryClientProvider>
  );
}
