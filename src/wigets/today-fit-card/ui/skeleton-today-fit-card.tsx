import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonTodayFitCard = () => {
  return (
    <div className="w-[400px] rounded-lg border bg-card text-card-foreground shadow-sm max-sm:w-full max-sm:rounded-none max-sm:border-y max-sm:border-x-0">
      <div className="p-3 flex flex-row justify-between items-center space-y-0">
        <div className="flex space-x-2 items-center">
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="w-10 h-6" />
        </div>
        <Skeleton className="w-16 h-6" />
      </div>

      <div className="flex flex-col space-y-2">
        <Skeleton className="w-full h-[500px]" />

        <div className="flex px-3">
          <Skeleton className="w-20 h-6" />
        </div>

        <div className="flex px-3 pb-3">
          <Skeleton className="w-28 h-5" />
        </div>
      </div>
    </div>
  );
};
