import { useQuery } from '@tanstack/react-query';
import { Comment } from '../lib/comment-interface';

export const useCommentQuery = (postId: string) => {
  const fetchComments = async () => {
    const res = await fetch(`/api/comment?boardId=${postId}`, {
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
