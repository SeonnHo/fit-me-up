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
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BeatLoader } from 'react-spinners';
import LoginAlertDialog from '@/components/login-alert-dialog/login-alert-dialog';
import { MdOutlineInfo } from 'react-icons/md';
import { LuMinus, LuPlus } from 'react-icons/lu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const baseSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수 입력 요소입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 입력 요소입니다.' }),
  bodyInfo: z.object({
    gender: z.string(),
    height: z.coerce.number().or(z.undefined()),
    weight: z.coerce.number().or(z.undefined()),
  }),
  fitInfo: z.array(
    z.object({
      section: z.string().min(1),
      info: z.string().min(1),
      size: z.string().min(1),
    })
  ),
});

export default function BoardCreationForm() {
  const { category, files, setCategory, setFiles, resetFilePath } =
    useFormStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotLogined, setIsNotLogined] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState({
    bodyInfo: false,
    fitInfo: false,
  });

  const formSchema =
    category === 'todayFit'
      ? baseSchema.extend({ title: z.string().optional() })
      : baseSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      bodyInfo: {
        gender: '',
        height: 0,
        weight: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fitInfo',
  });

  useEffect(() => {
    console.log(session);
    if (!session) {
      setIsNotLogined(true);
    } else {
      setIsNotLogined(false);
    }

    return () => {
      setCategory('');
    };
  }, [session, setCategory]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!category) {
      toast({
        title: '게시판 선택',
        description: '게시판 선택은 필수입니다.',
      });
      return;
    }
    if (category === 'todayFit' && files.length <= 0) {
      toast({
        title: '이미지 첨부 필수',
        description: '오늘의 핏은 이미지가 필수 요소입니다.',
      });
      return;
    }
    setIsSubmitting(true);
    const sendData = new FormData();

    for (const file of files) {
      sendData.append('image', file);
    }

    const body =
      category !== 'todayFit'
        ? {
            category,
            title: values.title,
            content: values.content,
            user: session?.user.id,
          }
        : {
            category,
            content: values.content,
            user: session?.user.id,
            fitInfo: values.fitInfo,
            bodyInfo: values.bodyInfo,
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
    <>
      <section className="mb-4 max-sm:mb-[100px]">
        <Form {...form}>
          <form
            className="space-y-4 max-sm:px-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {category !== 'todayFit' ? (
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
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">신체 정보</p>
                    <Popover
                      open={isTooltipOpen.bodyInfo}
                      onOpenChange={(open) =>
                        setIsTooltipOpen((prev) => ({
                          ...prev,
                          bodyInfo: open,
                        }))
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() =>
                            setIsTooltipOpen((prev) => ({
                              ...prev,
                              bodyInfo: !prev,
                            }))
                          }
                        >
                          <MdOutlineInfo className="size-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="w-auto">
                        <p className="text-xs">
                          신체 정보는 필수 입력 요소가 아닙니다.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-4 max-sm:space-x-2">
                    <Select
                      onValueChange={(value) =>
                        form.setValue('bodyInfo.gender', value)
                      }
                    >
                      <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="성별" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                      </SelectContent>
                    </Select>

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
                            <Input
                              type="number"
                              placeholder="몸무게"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-sm font-bold">kg</p>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">핏 정보</p>
                    <Popover
                      open={isTooltipOpen.fitInfo}
                      onOpenChange={(open) =>
                        setIsTooltipOpen((prev) => ({ ...prev, fitInfo: open }))
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() =>
                            setIsTooltipOpen((prev) => ({
                              ...prev,
                              fitInfo: !prev,
                            }))
                          }
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
                      disabled={fields.length === 10}
                    >
                      <LuPlus className="size-5" />
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="h-auto p-2"
                      onClick={handleMinusClick}
                      disabled={fields.length === 0}
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
                            name={`fitInfo.${index}.section`}
                            render={({ field }) => (
                              <td className="border-r border-b p-1 w-1/4">
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="부위..."
                                    {...field}
                                  />
                                </FormControl>
                              </td>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`fitInfo.${index}.info`}
                            render={({ field }) => (
                              <td className="border-r border-b p-1">
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="정보..."
                                    {...field}
                                  />
                                </FormControl>
                              </td>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`fitInfo.${index}.size`}
                            render={({ field }) => (
                              <td className="border-b p-1 w-1/4">
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="사이즈..."
                                    {...field}
                                  />
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
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isNotLogined}
              >
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
