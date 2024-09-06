import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const commentWithAuthor = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    author: {
      select: {
        nickname: true,
      },
    },
  },
});

type CommentWithAuthor = Prisma.CommentGetPayload<typeof commentWithAuthor>;

export const useCommentQuery = (postId: string) => {
  const fetchComments = async () => {
    const res = await fetch(`/api/comment?postId=${postId}`, {
      method: 'GET',
    });

    return res.json();
  };

  const {
    data: comments,
    isLoading,
    isFetching,
  } = useQuery<CommentWithAuthor[]>({
    queryKey: ['comments', postId],
    queryFn: fetchComments,
  });

  return { comments, isLoading, isFetching };
};
