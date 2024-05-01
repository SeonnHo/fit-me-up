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
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import kakaoLogo from '/public/kakao_logo.svg';
import naverLogo from '/public/naver_logo.svg';
import googleLogo from '/public/google_logo.svg';

const formSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식에 맞지 않습니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export default function SignInPage() {
  const { data: session } = useSession();
  const [isLogined, setIsLogined] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  const handleKakaoSignIn = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  const handleNaverSignIn = async () => {
    await signIn('naver', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  useEffect(() => {
    if (session) {
      setIsLogined(true);
    }
    console.log(session);
  }, [session]);

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
          <CardHeader>
            <CardTitle className="text-center">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
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
              <p className="text-sm">아직 회원이 아니신가요?</p>
              <Link
                href={'/sign-up'}
                className="ml-2 text-blue-700 p-0 font-bold h-auto text-sm"
              >
                회원가입
              </Link>
            </div>
            <div className="flex items-center my-4">
              <Separator className="shrink" />
              <p className="whitespace-nowrap mx-2 text-zinc-600 uppercase font-bold text-xs">
                or
              </p>
              <Separator className="shrink" />
            </div>
            <div className="flex flex-col space-y-3">
              <Button
                type="button"
                className="bg-[#FEE500] hover:bg-[#FEE500]/80 text-black/85 text-sm px-2 py-0 font-system"
                onClick={handleKakaoSignIn}
              >
                <Image
                  src={kakaoLogo}
                  alt="카카오톡 로고 이미지"
                  width={18}
                  height={18}
                  className="mr-2"
                  onClick={handleKakaoSignIn}
                />
                카카오 로그인
              </Button>

              <Button
                type="button"
                className="bg-[#03C75A] hover:bg-[#03C75A]/80 text-white text-sm px-2 py-0"
                onClick={handleNaverSignIn}
              >
                <Image
                  src={naverLogo}
                  alt="네이버 로고 이미지"
                  width={18}
                  height={18}
                  className="mr-2 h-[40px] cursor-pointer object-contain"
                />
                네이버 로그인
              </Button>

              <Button
                type="button"
                className="bg-[#FFFFFF] hover:bg-[#EEEEEE]/20 text-black text-sm px-2 py-0 shadow-sm shadow-zinc-200 font-roboto"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src={googleLogo}
                  alt="구글 로고 이미지"
                  width={18}
                  height={18}
                  className="mr-2 h-[40px] cursor-pointer object-contain"
                />
                Google 계정으로 로그인
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      {isLogined && (
        <AlertDialog open={isLogined} onOpenChange={setIsLogined}>
          <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
            <AlertDialogHeader>
              <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                해당 페이지는 로그아웃 후 이용하실 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => router.replace('/')}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => signOut({ callbackUrl: '/' })}>
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
