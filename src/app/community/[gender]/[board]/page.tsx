import { SearchInput } from '@/features/search';
import { PostsTable } from '@/wigets/posts-table';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

interface Props {
  params: {
    gender: string;
    board: string;
  };
}

export default async function BoardPage({ params }: Props) {
  const category =
    params.gender +
    params.board.charAt(0).toUpperCase() +
    params.board.slice(1);

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
      <PostsTable
        category={category}
        gender={params.gender}
        board={params.board}
      />
    </main>
  );
}
