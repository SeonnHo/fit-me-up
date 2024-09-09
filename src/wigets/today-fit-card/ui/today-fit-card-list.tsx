'use client';

import { usePostInfiniteQuery } from '@/entities/post';
import { useIntersectionObserver } from '../lib/use-intersection-observer';
import { SkeletonTodayFitCard } from './skeleton-today-fit-card';
import { TodayFitCard } from './today-fit-card';
import { BeatLoader } from 'react-spinners';
import { useSearchTermStore } from '@/features/search';

export const TodayFitCardList = () => {
  const { searchTerm } = useSearchTermStore();

  const { posts, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePostInfiniteQuery({ limit: 6, category: 'todayFit', searchTerm });

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
      {posts && !posts.pages[0].posts.length ? (
        <section className="flex justify-center items-center xl:w-[1232px] lg:w-[816px] sm:w-[400px] w-full h-[600px]">
          <p className="font-bold">해당 사용자의 게시물을 찾을 수 없습니다.</p>
        </section>
      ) : (
        <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
          {posts &&
            posts.pages.map((page) =>
              page.posts.map((post) => (
                <TodayFitCard key={post.id} postId={post.id} {...post} />
              ))
            )}
        </section>
      )}

      {isFetchingNextPage ? (
        <div className="flex justify-center items-center">
          <BeatLoader size={15} color="black" />
        </div>
      ) : (
        <div ref={observeTargetRef} className="h-5" />
      )}
    </>
  );
};
