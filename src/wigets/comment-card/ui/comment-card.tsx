'use client';

import { useMediaQuery } from '@/shared/lib/use-media-query';
import { CommentListDrawer } from './comment-list-drawer';
import { useSession } from 'next-auth/react';
import { CommentListDialog } from './comment-list-dialog';
import { useCommentModalStore } from '@/shared/model/comment-modal-store';

export const CommentCard = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();
  const { isOpen, onClose } = useCommentModalStore();

  if (isMobile) {
    return (
      <CommentListDrawer
        open={isOpen}
        onOpenChange={onClose}
        session={session}
      />
    );
  } else {
    return (
      <CommentListDialog
        open={isOpen}
        onOpenChange={onClose}
        session={session}
      />
    );
  }
};
