'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useCreatePostFormStore } from '../model/create-post-form-store';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { postFormSchema } from '../model/post-schema';
import { FormControl, FormField, FormItem } from '@/shared/ui/form';

interface CategorySelectFormFieldProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}

export const CategorySelectFormField = ({
  form,
}: CategorySelectFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="w-full">
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="게시판 선택" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="todayFit">오늘의 핏</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="pl-2">남성 커뮤니티</SelectLabel>
                <SelectItem value="manFree">자유게시판</SelectItem>
                <SelectItem value="manQuestion">질문게시판</SelectItem>
                <SelectItem value="manInfo">정보게시판</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="pl-2">여성 커뮤니티</SelectLabel>
                <SelectItem value="womanFree">자유게시판</SelectItem>
                <SelectItem value="womanQuestion">질문게시판</SelectItem>
                <SelectItem value="womanInfo">정보게시판</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
