// src/features/countries/components/__tests__/SkeletonCard.test.tsx
import { render, screen } from '@testing-library/react'
import SkeletonCard from '@/features/countries/components/SkeletonCard'

describe('SkeletonCard', () => {
  it('renders loading skeleton', () => {
    render(<SkeletonCard />)
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument()
  })
})
