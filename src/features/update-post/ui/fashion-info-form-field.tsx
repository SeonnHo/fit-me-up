'use client';

import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { postFormSchema } from '../model/post-schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { MdOutlineInfo } from 'react-icons/md';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { FormControl, FormField } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

interface FashionInfoFormFieldProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}

export const FashionInfoFormField = ({ form }: FashionInfoFormFieldProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fashionInfo',
  });

  const handlePlusClick = () => {
    if (fields.length < 10) {
      append({ section: '', info: '', size: '' });
    }
  };

  const handleMinusClick = () => {
    if (fields.length > 0) {
      remove(fields.length - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <p className="text-sm">패션 정보</p>
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
              <p className="text-xs">
                핏 정보는 필수 입력 요소가 아니지만,
                <br />
                리스트 생성 시 각 기입란은 필수 입력 요소입니다.
                <br />
                최대 10개까지 입력 가능합니다.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            type="button"
            className="p-2 h-auto"
            onClick={handlePlusClick}
            disabled={fields.length >= 10}
          >
            <LuPlus className="size-5" />
          </Button>
          <Button
            variant="outline"
            type="button"
            className="h-auto p-2"
            onClick={handleMinusClick}
            disabled={fields.length <= 0}
          >
            <LuMinus className="size-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <table className="w-full border">
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <FormField
                  control={form.control}
                  name={`fashionInfo.${index}.section`}
                  render={({ field }) => (
                    <td className="border-r border-b p-1 w-1/4">
                      <FormControl>
                        <Input type="text" placeholder="부위..." {...field} />
                      </FormControl>
                    </td>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`fashionInfo.${index}.info`}
                  render={({ field }) => (
                    <td className="border-r border-b p-1">
                      <FormControl>
                        <Input type="text" placeholder="정보..." {...field} />
                      </FormControl>
                    </td>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`fashionInfo.${index}.size`}
                  render={({ field }) => (
                    <td className="border-b p-1 w-1/4">
                      <FormControl>
                        <Input type="text" placeholder="사이즈..." {...field} />
                      </FormControl>
                    </td>
                  )}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
