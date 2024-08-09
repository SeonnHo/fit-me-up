'use client';

import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import FitCard from './fit-card';
import { Board } from '@/interfaces/board';
import { ObjectId } from 'mongodb';
import { BeatLoader } from 'react-spinners';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface TodayFitBoard extends Omit<Board, 'user' | 'fitInfo'> {
  _id: string;
  user: {
    _id: string | ObjectId;
    nickname: string;
  };
  fitInfo: {
    section: string;
    info: string;
    size: string;
  }[];
}

interface TodayFitBoardResponse {
  boards: TodayFitBoard[];
  page: number;
  next: boolean | null;
}

export default function FitCardList() {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<TodayFitBoardResponse>({
      queryKey: ['boards', 'todayFit'],
      queryFn: async ({ pageParam }) => {
        const data = await fetch(
          `/api/board?category=todayFit&page=${pageParam}&limit=${6}`,
          {
            method: 'GET',
          }
        ).then((res) => res.json());
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.next !== null ? Number(lastPage.page) + 1 : undefined,
    });

  const observeTargetRef = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading)
    return (
      <section className="flex justify-center items-center xl:w-[1232px] lg:w-[816px] md:w-[400px]">
        <BeatLoader color="black" size={15} className="py-4" />
      </section>
    );

  return (
    <>
      <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
        {data!.pages.flatMap((page) =>
          page.boards.flatMap((item) => (
            <FitCard key={item._id as string} {...item} />
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
}
