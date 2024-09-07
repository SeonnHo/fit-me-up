'use client';

import { useUserQuery } from '@/entities/user';
import { dateFormatter } from '@/shared/lib/date-formatter';
import { cn } from '@/shared/lib/tailwind-merge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Session } from 'next-auth';
import { SkeletonCommentItem } from './skeleton-comment-item';
import {
  DeleteCommentConfirmModal,
  ModifyCommentFormModal,
  ReplyButton,
} from '@/features/update-comment';

interface CommentItemProps {
  className?: string;
  postId: string;
  category: string;
  commentId: string;
  parentCommentId?: string;
  authorId: string;
  content: string;
  createdAt: Date;
  mentionedUserId?: string | null;
  mentionedUserNickname?: string;
  session: Session | null;
}

export const CommentItem = ({
  className,
  postId,
  category,
  commentId,
  parentCommentId,
  authorId,
  content,
  createdAt,
  mentionedUserId,
  mentionedUserNickname,
  session,
}: CommentItemProps) => {
  const { user, isLoading, isFetching } = useUserQuery(authorId);

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
        <AvatarImage src={user?.profileImageUrl!} alt="프로필 이미지" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col items-start space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <p className="text-sm font-bold">{user?.nickname}</p>
            <p className="text-xs text-zinc-400">{dateFormatter(createdAt)}</p>
          </div>
          {session && session.user.nickname === user?.nickname && (
            <div className="flex space-x-2 items-center">
              <ModifyCommentFormModal
                commentId={commentId}
                originalContent={content}
                postId={postId}
                category={category}
              />
              <DeleteCommentConfirmModal
                commentId={commentId}
                postId={postId}
                category={category}
                authorNickname={user?.nickname!}
                content={content}
                mentionedUserNickname={mentionedUserNickname}
              />
            </div>
          )}
        </div>
        {mentionedUserNickname ? (
          <p className="text-sm">
            <b>@{mentionedUserNickname}</b> {content}
          </p>
        ) : (
          <p className="text-sm">{content}</p>
        )}
        <ReplyButton
          commentId={parentCommentId ? parentCommentId : commentId}
          user={user!}
          session={session}
        />
      </div>
    </li>
  );
};
