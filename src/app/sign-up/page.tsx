'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

const nicknameRegex = /[a-zA-Z0-9가-힣]/g;

const formSchema = z
  .object({
    email: z
      .string({ required_error: '이메일을 입력해 주세요.' })
      .min(1, { message: '이메일을 입력해 주세요.' })
      .email({ message: '이메일 형식에 맞지 않습니다.' }),
    password: z
      .string()
      .min(8, { message: '8자 이상 입력해 주세요.' })
      .max(15, { message: '15자 이하 입력해 주세요.' })
      .regex(passwordRegex, {
        message: '영문, 숫자, 특수문자를 모두 조합해 주세요.',
      }),
    confirmPassword: z
      .string({ required_error: '비밀번호를 재입력해 주세요.' })
      .min(1, { message: '비밀번호를 재입력해 주세요.' }),
    nickname: z
      .string({ required_error: '닉네임을 입력해 주세요.' })
      .min(2, { message: '최소 2자 이상 입력해 주세요.' })
      .max(10, { message: '최대 10자까지만 입력 가능합니다.' })
      .regex(nicknameRegex, {
        message: '특수문자, 초성, 공백을 제외한 2~10자를 입력해 주세요.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호 재입력을 정확히 해주세요.',
  });

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
        <CardHeader>
          <CardTitle className="text-center">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호 확인"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input type="text" placeholder="닉네임" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant={'outline'}
                        className="ml-4 font-bold"
                      >
                        중복확인
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-bold">
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
