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
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useCommentModalStore } from '@/shared/model/comment-modal-store';

interface TodayFitCardProps {
  postId: string;
  category: string;
  createAt: Date;
  content: string;
  images: string[];
  commentCount: number;
  likeCount: number;
  fashionInfo: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo: {
    gender: string;
    height: number;
    weight: number;
  };
  user: {
    _id: string;
    nickname: string;
    image: string;
  };
}

export const TodayFitCard = ({
  postId,
  category,
  createAt,
  content,
  images,
  commentCount,
  likeCount,
  fashionInfo,
  bodyInfo,
  user,
}: TodayFitCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const { onOpen } = useCommentModalStore();
  return (
    <Card className="w-[400px] max-sm:w-full max-sm:rounded-none max-sm:border-y max-sm:border-x-0">
      <CardHeader className="p-3 flex flex-row justify-between items-center space-y-0">
        <div className="flex space-x-2 items-center">
          <Avatar>
            <AvatarImage src={user.image} alt="프로필 이미지" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <CardTitle className="text-base line-clamp-1">
            {user.nickname}
          </CardTitle>
        </div>
        <CardDescription>{dateFormatter(createAt)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-0">
        <div className="relative w-full h-[500px]">
          <TodayFitImage
            image={
              process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_TODAY_FIT_URL + images[0]
            }
            fashionInfo={fashionInfo}
            bodyInfo={bodyInfo}
          />
        </div>
        <div className="flex px-3">
          <div className="flex items-center space-x-1">
            <PostLikeButton
              userId={user._id}
              postId={postId}
              category={category}
              isLike={isLike}
              callbackFn={() => setIsLike((prev) => !prev)}
            />
            <p className="text-sm">{likeCount}</p>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <FaRegComment
              className="size-6 cursor-pointer"
              onClick={() => onOpen(postId, category)}
            />
            <p className="text-sm">{commentCount}</p>
          </div>
        </div>
        <div className="flex px-3 pb-3">
          <p className="w-full line-clamp-3 text-sm break-all">
            <b>{user.nickname}</b> {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
