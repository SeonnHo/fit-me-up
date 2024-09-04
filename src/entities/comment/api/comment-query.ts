import { Comment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

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
  } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: fetchComments,
  });

  return { comments, isLoading, isFetching };
};
