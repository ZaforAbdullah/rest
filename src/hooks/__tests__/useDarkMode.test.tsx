import { renderHook, act } from '@testing-library/react'
import useDarkMode from '@/hooks/useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => localStorage.clear())

  it('initializes correctly from localStorage', () => {
    localStorage.setItem('darkMode', 'true')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(true)
  })

  it('toggles darkMode and updates localStorage', () => {
    const { result } = renderHook(() => useDarkMode())
    act(() => result.current[1](true))
    expect(result.current[0]).toBe(true)
    expect(localStorage.getItem('darkMode')).toBe('true')
  })

  it('initializes as false if localStorage is set to false', () => {
    localStorage.setItem('darkMode', 'false')
    const { result } = renderHook(() => useDarkMode())
    const [darkMode] = result.current
    expect(darkMode).toBe(false)
  })

  it('defaults to false when localStorage key is missing', () => {
    const { result } = renderHook(() => useDarkMode())
    const [darkMode] = result.current
    expect(darkMode).toBe(false)
  })
})
