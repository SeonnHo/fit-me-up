import { useUserQuery } from '@/entities/user';
import { dateFormatter } from '@/shared/lib/date-formatter';
import { cn } from '@/shared/lib/tailwind-merge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Session } from 'next-auth';
import { SkeletonCommentItem } from './skeleton-comment-item';
import {
  DeleteCommentButton,
  ModifyCommentButton,
  ReplyButton,
} from '@/features/update-comment';

interface CommentItemProps {
  className?: string;
  commentId: string;
  userId: string;
  content: string;
  createAt: Date;
  mentionedUser?: string;
  session: Session | null;
}

export const CommentItem = ({
  className,
  commentId,
  userId,
  content,
  createAt,
  mentionedUser,
  session,
}: CommentItemProps) => {
  const { user, isLoading, isFetching } = useUserQuery(userId);

  if (isLoading || isFetching) {
    return <SkeletonCommentItem />;
  }

  return (
    <li
      className={cn(
        'flex space-x-2 items-start border-y py-2 [&:first-child~li]:border-t-0',
        className
      )}
    >
      <Avatar>
        <AvatarImage src={String(user?.image)} alt="프로필 이미지" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col items-start space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <p className="text-sm font-bold">{user?.nickname}</p>
            <p className="text-xs text-zinc-400">{dateFormatter(createAt)}</p>
          </div>
          {session && session.user.nickname === user?.nickname && (
            <div className="flex space-x-2 items-center">
              <ModifyCommentButton />
              <DeleteCommentButton />
            </div>
          )}
        </div>
        {mentionedUser ? (
          <p className="text-sm">
            <b>@{mentionedUser}</b> {content}
          </p>
        ) : (
          <p className="text-sm">{content}</p>
        )}
        <ReplyButton commentId={commentId} user={user!} session={session} />
      </div>
    </li>
  );
};
