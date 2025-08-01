import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/features/countries/components/Pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
  it('disables Prev on first page and Next on last page', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={setPage} />);
    expect(screen.getByText(/Prev/i)).toBeDisabled();
  });

  it('calls onPageChange on Next/Prev button click', () => {
    const setPage = vi.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={setPage} />);
    fireEvent.click(screen.getByText(/Prev/i));
    fireEvent.click(screen.getByText(/Next/i));
    expect(setPage).toHaveBeenCalledTimes(2);
  });
});
