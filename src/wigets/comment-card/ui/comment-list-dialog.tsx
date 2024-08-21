'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { MdClose } from 'react-icons/md';
import { CommentList } from './comment-list';
import { Session } from 'next-auth';
import { CommentEditForm } from '@/features/update-comment';

interface CommentListDialogProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

export const CommentListDialog = ({
  postId,
  open,
  onOpenChange,
  session,
}: CommentListDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="p-3 gap-0"
      >
        <AlertDialogCancel className="absolute top-2 right-2 border-none p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent">
          <MdClose className="size-6 text-zinc-400 hover:text-zinc-700" />
        </AlertDialogCancel>

        <AlertDialogHeader className="p-0 space-y-0">
          <AlertDialogTitle className="text-base font-bold text-center">
            댓글
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {session?.user ? '' : '로그인 후 이용 가능합니다.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col justify-between h-[600px] space-y-2 pt-2">
          <CommentList postId={postId} session={session} />
          <CommentEditForm postId={postId} userId={session?.user.id!} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
