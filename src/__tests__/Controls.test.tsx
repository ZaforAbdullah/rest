import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Controls from '@/features/countries/components/Controls';

describe('Controls Component', () => {
  it('renders title and dark mode toggle', () => {
    const mockToggleDarkMode = vi.fn();
    render(
            <Controls
                search=""
                onSearchChange={() => { }}
                region="All"
                onRegionChange={() => { }}
                regions={['All', 'Asia', 'Europe']}
                darkMode={false}
                toggleDarkMode={mockToggleDarkMode}
            />,
    );

    expect(screen.getByText('Where in the world?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('calls toggleDarkMode when theme button clicked', () => {
    const mockToggleDarkMode = vi.fn();
    render(
            <Controls
                search=""
                onSearchChange={() => { }}
                region="All"
                onRegionChange={() => { }}
                regions={['All', 'Asia']}
                darkMode={false}
                toggleDarkMode={mockToggleDarkMode}
            />,
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });
});
