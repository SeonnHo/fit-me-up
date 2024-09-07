'use client';

import { CommentList } from './comment-list';
import { Session } from 'next-auth';
import { CommentForm } from '@/features/update-comment';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface CommentListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  postId: string;
  category: string;
}

export const CommentListDialog = ({
  open,
  onOpenChange,
  session,
  postId,
  category,
}: CommentListDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        className="p-3 gap-0"
      >
        <DialogHeader className="p-0 space-y-0">
          <DialogTitle className="text-base font-bold text-center">
            댓글
          </DialogTitle>
          <DialogDescription className="text-center">
            {session && session.user ? '' : '로그인 후 이용 가능합니다.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between h-[600px] space-y-2 pt-2">
          <CommentList session={session} postId={postId} category={category} />
          <CommentForm
            userId={session && session.user.id ? session.user.id : undefined}
            postId={postId}
            category={category}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
