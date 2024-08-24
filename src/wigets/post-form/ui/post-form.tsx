'use client';

import { CreatePostForm } from '@/features/update-post';
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
import { Button } from '@/shared/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PostForm = () => {
  const { data: session } = useSession();
  const [isNotLogined, setIsNotLogined] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setIsNotLogined(true);
    } else {
      setIsNotLogined(false);
    }
  }, [session]);

  return (
    <>
      <CreatePostForm userId={session?.user.id!} />
      {isNotLogined && (
        <AlertDialog open={isNotLogined} onOpenChange={setIsNotLogined}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>회원전용 서비스</AlertDialogTitle>
              <AlertDialogDescription>
                해당 서비스는 회원만 이용 가능합니다.
                <br />
                로그인 페이지로 이동하시겠습니까?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => router.back()}
                  >
                    취소
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction
                  type="button"
                  onClick={() => router.replace('/api/auth/signin')}
                >
                  확인
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
