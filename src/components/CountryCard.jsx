export default function CountryCard({ country, highlight }) {
    const name = country.name.official;

    const getHighlightedName = () => {
        if (!highlight?.trim()) return name;

        const regex = new RegExp(`(${highlight})`, 'gi');
        return name.split(regex).map((part, i) =>
            regex.test(part) ? (
                <mark
                    key={i}
                    className="bg-yellow-300 dark:bg-yellow-500 text-black px-1 rounded"
                >
                    {part}
                </mark>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <div className="w-full rounded-2xl shadow-md overflow-hidden border bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-200 flex flex-col">
            <img
                src={country.flags.svg}
                alt={`Flag of ${name}`}
                className="block w-full h-32 object-cover"
            />
            <div className="p-4 space-y-1 text-sm flex-grow">
                <h2 className="text-lg font-semibold truncate" title={name}>
                    {getHighlightedName()}
                </h2>
                <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'No capital'}</p>
                <p><span className="font-semibold">Region:</span> {country.region}</p>
                <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
            </div>
        </div>
    );
}
