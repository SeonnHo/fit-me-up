import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseLikePostProps {
  userId: string;
  postId: string;
  isLike: boolean;
  category: string;
}

export const useLikePost = () => {
  const queryClient = useQueryClient();

  const addPostLikeCount = async ({
    userId,
    postId,
    isLike,
  }: UseLikePostProps) => {
    const body = JSON.stringify({
      userId,
      postId,
      isLike,
    });
    const res = await fetch('/api/post/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: addPostLikeCount,
    onSuccess: (_, { postId, category }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', category, postId] });
    },
  });

  return { mutate };
};
