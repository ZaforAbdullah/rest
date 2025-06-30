// src/components/Pagination.jsx
import React from 'react';
import { Button } from './ui/button';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className="flex justify-center mt-6 gap-4 items-center flex-wrap">
            <Button
                onClick={onPrev}
                disabled={page === 1}
                variant="secondary"
            >
                Prev
            </Button>
            <span className="text-sm font-medium dark:text-white">
                Page {page} of {totalPages}
            </span>
            <Button
                onClick={onNext}
                disabled={page === totalPages}
                variant="secondary"
            >
                Next
            </Button>
        </div>
    );
}
