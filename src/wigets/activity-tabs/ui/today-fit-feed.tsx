'use client';

import { Prisma } from '@prisma/client';
import Image from 'next/image';

type UserPost = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

interface TodayFitFeedProps {
  posts: UserPost[];
}

export const TodayFitFeed = ({ posts }: TodayFitFeedProps) => {
  return (
    <div className="grid w-full grid-cols-3 gap-0.5">
      {posts.map((post, index) => (
        <div
          className="relative w-full h-[200px] cursor-pointer text-black"
          key={post.id}
        >
          <div className="absolute z-[1] w-full h-full hover:bg-muted/50" />
          <Image
            src={process.env.NEXT_PUBLIC_TODAY_FIT_URL + post.imageUrls[0]}
            alt={`게시물 이미지 ${index}`}
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
