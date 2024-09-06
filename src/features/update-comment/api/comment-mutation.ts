import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseCommentMutationProps {
  commentId: string;
  userId: string;
  postId: string;
  content: string;
  mentionedUserId: string;
  mentioningUserId: string;
  category: string;
}

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const addComment = async ({
    commentId,
    userId,
    postId,
    content,
    mentionedUserId,
    mentioningUserId,
  }: UseCommentMutationProps) => {
    const res = await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId: commentId,
        userId: userId,
        postId: postId,
        content: content,
        mentionedUserId,
        mentioningUserId,
      }),
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: (_, { postId, category }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({
        queryKey: ['posts', category],
      });
    },
  });

  return { mutate };
};
