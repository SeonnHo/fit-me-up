'use client';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GrReturn } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { MdOutlineSearch } from 'react-icons/md';
import { z } from 'zod';
import { cn } from '@/shared/lib/tailwind-merge';

const searchSchema = z.object({
  searchInput: z
    .string({ required_error: '검색하려는 제목을 입력해주세요.' })
    .min(1, { message: '최소 1자 이상 입력해야합니다.' }),
});

export const SearchInput = () => {
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchInput: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof searchSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-[300px] max-sm:w-full"
      >
        <FormField
          control={form.control}
          name="searchInput"
          render={({ field, fieldState }) => (
            <FormItem className="relative h-10 flex items-center border rounded-md p-2 space-x-1 space-y-0">
              <FormLabel className={fieldState.error && 'text-black'}>
                <MdOutlineSearch className="size-6" />
              </FormLabel>
              <FormControl>
                <Input
                  type="search"
                  placeholder="검색..."
                  {...field}
                  className={cn(
                    'h-auto py-1 px-2 outline-none border-none [&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden text-sm',
                    field.value ? 'pr-16' : ''
                  )}
                />
              </FormControl>
              {field.value && (
                <div className="absolute top-1/2 right-2 -translate-y-1/2 flex justify-center items-center space-x-1">
                  <Button
                    className="h-auto p-0.5"
                    type="button"
                    variant="ghost"
                    onClick={() => form.reset()}
                  >
                    <IoClose className="size-5 text-black/50 hover:text-black" />
                  </Button>
                  <Button
                    className="h-auto p-0.5"
                    type="submit"
                    variant="ghost"
                  >
                    <GrReturn className="size-5" />
                  </Button>
                </div>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
