import { CommentForm } from '@/features/update-comment';
import { CommentList } from '@/wigets/comment-card';
import { useSession } from 'next-auth/react';

interface PostFooterProps {
  postId: string;
  category: string;
}

export const PostFooter = ({ postId, category }: PostFooterProps) => {
  const { data: session } = useSession();

  return (
    <section className="p-4 flex flex-col space-y-4">
      <CommentForm
        userId={session?.user.id}
        postId={postId}
        category={category}
      />
      <CommentList session={session} postId={postId} category={category} />
    </section>
  );
};
