'use client';

import { usePostInfiniteQuery } from '@/entities/post';
import { useIntersectionObserver } from '../lib/use-intersection-observer';
import { SkeletonTodayFitCard } from './skeleton-today-fit-card';
import { TodayFitCard } from './today-fit-card';
import { BeatLoader } from 'react-spinners';

export const TodayFitCardList = () => {
  const { posts, isLoading, isFetching, hasNextPage, fetchNextPage } =
    usePostInfiniteQuery({ limit: 6, category: 'todayFit' });

  const observeTargetRef = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonTodayFitCard key={index} />
        ))}
      </section>
    );
  }

  return (
    <>
      <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
        {posts?.pages.map((page) =>
          page.posts.map((post) => (
            <TodayFitCard
              key={post._id as string}
              postId={post._id as string}
              {...post}
            />
          ))
        )}
      </section>
      {isFetching ? (
        <div className="flex justify-center items-center">
          <BeatLoader size={15} color="black" />
        </div>
      ) : (
        <div ref={observeTargetRef} className="h-5" />
      )}
    </>
  );
};
