import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLikePost } from '../api/like-post';
import { toast } from '@/shared/ui/use-toast';

interface PostListButtonProps {
  userId?: string;
  postId: string;
  category: string;
  isLike: boolean;
  callbackFn: () => void;
}

export const PostLikeButton = ({
  userId,
  postId,
  category,
  isLike,
  callbackFn,
}: PostListButtonProps) => {
  const { mutate } = useLikePost();

  const handleClick = () => {
    if (!userId) {
      toast({
        title: '로그인 필요',
        description: '로그인 후 이용 가능합니다.',
      });
      return;
    }

    mutate(
      { userId, postId, category, isLike: !isLike },
      {
        onError: (error) => {
          toast({
            title: '에러 발생',
            description: error.message,
          });
        },
      }
    );
    callbackFn();
  };

  if (isLike) {
    return (
      <FaHeart
        className="size-6 text-red-500 cursor-pointer animate-heart-race"
        onClick={handleClick}
      />
    );
  } else {
    return (
      <FaRegHeart className="size-6 cursor-pointer" onClick={handleClick} />
    );
  }
};
