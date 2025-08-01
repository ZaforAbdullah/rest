// src/features/countries/components/Pagination.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = React.memo(function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = React.useCallback(() => {
    onPageChange((prev) => Math.max(prev - 1, 1));
  }, [onPageChange]);

  const handleNext = React.useCallback(() => {
    onPageChange((prev) => Math.min(prev + 1, totalPages));
  }, [onPageChange, totalPages]);

  return (
        <div className="flex justify-center mt-6 gap-4 items-center flex-wrap">
            <Button onClick={handlePrev} disabled={page === 1} variant="secondary">
                Prev
            </Button>
            <span className="text-sm font-medium dark:text-white">
                Page {page} of {totalPages}
            </span>
            <Button onClick={handleNext} disabled={page === totalPages} variant="secondary">
                Next
            </Button>
        </div>
  );
});

export default Pagination;
