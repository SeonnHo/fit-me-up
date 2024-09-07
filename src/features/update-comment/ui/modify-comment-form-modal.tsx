'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCommentMutation } from '../api/comment-mutation';
import { toast } from '@/shared/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/tailwind-merge';
import { Input } from '@/shared/ui/input';

interface ModifyCommentFormModalProps {
  className?: string;
  commentId: string;
  originalContent: string;
  postId: string;
  category: string;
}

const formSchema = z.object({
  content: z.string().min(1, { message: '최소 1자 이상 입력해야합니다.' }),
});

export const ModifyCommentFormModal = ({
  className,
  commentId,
  originalContent,
  postId,
  category,
}: ModifyCommentFormModalProps) => {
  const { mutate } = useCommentMutation({ method: 'PUT' });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: originalContent,
    },
  });

  const handleSubmit = ({ content }: z.infer<typeof formSchema>) => {
    if (originalContent === content) {
      toast({
        title: '내용 일치',
        description: '내용이 기존의 댓글과 일치합니다. 수정 후 제출해 주세요.',
      });
      return;
    }

    mutate(
      {
        commentId,
        content,
        postId,
        category,
      },
      {
        onSuccess: () => {
          toast({
            title: '댓글 수정 성공',
            description: '댓글이 정상적으로 수정되었습니다.',
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className={cn(
            'text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent',
            className
          )}
        >
          수정
        </Button>
      </DialogTrigger>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
          <DialogDescription>댓글 내용을 수정 후</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>댓글</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="내용..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">댓글 수정</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
