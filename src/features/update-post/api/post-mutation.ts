import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePostMutaionProps {
  files: File[];
  category: string;
  title: string | undefined;
  content: string;
  userId: string;
  bodyInfo?: {
    gender?: 'male' | 'female';
    height?: number;
    weight?: number;
  };
  fashionInfo: {
    section: string;
    info: string;
    size: string;
  }[];
}

export const usePostMutaion = () => {
  const queryClient = useQueryClient();
  const updatePost = async ({
    files,
    category,
    title,
    content,
    userId,
    bodyInfo,
    fashionInfo,
  }: UsePostMutaionProps) => {
    const sendData = new FormData();

    for (const file of files) {
      sendData.append('files', file);
    }

    const body =
      category !== 'todayFit'
        ? {
            category,
            title,
            content,
            userId,
          }
        : {
            category,
            content,
            userId,
            fashionInfo,
            bodyInfo,
          };

    sendData.append(
      'body',
      new Blob([JSON.stringify(body)], { type: 'application/json' })
    );

    const res = await fetch('/api/post', {
      method: 'POST',
      body: sendData,
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: (_, { category }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', category] });
    },
  });

  return { mutate };
};
