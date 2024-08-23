import { TodayFitCardList } from '@/wigets/today-fit-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 오늘의 핏',
  description: '오늘의 룩을 올려 다른 사람에게 나의 핏을 자랑하세요!',
};

export default function TodayFitPage() {
  return (
    <main className="flex flex-col max-sm:w-full">
      <TodayFitCardList />
    </main>
  );
}
