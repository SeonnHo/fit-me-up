'use client';

import { useCommentStore } from '@/entities/comment';
import { cn } from '@/shared/lib/tailwind-merge';
import { Button } from '@/shared/ui/button';
import { toast } from '@/shared/ui/use-toast';
import { User } from '@prisma/client';
import { Session } from 'next-auth';

interface ReplyButtonProps {
  className?: string;
  session: Session | null;
  commentId: string;
  user: Omit<User, 'password'>;
}

export const ReplyButton = ({
  className,
  session,
  commentId,
  user,
}: ReplyButtonProps) => {
  const {
    setCommentId,
    setMentionedUserId,
    setMentioningUserId,
    setMentionedUserNickname,
  } = useCommentStore();

  const handleClick = () => {
    if (!session) {
      toast({
        title: '로그인 필요',
        description: '로그인이 필요한 기능입니다. 로그인 후 이용해 주세요.',
      });
      return;
    }

    setMentionedUserId(user.id!);
    setMentionedUserNickname(user.nickname);
    setMentioningUserId(session.user.id!);
    setCommentId(commentId);
  };
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(
        'text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent',
        className
      )}
      onClick={handleClick}
    >
      답글 달기
    </Button>
  );
};
