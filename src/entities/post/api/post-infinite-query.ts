import { useInfiniteQuery } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';

interface UsePostInfiniteQueryProps {
  limit: number;
  category: string;
  searchTerm: string;
}

const postWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: {
      select: {
        nickname: true,
        profileImageUrl: true,
      },
    },
    likes: {
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        comments: true,
        likes: true,
      },
    },
  },
});

type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;

interface UsePostInfiniteQueryResponse {
  posts: Required<PostWithAuthor>[];
  page: number;
  next: boolean | null;
}

export const usePostInfiniteQuery = ({
  limit,
  category,
  searchTerm,
}: UsePostInfiniteQueryProps) => {
  const fetchPost = async ({ pageParam }: { pageParam: unknown }) => {
    const res = await fetch(
      `/api/post?category=${category}&page=${pageParam}&limit=${limit}&search=${encodeURIComponent(
        searchTerm
      )}`,
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<UsePostInfiniteQueryResponse>({
    queryKey: ['posts', category, searchTerm],
    queryFn: fetchPost,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.next !== null ? Number(lastPage.page) + 1 : undefined,
  });

  return {
    posts,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
