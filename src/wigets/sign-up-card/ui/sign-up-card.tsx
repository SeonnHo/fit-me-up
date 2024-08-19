'use client';

import { CredentialsSignUpForm } from '@/features/sign-up';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SignUpCard = () => {
  const [isLogined, setIsLogined] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsLogined(true);
    }
  }, [session]);
  return (
    <>
      <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
        <CardHeader>
          <CardTitle className="text-center">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <CredentialsSignUpForm />
          <CardDescription className="text-black text-right mt-2">
            이미 회원이신가요?
            <Link
              href="/api/auth/signin"
              className="ml-2 text-blue-700 p-0 font-bold h-auto text-sm"
            >
              로그인
            </Link>
          </CardDescription>
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
