import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonActivityTabs = () => {
  return (
    <section>
      <Skeleton className="w-[600px] h-11" />
      <div className="grid grid-cols-3 gap-0.5 mt-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px]" />
        ))}
      </div>
    </section>
  );
};
