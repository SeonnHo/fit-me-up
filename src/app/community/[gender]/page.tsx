import { SearchInput } from '@/features/search';
import { PostsTable } from '@/wigets/posts-table';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaRegEdit } from 'react-icons/fa';

interface Props {
  params: {
    gender: string;
  };
}
export default function GenderPage({ params }: Props) {
  if (!(params.gender === 'male' || params.gender === 'female')) redirect('/');

  return (
    <main className="flex flex-col space-y-2">
      <div className="flex justify-end items-center space-x-2">
        <SearchInput />
        <Link
          href="/community/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 shrink-0"
        >
          <FaRegEdit className="size-5" />
        </Link>
      </div>
      <PostsTable category={params.gender} />
    </main>
  );
}
