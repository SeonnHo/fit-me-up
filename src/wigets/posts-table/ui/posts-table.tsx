'use client';

import { usePostInfiniteQuery } from '@/entities/post';
import { useSearchTermStore } from '@/features/search';
import { PostTableRow } from './post-table-row';
import { SkeletonTable } from './skeleton-table';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { BeatLoader } from 'react-spinners';
import { useIntersectionObserver } from '@/wigets/today-fit-card/lib/use-intersection-observer';
import { useEffect } from 'react';

interface PostsProps {
  category: string;
  limit: number;
}

export const PostsTable = ({ category, limit }: PostsProps) => {
  const { searchTerm, setSearchTerm } = useSearchTermStore();

  const { posts, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePostInfiniteQuery({ category, limit, searchTerm });

  const observeTargetRef = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [setSearchTerm]);

  if (isLoading) return <SkeletonTable />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-center">제목</TableHead>
            <TableHead className="text-center">작성자</TableHead>
            <TableHead className="text-center">생성일</TableHead>
            <TableHead className="text-center">조회수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.pages.map((page) =>
            page.posts.map((post) => <PostTableRow key={post.id} post={post} />)
          )}
        </TableBody>
      </Table>
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
