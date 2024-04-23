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

const formSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식에 맞지 않습니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
        <CardHeader>
          <CardTitle className="text-center">로그인</CardTitle>
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
                        autoComplete="email"
                        {...field}
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
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </Form>
          <div className="flex justify-end items-center my-4">
            <p className="text-sm">회원가입을 안 하셨나요?</p>
            <Link
              href={'/sign-up'}
              className="ml-2 text-blue-700 p-0 font-bold h-auto text-sm"
            >
              회원가입
            </Link>
          </div>
          {/* <div className="flex items-center my-4">
            <Separator className="shrink" />
            <p className="whitespace-nowrap mx-2 text-zinc-600 uppercase font-bold text-xs">
              sign in with
            </p>
            <Separator className="shrink" />
          </div>
          <div className="flex flex-col space-y-3">
            <Button variant={'outline'} type="button" className="font-bold">
              <Image
                src={
                  'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5f9c58c2017800001.png'
                }
                alt="카카오톡 로고 이미지"
                width={25}
                height={25}
                className="mr-2"
              />
              카카오톡 로그인
            </Button>

            <Button variant={'outline'} type="button" className="font-bold">
              <Image
                src={
                  'https://i.namu.wiki/i/-3o7KZm62Py7rKnckl1IGUKcKXUcIeStfLlJgXkXHarYkqPwoQ2CfDZPk5zh7e0LQwoYdP07z0jVLO8IaU6Z70CEHP6kgX1bPAcIu0MeNexAVH2fQJkMDHWg26DilQtObvv-a41VLXCGKH6ALrg27Q.svg'
                }
                alt="네이버 로고 이미지"
                width={25}
                height={25}
                className="mr-2"
              />
              네이버 로그인
            </Button>

            <Button variant={'outline'} type="button" className="font-bold">
              <Image
                src={
                  'https://lh3.googleusercontent.com/cYinAwcg0UYHuljAGk0_ZbSq_FJb2iMU2TTPM0Y7ORjDNMDPH1ltJbX6573rHuHu6poQ796iQ8t3s-6PmfexI4qRBNs7ruEpWAmVeBLzeJWkFgd0ar0=h120'
                }
                alt="구글 로고 이미지"
                width={25}
                height={25}
                className="mr-2"
              />
              구글 로그인
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </main>
  );
}
