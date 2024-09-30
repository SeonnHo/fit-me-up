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

    const method = isLike ? 'POST' : 'DELETE';
    const res = await fetch('/api/post/like', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: addPostLikeCount,
    onMutate: async ({ postId, category, isLike }) => {
      if (category === 'todayFit') {
        await queryClient.cancelQueries({ queryKey: ['posts', category] });
        const previousData = queryClient.getQueryData(['posts', category]);

        queryClient.setQueryData(['posts', category], (old: any) => {
          if (!old || !old.pages || !Array.isArray(old.pages)) {
            console.error('Unexpected data structure in cache');
            return old;
          }

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: Array.isArray(page.posts)
                ? page.posts.map((post: any) =>
                    post?.id === postId
                      ? {
                          ...post,
                          _count: {
                            ...post._count,
                            likes:
                              (post._count?.likes || 0) + (isLike ? 1 : -1),
                          },
                        }
                      : post
                  )
                : [],
            })),
          };
        });

        return { previousData };
      }

      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const prevData = queryClient.getQueryData(['post', postId]);

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) {
          console.error('Unexpected data structure in cache');
          return old;
        }

        return {
          ...old,
          _count: {
            ...old._count,
            likes: (old._count?.likes || 0) + (isLike ? 1 : -1),
          },
        };
      });

      return { prevData };
    },
    onError: (err, variables, context: any) => {
      if (context?.previousData && variables.category === 'todayFit') {
        queryClient.setQueryData(
          ['posts', variables.category],
          context.previousData
        );
      }

      if (context?.prevData) {
        queryClient.setQueryData(['post', variables.postId], context.prevData);
      }
    },
    onSettled: (_, __, { category, postId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', category] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  return { mutate };
};
