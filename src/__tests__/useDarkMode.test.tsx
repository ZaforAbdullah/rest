import { renderHook, act } from '@testing-library/react';
import useDarkMode from '@/hooks/useDarkMode';

describe('useDarkMode hook', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('initializes from localStorage', () => {
        localStorage.setItem('darkMode', 'true');
        const { result } = renderHook(() => useDarkMode());
        const [darkMode] = result.current;
        expect(darkMode).toBe(true);
    });

    it('toggles dark mode and updates localStorage', () => {
        const { result } = renderHook(() => useDarkMode());
        const [initial, setDarkMode] = result.current;
        expect(initial).toBe(false);

        act(() => setDarkMode(true));
        const [updated] = result.current;
        expect(updated).toBe(true);
        expect(localStorage.getItem('darkMode')).toBe('true');
    });
});
