import { useInfiniteQuery } from '@tanstack/react-query';
import { TodayFitPost } from '../lib/post-interface';

interface UsePostInfiniteQueryProps {
  limit: number;
  category: string;
}

interface TodayFitPostResponse {
  posts: Required<TodayFitPost>[];
  page: number;
  next: boolean | null;
}

export const usePostInfiniteQuery = ({
  limit,
  category,
}: UsePostInfiniteQueryProps) => {
  const fetchPost = async ({ pageParam }: { pageParam: unknown }) => {
    const res = await fetch(
      `/api/post?category=${category}&page=${pageParam}&limit=${limit}`,
      {
        method: 'GET',
      }
    );

    return res.json();
  };

  const {
    data: posts,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<TodayFitPostResponse>({
    queryKey: ['posts', category],
    queryFn: fetchPost,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.next !== null ? Number(lastPage.page) + 1 : undefined,
  });

  return { posts, isLoading, isFetching, hasNextPage, fetchNextPage };
};
