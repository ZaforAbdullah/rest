// src/features/countries/components/CountryCard.tsx
import React, { useMemo } from 'react'
import type { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import type { Country } from '@/features/countries/types'

interface CountryCardProps {
  country: Country
  search?: string
}

const highlightMatch = (text: string, query: string): (string | JSX.Element)[] => {
  if (!query) return [text]
  const regex = new RegExp(`(${query})`, 'ig')
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-600 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

const CountryCard = React.memo(function CountryCard({
  country,
  search = '',
}: CountryCardProps): React.ReactElement {
  const navigate = useNavigate()
  const populationText = useMemo(() => country.population.toLocaleString(), [country.population])

  const handleClick = () => navigate(`/country/${country.cca3}`)

  return (
    <Card
      data-testid={`country-card-${country.cca3}`}
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      className="cursor-pointer overflow-hidden hover:shadow-md transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-ring/70 p-0"
      aria-label={`View details for ${country.name.official}`}
    >
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.official}`}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <CardContent className="pt-4 pb-6 px-4">
        <h2 className="font-bold text-lg mb-2 text-foreground">
          {highlightMatch(country.name.official, search)}
        </h2>
        <p className="text-sm text-muted-foreground space-y-1">
          <span className="block">
            <strong>Region:</strong> {country.region}
          </span>
          <span className="block">
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
          </span>
          <span className="block">
            <strong>Population:</strong> {populationText}
          </span>
        </p>
      </CardContent>
    </Card>
  )
})

export default CountryCard
