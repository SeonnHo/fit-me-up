'use client';

import { CredentialsSignInForm } from '@/features/sign-in';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { OAuthSignInList } from './oauth-sign-in-list';
import Link from 'next/link';
import { Separator } from '@/shared/ui/separator';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

export const SignInCard = () => {
  const { data: session } = useSession();
  const [isLogined, setIsLogined] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session) {
      setIsLogined(true);
    }
    if (!searchParams.get('callbackUrl')) {
      router.replace('/api/auth/signin');
    }
  }, [session, searchParams, router]);

  return (
    <>
      <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
        <CardHeader>
          <CardTitle className="text-center">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <CredentialsSignInForm />
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
          <OAuthSignInList />
        </CardContent>
      </Card>
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
    </>
  );
};
