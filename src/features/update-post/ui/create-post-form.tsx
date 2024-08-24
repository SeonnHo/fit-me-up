'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postFormSchema } from '../model/post-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePostFormStore } from '../model/create-post-form-store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { BeatLoader } from 'react-spinners';
import { BodyInfoFormField } from './body-info-form-field';
import { FashionInfoFormField } from './fashion-info-form-field';
import { useRouter } from 'next/navigation';
import { usePostMutaion } from '../api/post-mutation';
import { toast } from '@/shared/ui/use-toast';
import { useState } from 'react';
import { CategorySelectFormField } from './category-select-form-field';
import { ImagePickFormField } from './image-pick-form-field';
import { ThumbnailList } from './thumbnail-list';

interface CreatePostFormProps {
  userId: string;
}

export const CreatePostForm = ({ userId }: CreatePostFormProps) => {
  const { files, setFiles, resetFilePath } = useCreatePostFormStore();
  const { mutate } = usePostMutaion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      category: undefined,
      title: '',
      content: '',
      files: undefined,
      bodyInfo: {
        gender: undefined,
        height: undefined,
        weight: undefined,
      },
      fashionInfo: undefined,
    },
  });

  const handleSubmit = () => {
    console.log('category: ' + form.watch('category'));
    console.log('title: ' + form.watch('title'));
    console.log('content: ' + form.watch('content'));
    console.log('bodyInfo: ' + form.watch('bodyInfo'));
    console.log('fashionInfo: ' + form.watch('fashionInfo'));
    console.log('files: ' + files);
    console.log('userId: ' + userId);

    setIsSubmitting(true);
    mutate(
      {
        category: form.watch('category'),
        title: form.watch('title'),
        content: form.watch('content'),
        bodyInfo: form.watch('bodyInfo'),
        fashionInfo: form.watch('fashionInfo'),
        files: files,
        userId,
      },

      {
        onSuccess: (data) => {
          if (data.acknowledged) {
            toast({
              title: '게시물 등록 성공',
              description:
                '게시물이 정상적으로 등록됐습니다. 잠시 후 이전 페이지로 이동합니다.',
            });
            form.reset();
            setFiles([]);
            resetFilePath();
            setTimeout(() => {
              router.back();
            }, 1000);
          } else {
            toast({
              title: '게시물 등록 실패',
              description:
                '게시물 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            });
          }
          setIsSubmitting(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast({
            title: '에러 발생',
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <section className="mb-4 max-sm:mb-[100px]">
      <Form {...form}>
        <form
          className="space-y-4 max-sm:px-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="max-sm:p-4 py-4 flex space-x-2">
            <CategorySelectFormField form={form} />
            <ImagePickFormField form={form} />
          </div>

          <ThumbnailList />

          {form.watch('category') !== 'todayFit' ? (
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
          ) : (
            <div className="flex flex-col space-y-2 mt-4">
              <BodyInfoFormField form={form} />
              <FashionInfoFormField form={form} />
            </div>
          )}

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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <BeatLoader color="white" size={10} /> : '게시'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
