import { useQuery } from '@tanstack/react-query';
import { Comment } from '../lib/comment-interface';

export const useCommentQuery = (boardId: string) => {
  const fetchComments = async () => {
    const res = await fetch(`/api/comment?boardId=${boardId}`, {
      method: 'GET',
    });

    return res.json();
  };

  const {
    data: comments,
    isLoading,
    isFetching,
  } = useQuery<Comment[]>({
    queryKey: ['comments', boardId],
    queryFn: fetchComments,
  });

  return { comments, isLoading, isFetching };
};
