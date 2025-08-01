import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Controls from '@/features/countries/components/Controls';

describe('Controls', () => {
  const setup = () => {
    const props = {
      search: 'ban',
      onSearchChange: vi.fn(),
      region: 'Asia',
      onRegionChange: vi.fn(),
      regions: ['All', 'Asia', 'Europe'],
      darkMode: false,
      toggleDarkMode: vi.fn(),
    };
    render(<Controls {...props} />);
    return props;
  };

  it('renders and toggles theme', () => {
    const { toggleDarkMode } = setup();
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(toggleDarkMode).toHaveBeenCalled();
  });

  it('clears filters', () => {
    const { onSearchChange, onRegionChange } = setup();
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);
    expect(onSearchChange).toHaveBeenCalled();
    expect(onRegionChange).toHaveBeenCalled();
  });
});
