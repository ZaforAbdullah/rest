import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Controls from '@/features/countries/components/Controls'

describe('Controls Component', () => {
  const setup = (overrides = {}) => {
    const props = {
      search: 'ban',
      onSearchChange: vi.fn(),
      region: 'Asia',
      onRegionChange: vi.fn(),
      regions: ['All', 'Asia', 'Europe'],
      darkMode: false,
      toggleDarkMode: vi.fn(),
      ...overrides,
    }

    render(<Controls {...props} />)
    return props
  }

  it('renders title and dark mode toggle', () => {
    setup()
    expect(screen.getByText('Where in the world?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('calls toggleDarkMode when theme button clicked', () => {
    const { toggleDarkMode } = setup()
    const button = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(button)
    expect(toggleDarkMode).toHaveBeenCalled()
  })

  it('calls onSearchChange and onRegionChange when clear filters clicked', () => {
    const { onSearchChange, onRegionChange } = setup()
    const clearButton = screen.getByRole('button', { name: /clear filters/i })
    fireEvent.click(clearButton)
    expect(onSearchChange).toHaveBeenCalled()
    expect(onRegionChange).toHaveBeenCalled()
  })
})
