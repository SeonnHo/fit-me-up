import { cn } from '@/shared/lib/tailwind-merge';
import * as React from 'react';

export const NavigationGroup = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('p-2', className)} {...props} />
));

NavigationGroup.displayName = 'NavigationGroup';
