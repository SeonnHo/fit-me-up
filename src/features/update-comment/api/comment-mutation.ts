import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseCommentMutationProps {
  commentId?: string;
  parentCommentId?: string;
  userId?: string;
  postId?: string;
  content?: string;
  mentionedUserId?: string;
  mentioningUserId?: string;
  category?: string;
}

export const useCommentMutation = ({
  method,
}: {
  method: 'POST' | 'PUT' | 'DELETE';
}) => {
  const queryClient = useQueryClient();

  const updateComment = async ({
    commentId,
    parentCommentId,
    userId,
    postId,
    content,
    mentionedUserId,
    mentioningUserId,
  }: UseCommentMutationProps) => {
    const getRequestBody = (method: 'POST' | 'PUT' | 'DELETE') => {
      switch (method) {
        case 'POST':
          return JSON.stringify({
            parentCommentId,
            userId,
            postId,
            content,
            mentionedUserId,
            mentioningUserId,
          });

        case 'PUT':
          return JSON.stringify({
            commentId,
            content,
          });

        case 'DELETE':
          return JSON.stringify({
            commentId,
          });
        default:
          throw new Error('올바르지 않은 method입니다.');
      }
    };

    const res = await fetch('/api/comment', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: getRequestBody(method),
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: (_, { postId, category }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({
        queryKey: ['posts', category],
      });
    },
  });

  return { mutate };
};
