'use client';

import { LuImagePlus } from 'react-icons/lu';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { postFormSchema } from '../model/post-schema';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useCreatePostFormStore } from '../model/create-post-form-store';
import { useRef } from 'react';
import { toast } from '@/shared/ui/use-toast';

interface ImagePickFormFieldProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}

export const ImagePickFormField = ({ form }: ImagePickFormFieldProps) => {
  const { setFiles, addFilePath, resetFilePath } = useCreatePostFormStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const category = form.watch('category');

  const handleFileChange = () => {
    if (inputRef.current && inputRef.current.files) {
      if (inputRef.current.files.length > 5) {
        toast({
          title: '이미지 개수 초과',
          description: '이미지는 최대 5장까지 첨부 가능합니다.',
        });
        return;
      }

      resetFilePath();
      setFiles([]);

      const fileList: File[] = [];

      for (const file of inputRef.current.files) {
        fileList.push(file);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          addFilePath(e);
        };
        reader.readAsDataURL(file);
      }

      setFiles(fileList);
    }
  };

  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <FormItem>
          <FormLabel className="h-[40px] w-[40px] border rounded flex justify-center items-center cursor-pointer">
            <LuImagePlus className="size-6" />
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              multiple={category !== 'todayFit'}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) {
                  const fileData = files.map((file) => ({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                  }));
                  onChange(category === 'todayFit' ? [fileData[0]] : fileData);
                  handleFileChange();
                }
              }}
              ref={inputRef}
              {...rest}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
