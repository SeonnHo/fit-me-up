import { useQuery } from '@tanstack/react-query';
import { User } from '../lib/user-interface';

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
  } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: fetchUser,
  });

  return { user, isLoading, isFetching };
};
