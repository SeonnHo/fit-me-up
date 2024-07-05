import SearchBar from '@/components/search-bar/search-bar';
import FitCardList from './_components/fit-card-list';

export default function TodayFitPage() {
  return (
    <main className="flex flex-col max-sm:w-full">
      <section className="max-sm:p-2 py-2">
        <SearchBar placeholder="오늘의 핏 게시글 검색..." />
      </section>
      <FitCardList />
    </main>
  );
}
