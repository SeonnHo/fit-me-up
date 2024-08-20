import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonCommentItem = () => {
  return (
    <li className="flex space-x-2 items-start py-2">
      <Skeleton className="rounded-full h-10 w-10" />
      <div className="w-full flex flex-col items-start space-y-2">
        <Skeleton className="h-[14px] w-10" />
        <Skeleton className="h-[14px] w-20" />
        <Skeleton className="h-[14px] w-5" />
      </div>
    </li>
  );
};
