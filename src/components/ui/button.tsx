// Need review before using
// src/components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'secondary';
    size?: 'default' | 'sm' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                    variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
                    variant === 'outline' && 'border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
                    variant === 'secondary' && 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
                    size === 'default' && 'h-10 px-4 py-2',
                    size === 'sm' && 'h-8 px-3',
                    size === 'icon' && 'h-10 w-10',
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';