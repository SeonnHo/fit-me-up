import { cn } from '@/shared/lib/tailwind-merge';
import * as React from 'react';

export const NavigationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('p-2', className)} {...props} />
));

NavigationItem.displayName = 'NavigationItem';
