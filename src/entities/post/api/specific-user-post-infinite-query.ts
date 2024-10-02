import { Post, Prisma } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseSpecificUserPostInfiniteQueryProps {
  limit: number;
  userId: string;
  category: string;
}

type UserPost = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

interface UseSpecificUserPostInfiniteQueryResponse {
  posts: UserPost[];
  page: number;
  next: boolean | null;
}

export const useSpecificUserPostInfiniteQuery = ({
  limit,
  userId,
  category,
}: UseSpecificUserPostInfiniteQueryProps) => {
  const fetchPost = async ({ pageParam }: { pageParam: unknown }) => {
    const res = await fetch(
      `/api/post/list/specific-user?limit=${limit}&page=${pageParam}&userId=${userId}&category=${category}`,
      {
        method: 'GET',
      }
    );

    return res.json();
  };

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<UseSpecificUserPostInfiniteQueryResponse>({
    queryKey: ['posts', category, userId],
    queryFn: fetchPost,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.next !== null ? Number(lastPage.page) + 1 : undefined,
  });

  return {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
