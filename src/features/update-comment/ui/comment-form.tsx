'use client';

import { useCommentStore } from '@/entities/comment';
import { useCommentMutation } from '../api/comment-mutation';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { toast } from '@/shared/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowUpLong } from 'react-icons/fa6';
import { z } from 'zod';
import { useCommentModalStore } from '@/shared/model/comment-modal-store';

const formSchema = z.object({
  comment: z.string().min(1, { message: '내용을 입력해주세요.' }),
});

interface CommentFormProps {
  userId: string;
}

export const CommentForm = ({ userId }: CommentFormProps) => {
  const { postId, category } = useCommentModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  const {
    commentId,
    mentionedUser,
    mentioningUser,
    setCommentId,
    setMentionedUser,
    setMentioningUser,
  } = useCommentStore();

  const { mutate } = useCommentMutation();

  const handleSubmit = () => {
    mutate(
      {
        commentId,
        userId,
        postId,
        mentionedUser,
        mentioningUser,
        content: form.getValues('comment'),
        category,
      },
      {
        onSuccess: () => {
          toast({
            title: '댓글 등록',
            description: '댓글이 성공적으로 등록되었습니다.',
          });
          setCommentId('');
          setMentionedUser('');
          setMentioningUser('');
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={() => (
            <FormItem className="flex flex-col space-y-1">
              {mentionedUser && (
                <div className="flex items-center space-x-4">
                  <p className="text-xs font-bold">
                    {mentionedUser}님에게 답글 추가...
                  </p>
                  <Button
                    variant="ghost"
                    type="button"
                    className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
                    onClick={() => setMentionedUser('')}
                  >
                    취소
                  </Button>
                </div>
              )}
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    type="text"
                    placeholder={
                      mentionedUser ? '답글 추가...' : '댓글 추가...'
                    }
                  />
                </FormControl>
                <Button variant="outline" type="submit">
                  <FaArrowUpLong className="size-5" />
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
