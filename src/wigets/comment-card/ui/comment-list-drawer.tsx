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
import { CommentForm } from '@/features/update-comment';

interface CommentListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  postId: string;
  category: string;
}

export const CommentListDrawer = ({
  open,
  onOpenChange,
  session,
  postId,
  category,
}: CommentListDialogProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DrawerHeader className="p-2 gap-0">
          <DrawerTitle className="text-base text-center">댓글</DrawerTitle>
          <DrawerDescription className="text-center">
            {session && session.user ? '' : '로그인 후 이용 가능합니다.'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-between min-h-[150px] max-h-[500px] space-y-2 px-2 pb-2">
          <CommentList session={session} postId={postId} category={category} />
          <CommentForm
            userId={session && session.user.id ? session.user.id : undefined}
            postId={postId}
            category={category}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
