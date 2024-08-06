'use client';

import { useQuery } from '@tanstack/react-query';
import FitCard from './fit-card';
import { Board } from '@/interfaces/board';
import { ObjectId } from 'mongodb';
import { BeatLoader } from 'react-spinners';

interface TodayFitBoard extends Omit<Board, 'user' | 'fitInfo'> {
  _id: string;
  user: {
    _id: string | ObjectId;
    nickname: string;
  };
  fitInfo: {
    section: string;
    info: string;
  }[];
}

export default function FitCardList() {
  const { data, isLoading } = useQuery<TodayFitBoard[]>({
    queryKey: ['boards', 'todayFit'],
    queryFn: async () => {
      const data = await fetch('/api/board?category=todayFit', {
        method: 'GET',
      }).then((res) => res.json());
      return data;
    },
  });

  if (isLoading)
    return (
      <section className="flex justify-center items-center xl:w-[1232px] lg:w-[816px] md:w-[400px]">
        <BeatLoader color="black" size={15} className="py-4" />
      </section>
    );

  return (
    <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
      {data!.map((item) => (
        <FitCard key={item._id as string} {...item} />
      ))}
    </section>
  );
}
