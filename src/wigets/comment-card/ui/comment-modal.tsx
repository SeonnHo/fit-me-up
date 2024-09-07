'use client';

import { useMediaQuery } from '@/shared/lib/use-media-query';
import { CommentListDrawer } from './comment-list-drawer';
import { useSession } from 'next-auth/react';
import { CommentListDialog } from './comment-list-dialog';
import { useCommentModalStore } from '@/shared/model/comment-modal-store';

export const CommentModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();
  const { isOpen, onOpenChange, postId, category } = useCommentModalStore();

  if (!isOpen) return;

  if (isMobile && isOpen) {
    return (
      <CommentListDrawer
        open={isOpen}
        session={session}
        onOpenChange={onOpenChange}
        postId={postId}
        category={category}
      />
    );
  }

  if (!isMobile && isOpen) {
    return (
      <CommentListDialog
        open={isOpen}
        session={session}
        onOpenChange={onOpenChange}
        postId={postId}
        category={category}
      />
    );
  }
};
