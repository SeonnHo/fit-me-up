import { cn } from '@/shared/lib/tailwind-merge';
import * as React from 'react';

export const Navigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow min-w-[200px]',
      className
    )}
    {...props}
  />
));

Navigation.displayName = 'Navigation';
