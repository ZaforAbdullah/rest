import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// Create Query Client
const queryClient = new QueryClient();

// Fetch Function
const fetchCountries = async () => {
    const response = await axios.get(
        'https://restcountries.com/v3.1/independent?fields=name,population,region,capital,flags'
    );
    return response.data;
};

// Card Layout for Each Country
function CountryList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['independentCountries'],
        queryFn: fetchCountries,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading countries.</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {data.map((country, index) => (
                <div
                    key={index}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '1rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                    }}
                >
                    <img
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '0.75rem' }}
                    />
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        <strong>{country.name.common}</strong>
                    </h3>
                    <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'No capital'}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

// Main App Component
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Independent Countries</h1>
            <CountryList />
        </QueryClientProvider>
    );
}
