'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { FaTableCells } from 'react-icons/fa6';
import { CgFeed } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';
import { TodayFitFeed } from './today-fit-feed';
import { useSpecificUserPostInfiniteQuery } from '@/entities/post';
import { useSession } from 'next-auth/react';
import { SkeletonActivityTabs } from './skeleton-activity-tabs';

export const ActivityTabs = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSpecificUserPostInfiniteQuery({
      limit: 9,
      userId: session?.user.id!,
      category: 'todayFit',
    });

  if (status === 'loading') {
    return <SkeletonActivityTabs />;
  }

  return (
    <section className="">
      <Tabs defaultValue="todayFit" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="todayFit">
            <FaTableCells className="size-6" />
          </TabsTrigger>
          <TabsTrigger value="community">
            <CgFeed className="size-6" />
          </TabsTrigger>
          <TabsTrigger value="likePost">
            <FaRegHeart className="size-6" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="todayFit">
          {data?.pages.map((page) => (
            <TodayFitFeed key={page.page} posts={page.posts} />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};
