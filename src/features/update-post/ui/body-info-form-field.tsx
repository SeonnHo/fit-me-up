'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { postFormSchema } from '../model/post-schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { MdOutlineInfo } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

interface BodyInfoFormFieldProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}

export const BodyInfoFormField = ({ form }: BodyInfoFormFieldProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm">신체 정보</p>
        <Popover open={isTooltipOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="p-1 h-auto"
              onClick={() => setIsTooltipOpen((prev) => !prev)}
            >
              <MdOutlineInfo className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-auto">
            <p className="text-xs">신체 정보는 필수 입력 요소가 아닙니다.</p>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-4 max-sm:space-x-2">
        <FormField
          control={form.control}
          name="bodyInfo.gender"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="성별" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bodyInfo.height"
          render={({ field }) => (
            <FormItem className="flex space-x-1 items-end w-2/5">
              <FormControl>
                <Input type="number" placeholder="키" {...field} />
              </FormControl>
              <p className="text-sm font-bold">cm</p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bodyInfo.weight"
          render={({ field }) => (
            <FormItem className="flex space-x-1 items-end w-2/5">
              <FormControl>
                <Input type="number" placeholder="몸무게" {...field} />
              </FormControl>
              <p className="text-sm font-bold">kg</p>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
