import { useEffect, useState } from 'react';
import { PostImageCarousel } from './post-image-carousel';
import { useSession } from 'next-auth/react';
import { PostLikeButton } from '@/features/like-post';
import { FaRegComment } from 'react-icons/fa';

interface PostContentProps {
  postId: string;
  category: string;
  content: string;
  imageUrls: string[];
  likes: {
    userId: string;
  }[];
  count: {
    comments: number;
    likes: number;
  };
}

export const PostContent = ({
  postId,
  category,
  content,
  imageUrls,
  likes,
  count,
}: PostContentProps) => {
  const { data: session } = useSession();
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (session && likes.some((value) => session.user.id === value.userId)) {
      setIsLike(true);
    }
  }, [likes, session]);

  return (
    <section className="flex flex-col justify-between space-y-4 p-4 border-b min-h-[400px]">
      <div className="flex flex-col space-y-4">
        {imageUrls.length > 0 && <PostImageCarousel imageUrls={imageUrls} />}
        <p className="break-all text-sm">{content}</p>
      </div>

      <div className="flex justify-start items-center space-x-5">
        <div className="flex items-center space-x-2">
          <PostLikeButton
            userId={session && session.user.id ? session.user.id : undefined}
            postId={postId}
            category={category}
            isLike={isLike}
            callbackFn={() => setIsLike((prev) => !prev)}
          />
          <span className="text-sm">{count.likes}</span>
        </div>

        <div className="flex items-center space-x-2">
          <FaRegComment className="size-6" />
          <span className="text-sm">{count.comments}</span>
        </div>
      </div>
    </section>
  );
};
