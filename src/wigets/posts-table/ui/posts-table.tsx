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
import { Prisma } from '@prisma/client';
import { useMediaQuery } from '@/shared/lib/use-media-query';

interface PostsTableProps {
  category: string;
}

type PostSummary = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    category: true;
    imageUrls: true;
    createdAt: true;
    viewCount: true;
    _count: {
      select: {
        comments: true;
      };
    };
    author: {
      select: {
        nickname: true;
      };
    };
  };
}>;

export const PostsTable = ({ category }: PostsTableProps) => {
  const { searchTerm, setSearchTerm } = useSearchTermStore();
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const { posts, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePostInfiniteQuery<PostSummary>({ category, limit: 10, searchTerm });

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
        {!isTablet && (
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-center text-nowrap">제목</TableHead>
              <TableHead className="text-center text-nowrap">작성자</TableHead>
              <TableHead className="text-center text-nowrap">생성일</TableHead>
              <TableHead className="text-center text-nowrap">조회</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {posts?.pages.map((page) =>
            page.posts.map((post) => (
              <PostTableRow
                key={post.id}
                post={post}
                gender={post.category.split(/(?=[A-Z])/)[0]}
                board={
                  post.category
                    .split(/(?=[A-Z])/)
                    .map((word) => word.toLowerCase())[1]
                }
                isTablet={isTablet}
              />
            ))
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
