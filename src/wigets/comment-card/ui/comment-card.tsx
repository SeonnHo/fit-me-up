'use client';

import { useMediaQuery } from '@/shared/lib/use-media-query';
import { CommentListDrawer } from './comment-list-drawer';
import { useSession } from 'next-auth/react';
import { CommentListDialog } from './comment-list-dialog';

interface CommentCardProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommentCard = ({
  postId,
  open,
  onOpenChange,
}: CommentCardProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();

  if (isMobile) {
    return (
      <CommentListDrawer
        postId={postId}
        open={open}
        onOpenChange={onOpenChange}
        session={session}
      />
    );
  } else {
    return (
      <CommentListDialog
        postId={postId}
        open={open}
        onOpenChange={onOpenChange}
        session={session}
      />
    );
  }
};
