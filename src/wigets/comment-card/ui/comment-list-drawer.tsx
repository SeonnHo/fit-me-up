'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';
import { Session } from 'next-auth';
import { CommentList } from './comment-list';
import { CommentEditForm } from '@/features/update-comment';

interface CommentListDialogProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

export const CommentListDrawer = ({
  postId,
  open,
  onOpenChange,
  session,
}: CommentListDialogProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <DrawerHeader className="p-2 gap-0">
          <DrawerTitle className="text-base text-center">댓글</DrawerTitle>
          <DrawerDescription className="text-center">
            {session?.user ? '' : '로그인 후 이용 가능합니다.'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-between min-h-[150px] max-h-[500px] space-y-2 px-2 pb-2">
          <CommentList postId={postId} session={session} />
          <CommentEditForm postId={postId} userId={session?.user.id!} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
