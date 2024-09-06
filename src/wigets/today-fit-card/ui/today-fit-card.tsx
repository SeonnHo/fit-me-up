'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { TodayFitImage } from './today-fit-image';
import { dateFormatter } from '@/shared/lib/date-formatter';
import { PostLikeButton } from '@/features/like-post';
import { FaRegComment } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useCommentModalStore } from '@/shared/model/comment-modal-store';
import { useSession } from 'next-auth/react';

interface TodayFitCardProps {
  postId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  imageUrls: string[];
  likes: {
    userId: string;
  }[];
  _count: {
    comments: number;
    likes: number;
  };
  fashionInfo: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo: {
    gender: string;
    height: string;
    weight: string;
  } | null;
  authorId: string;
  author: {
    nickname: string;
    profileImageUrl: string | null;
  };
}

export const TodayFitCard = ({
  postId,
  category,
  createdAt,
  content,
  imageUrls,
  likes,
  _count,
  fashionInfo,
  bodyInfo,
  authorId,
  author,
}: TodayFitCardProps) => {
  const { data: session } = useSession();
  const [isLike, setIsLike] = useState(false);
  const { onOpen } = useCommentModalStore();

  useEffect(() => {
    if (session && likes.some((value) => session.user.id === value.userId)) {
      setIsLike(true);
    }
  }, [likes, session]);

  return (
    <Card className="w-[400px] max-sm:w-full max-sm:rounded-none max-sm:border-y max-sm:border-x-0">
      <CardHeader className="p-3 flex flex-row justify-between items-center space-y-0">
        <div className="flex space-x-2 items-center">
          <Avatar>
            <AvatarImage src={author.profileImageUrl!} alt="프로필 이미지" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <CardTitle className="text-base line-clamp-1">
            {author.nickname}
          </CardTitle>
        </div>
        <CardDescription>{dateFormatter(createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-0">
        <div className="relative w-full h-[500px]">
          <TodayFitImage
            image={process.env.NEXT_PUBLIC_TODAY_FIT_URL + imageUrls[0]}
            fashionInfo={fashionInfo}
            bodyInfo={bodyInfo!}
          />
        </div>
        <div className="flex px-3">
          <div className="flex items-center space-x-1">
            <PostLikeButton
              userId={authorId}
              postId={postId}
              category={category}
              isLike={isLike}
              callbackFn={() => setIsLike((prev) => !prev)}
            />
            <p className="text-sm">{_count.likes}</p>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <FaRegComment
              className="size-6 cursor-pointer"
              onClick={() => onOpen(postId, category)}
            />
            <p className="text-sm">{_count.comments}</p>
          </div>
        </div>
        <div className="flex px-3 pb-3">
          <p className="w-full line-clamp-3 text-sm break-all">
            <b>{author.nickname}</b> {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
