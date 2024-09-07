'use client';

import { cn } from '@/shared/lib/tailwind-merge';
import { Button } from '@/shared/ui/button';
import { useCommentMutation } from '../api/comment-mutation';
import { toast } from '@/shared/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';

interface DeleteCommentConfirmModalProps {
  className?: string;
  commentId: string;
  postId: string;
  category: string;
  authorNickname: string;
  content: string;
  mentionedUserNickname?: string;
}

export const DeleteCommentConfirmModal = ({
  className,
  commentId,
  postId,
  category,
  authorNickname,
  content,
  mentionedUserNickname,
}: DeleteCommentConfirmModalProps) => {
  const { mutate } = useCommentMutation({ method: 'DELETE' });

  const handleClick = () => {
    mutate(
      {
        commentId,
        postId,
        category,
      },
      {
        onSuccess: () => {
          toast({
            title: '댓글 삭제 성공',
            description: '댓글이 정상적으로 삭제되었습니다.',
          });
        },
        onError: (error) => {
          toast({
            title: '에러 발생',
            description: error.message,
          });
        },
      }
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className={cn(
            'text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent',
            className
          )}
        >
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            해당 댓글을 삭제하시려면 삭제를 클릭해 주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="border-y p-2 flex flex-col space-y-2">
          <h3 className="text-sm font-bold">{authorNickname}</h3>
          {mentionedUserNickname ? (
            <p className="text-sm">
              <b>@{mentionedUserNickname}</b> {content}
            </p>
          ) : (
            <p className="text-sm">{content}</p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
