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
import { toast } from '@/components/ui/use-toast';
import { useFormStore } from '@/store/use-form-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BeatLoader } from 'react-spinners';
import LoginAlertDialog from '@/components/login-alert-dialog/login-alert-dialog';

const formSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수 입력 요소입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 입력 요소입니다.' }),
});

export default function BoardCreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { category, files, setCategory, setFiles, resetFilePath } =
    useFormStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotLogined, setIsNotLogined] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsNotLogined(true);
    }
  }, [session]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!category) {
      toast({
        title: '게시판 선택',
        description: '게시판 선택은 필수입니다.',
      });
      return;
    }
    setIsSubmitting(true);
    const sendData = new FormData();

    for (const file of files) {
      sendData.append('image', file);
    }

    const body = {
      category,
      title: values.title,
      content: values.content,
      user: session?.user.nickname,
      createAt: new Date(),
    };

    sendData.append(
      'body',
      new Blob([JSON.stringify(body)], { type: 'application/json' })
    );

    await fetch('/api/board', {
      method: 'POST',
      body: sendData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast({
            title: '게시물 등록 성공',
            description:
              '게시물이 정상적으로 등록됐습니다. 잠시 후 이전 페이지로 이동합니다.',
          });
          form.reset();
          setCategory('');
          setFiles([]);
          resetFilePath();
          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          toast({
            title: '게시물 등록 실패',
            description:
              '게시물 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          });
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.log(error);
      });
  };

  return (
    <>
      <section className="mb-4 max-sm:mb-[100px]">
        <Form {...form}>
          <form
            className="space-y-4 max-sm:px-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <BeatLoader color="white" size={10} /> : '게시'}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <LoginAlertDialog open={isNotLogined} onOpenChange={setIsNotLogined} />
    </>
  );
}
