import type { ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface WidgetWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component for widgets in the grid
 * Provides consistent styling and card appearance
 */
export function WidgetWrapper({ children, className }: WidgetWrapperProps) {
  return (
    <div
      className={cn(
        'h-full w-full overflow-hidden rounded-lg border bg-card shadow-sm',
        'transition-shadow duration-200',
        'hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}
