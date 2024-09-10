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
                <SelectItem value="maleFree">자유게시판</SelectItem>
                <SelectItem value="maleQuestion">질문게시판</SelectItem>
                <SelectItem value="maleInfo">정보게시판</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="pl-2">여성 커뮤니티</SelectLabel>
                <SelectItem value="femaleFree">자유게시판</SelectItem>
                <SelectItem value="femaleQuestion">질문게시판</SelectItem>
                <SelectItem value="femaleInfo">정보게시판</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
