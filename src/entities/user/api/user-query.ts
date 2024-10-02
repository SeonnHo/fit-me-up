import { Prisma, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = (userId: string) => {
  const fetchUser = async () => {
    const res = await fetch(`/api/user?userId=${userId}`, {
      method: 'GET',
    });

    return res.json();
  };

  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery<
    Prisma.UserGetPayload<{
      select: {
        id: true;
        email: true;
        nickname: true;
        profileImageUrl: true;
        createdAt: true;
        posts: true;
        likePosts: true;
        comments: true;
      };
    }>
  >({
    queryKey: ['user', userId],
    queryFn: fetchUser,
  });

  return { user, isLoading, isFetching };
};
