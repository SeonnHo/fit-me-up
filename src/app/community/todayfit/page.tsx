import { SearchInput } from '@/features/search';
import { CommentModal } from '@/wigets/comment-card';
import { TodayFitCardList } from '@/wigets/today-fit-card';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

export const metadata: Metadata = {
  title: '핏미업 - 오늘의 핏',
  description: '오늘의 룩을 올려 다른 사람에게 나의 핏을 자랑하세요!',
};

export default function TodayFitPage() {
  return (
    <main className="flex flex-col max-sm:w-full">
      <section className="flex justify-end max-sm:justify-center items-center mb-4 space-x-2 max-sm:px-2">
        <SearchInput />
        <Link
          href="/community/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 shrink-0"
        >
          <FaRegEdit className="size-5" />
        </Link>
      </section>
      <TodayFitCardList />
      <CommentModal />
    </main>
  );
}
