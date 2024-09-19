'use client';

import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PostHeader } from './post-header';
import { PostContent } from './post-content';
import { PostFooter } from './post-footer';

interface PostDetailsProps {
  postId: string;
}

type Post = Prisma.PostGetPayload<{
  include: {
    likes: {
      select: {
        userId: true;
      };
    };
    author: {
      select: {
        nickname: true;
        profileImageUrl: true;
      };
    };
    _count: {
      select: {
        comments: true;
        likes: true;
      };
    };
  };
}>;

export const PostDetails = ({ postId }: PostDetailsProps) => {
  const { data, isLoading, isFetching } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await fetch(`/api/post?id=${postId}&view=true`);

      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col xl:w-[800px] lg:w-[700px] w-screen">
      {data ? (
        <>
          <PostHeader
            title={data.title!}
            createdAt={data.createdAt}
            author={data.author}
            authorId={data.authorId}
            viewCount={data.viewCount}
          />
          <PostContent
            postId={data.id}
            category={data.category}
            content={data.content}
            imageUrls={data.imageUrls}
            likes={data.likes}
            count={data._count}
          />
          <PostFooter postId={data.id} category={data.category} />
        </>
      ) : (
        <div></div>
      )}
    </section>
  );
};
