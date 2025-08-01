import { renderHook, act } from '@testing-library/react';
import useDarkMode from '@/hooks/useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => localStorage.clear());

  it('initializes correctly from localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(true);
  });

  it('toggles darkMode and updates localStorage', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
  });
});
