import { User } from '@prisma/client';
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
  } = useQuery<Omit<User, 'password'>>({
    queryKey: ['user', userId],
    queryFn: fetchUser,
  });

  return { user, isLoading, isFetching };
};
