import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonCommentItem = () => {
  return (
    <li className="w-full flex space-x-2 items-start py-2">
      <Skeleton className="rounded-full h-10 w-10 shrink-0" />
      <div className="w-full flex flex-col items-start space-y-2">
        <Skeleton className="h-[20px] w-[100px]" />
        <Skeleton className="h-[20px] w-[200px]" />
        <Skeleton className="h-[16px] w-[50px]" />
      </div>
    </li>
  );
};
