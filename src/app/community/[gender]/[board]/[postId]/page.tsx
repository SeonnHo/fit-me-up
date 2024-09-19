import { PostDetails } from '@/wigets/post-details';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface PostDetailsPageProps {
  params: {
    postId: string;
  };
}

export async function generateMetadata({
  params: { postId },
}: PostDetailsPageProps): Promise<Metadata> {
  const fetchPost = await fetch(
    `${process.env.NEXTAUTH_URL}/api/post?id=${postId}&view=false`
  ).then((res) => res.json());

  return {
    title: `${fetchPost.title} - 핏미업`,
    description: fetchPost.content,
  };
}

export default async function PostDetailsPage({
  params: { postId },
}: PostDetailsPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/post?id=${postId}&view=false`,
        { cache: 'no-store' }
      );

      return res.json();
    },
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetails postId={postId} />
      </HydrationBoundary>
    </main>
  );
}
