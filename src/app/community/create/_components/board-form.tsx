'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수 입력 요소입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 입력 요소입니다.' }),
});

export default function BoardForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleSubmit = async () => {
    // TODO: 게시물 생성 요청 로직 작성
  };

  return (
    <section className="max-sm:mb-[100px]">
      <Form {...form}>
        <form className="space-y-4 max-sm:px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="제목..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="내용..."
                    className="min-h-[300px] lg:min-h-[500px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="max-sm:fixed max-sm:left-0 max-sm:bottom-0 max-sm:w-full max-sm:px-4 max-sm:pb-2 flex space-x-2">
            <Button type="button" variant="outline" className="w-full">
              취소
            </Button>
            <Button type="submit" className="w-full">
              게시
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
