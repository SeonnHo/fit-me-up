import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonTable = () => {
  return (
    <div className="w-[500px] h-[400px] flex flex-col justify-center items-center space-y-4">
      <Skeleton className="w-[300px] h-[50px]" />
      <Skeleton className="w-[300px] h-[50px]" />
      <Skeleton className="w-[300px] h-[50px]" />
      <Skeleton className="w-[300px] h-[50px]" />
    </div>
  );
};
