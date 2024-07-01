'use client';

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
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginAlertDialog({ open, onOpenChange }: Props) {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
  );
}
