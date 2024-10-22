import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export const SkeletonProfileCard = () => {
  return (
    <section className="max-md:w-screen max-md:px-2">
      <Card className="md:w-[600px] w-full max-md:border-none max-md:shadow-none">
        <CardContent className="p-6 max-md:p-3 flex flex-col items-start justify-center space-y-4">
          <div className="w-full flex justify-evenly items-center">
            <div className="flex flex-col items-center space-y-2">
              <Skeleton className="w-20 h-20 max-md:w-14 max-md:h-14 rounded-full" />
              <Skeleton className="rounded h-6 w-14" />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-10 h-5" />
            </div>

            <div className="flex flex-col items-center space-y-1">
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-24 h-5" />
            </div>

            <div className="flex flex-col items-center space-y-1">
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-14 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
