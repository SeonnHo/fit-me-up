'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { MdClose } from 'react-icons/md';
import { sendEmail } from '../api/send-email';
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/shared/ui/use-toast';

interface AuthNumberDialogProps {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maxLength: number;
  time: number;
  onSuccess: () => void;
  onFailed: () => void;
}

export const EmailAuthNumberDialog = ({
  email,
  open,
  onOpenChange,
  maxLength,
  time,
  onSuccess,
  onFailed,
}: AuthNumberDialogProps) => {
  const authNumberRef = useRef('');
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const timerRef = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          return prevTimeLeft;
        }
      });
    }, 1000);

    return timer;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleResendingClick = async () => {
    const authNumber = await sendEmail(email);

    const timer = startTimer();
    setTimeLeft(time * 60);
    if (timerRef.current && timerRef.current !== timer) {
      clearInterval(timerRef.current);
      timerRef.current = timer;
    } else {
      timerRef.current = timer;
    }

    authNumberRef.current = authNumber;
  };

  const verifyEmail = (authNumber: string) => {
    if (authNumberRef.current === authNumber) {
      onSuccess();
      clearInterval(timerRef.current);
      toast({
        title: '이메일 인증 완료',
        description: '입력하신 이메일의 인증이 완료되었습니다.',
      });
    } else {
      onFailed();
      toast({
        variant: 'destructive',
        title: '유효하지 않은 번호',
        description: '전송된 이메일을 다시 한 번 확인해주세요.',
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const authNumber = await sendEmail(email);
      authNumberRef.current = authNumber;
    };
    fetch();
  }, [email]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogCancel className="absolute top-2 right-2 border-none hover:bg-background p-0 m-0 h-auto w-auto">
          <MdClose className="size-6 text-zinc-400 hover:text-zinc-700" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            이메일 인증
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            입력하신 이메일로 인증 번호를 보냈어요.
            <br />
            확인하시고 아래 입력란에 번호를 입력해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-10">
          <InputOTP
            maxLength={maxLength}
            containerClassName="justify-center"
            onComplete={(value) => verifyEmail(value)}
            disabled={timeLeft === 0}
          >
            <InputOTPGroup>
              {Array.from({ length: maxLength }).map((_, index) => (
                <InputOTPSlot key={index} index={index} className="h-12 w-12" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="flex justify-center items-center mt-2">
            <p
              className={`text-sm font-bold ${
                timeLeft === 0 ? 'text-zinc-400' : 'text-zinc-800'
              }`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <Button onClick={handleResendingClick}>재전송</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
