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
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/components/ui/use-toast';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/g;

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
    message: '비밀번호를 정확히 재입력 해주세요.',
  });

export default function SignUpPage() {
  const { data: session } = useSession();
  const [isLogined, setIsLogined] = useState(false);
  const [validation, setValidation] = useState({
    email: true,
    nickname: true,
  });
  const [signUpDisabledOption, setSignUpDisabledOption] = useState({
    email: true,
    password: true,
    confirmPassword: true,
    nickname: true,
  });
  const [isShowVerifyEmailModal, setIsShowVerifyEmailModal] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const authNumberRef = useRef('');
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return timer;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  // 회원가입
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, ...body } = values;

    await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then(async (data) => {
        if (data.acknowledged) {
          toast({
            title: '회원가입 완료',
            description: '핏미업에 오신 걸 환영합니다.',
          });
          router.replace('/api/auth/signin');
        }
      });
  };

  // 닉네임 중복 체크
  const handleNicknameDuplicationCheck = async (nickname: string) => {
    await fetch('/api/user/check/nickname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nickname),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((data) => {
        if (data) {
          toast({
            variant: 'destructive',
            title: '중복된 닉네임',
            description: '다른 닉네임으로 변경 후 재시도 하세요.',
          });
        } else {
          toast({
            title: '사용 가능한 닉네임',
            description: '현재 입력한 닉네임으로 가입 가능해요.',
          });
          setValidation((prev) => ({ ...prev, nickname: true }));
          setSignUpDisabledOption((prev) => ({ ...prev, nickname: false }));
        }
      });
  };

  const handleNicknameChange = () => {
    if (
      z
        .string()
        .min(2)
        .max(10)
        .regex(nicknameRegex)
        .safeParse(form.watch('nickname')).success
    ) {
      setValidation((prev) => ({ ...prev, nickname: false }));
    } else {
      setValidation((prev) => ({ ...prev, nickname: true }));
    }
    setSignUpDisabledOption((prev) => ({ ...prev, nickname: true }));
  };

  const handleEmailChange = () => {
    if (z.string().min(1).email().safeParse(form.watch('email')).success) {
      setValidation((prev) => ({ ...prev, email: false }));
    } else {
      setValidation((prev) => ({ ...prev, email: true }));
    }
    setSignUpDisabledOption((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordChange = () => {
    if (z.string().min(1).safeParse(form.watch('password')).success) {
      setSignUpDisabledOption((prev) => ({ ...prev, password: false }));
    } else {
      setSignUpDisabledOption((prev) => ({ ...prev, password: true }));
    }
  };

  const handleConfirmPasswordChange = () => {
    if (z.string().min(1).safeParse(form.watch('confirmPassword')).success) {
      setSignUpDisabledOption((prev) => ({ ...prev, confirmPassword: false }));
    } else {
      setSignUpDisabledOption((prev) => ({ ...prev, confirmPassword: true }));
    }
  };

  const handleEmailDuplicationCheck = async (email: string) => {
    await fetch('/api/user/check/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((data) => {
        if (data) {
          toast({
            variant: 'destructive',
            title: '중복된 이메일',
            description:
              '가입되어 있는 이메일입니다. 다른 이메일로 가입해 주세요.',
          });
        } else {
          setIsShowVerifyEmailModal(true);
          sendEmail(email);
        }
      });
  };

  const sendEmail = async (email: string) => {
    const authNumber = await fetch('/api/user/signup/verify/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((data) => {
        const timer = startTimer();
        setTimeLeft(3 * 60);
        if (timerRef.current && timerRef.current !== timer) {
          clearInterval(timerRef.current);
          timerRef.current = timer;
        } else {
          timerRef.current = timer;
        }
        return data.authNumber;
      });

    authNumberRef.current = authNumber;
  };

  const verifyEmail = (authNumber: string) => {
    // TODO: 전송한 인증 번호와 사용자가 입력한 인증 번호가 같은 지 확인하는 코드 작성
    if (authNumberRef.current === authNumber) {
      setSignUpDisabledOption((prev) => ({ ...prev, email: false }));
      setIsShowVerifyEmailModal(false);
      setValidation((prev) => ({
        ...prev,
        email: true,
      }));
      clearInterval(timerRef.current);
      toast({
        title: '이메일 인증 완료',
        description: '입력하신 이메일의 인증이 완료되었습니다.',
      });
    } else {
      setSignUpDisabledOption((prev) => ({ ...prev, email: true }));
      toast({
        variant: 'destructive',
        title: '유효하지 않은 번호',
        description: '전송된 이메일을 다시 한 번 확인해주세요.',
      });
    }
  };

  useEffect(() => {
    if (session) {
      setIsLogined(true);
    }
  }, [session]);

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none">
          <CardHeader>
            <CardTitle className="text-center">회원가입</CardTitle>
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
                      <div className="flex">
                        <FormControl onChange={handleEmailChange}>
                          <Input
                            type="email"
                            placeholder="example@example.com"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant={'outline'}
                          className="ml-4 font-bold"
                          onClick={() =>
                            handleEmailDuplicationCheck(field.value)
                          }
                          disabled={validation.email}
                        >
                          {validation.email && !signUpDisabledOption.email ? (
                            <FaCheck className="text-green-700" />
                          ) : (
                            '이메일 인증'
                          )}
                        </Button>

                        <AlertDialog
                          open={isShowVerifyEmailModal}
                          onOpenChange={setIsShowVerifyEmailModal}
                        >
                          <AlertDialogContent
                            onEscapeKeyDown={(e) => e.preventDefault()}
                          >
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
                                maxLength={6}
                                containerClassName="justify-center"
                                onComplete={(value) => verifyEmail(value)}
                                disabled={timeLeft === 0}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot
                                    index={0}
                                    className="h-12 w-12"
                                  />
                                  <InputOTPSlot
                                    index={1}
                                    className="h-12 w-12"
                                  />
                                  <InputOTPSlot
                                    index={2}
                                    className="h-12 w-12"
                                  />
                                  <InputOTPSlot
                                    index={3}
                                    className="h-12 w-12"
                                  />
                                  <InputOTPSlot
                                    index={4}
                                    className="h-12 w-12"
                                  />
                                  <InputOTPSlot
                                    index={5}
                                    className="h-12 w-12"
                                  />
                                </InputOTPGroup>
                              </InputOTP>
                              <div className="flex justify-center items-center mt-2">
                                <p
                                  className={`text-sm font-bold ${
                                    timeLeft === 0
                                      ? 'text-zinc-400'
                                      : 'text-zinc-800'
                                  }`}
                                >
                                  {formatTime(timeLeft)}
                                </p>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <Button onClick={() => sendEmail(field.value)}>
                                재전송
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
                      <FormControl onChange={handlePasswordChange}>
                        <Input
                          type="password"
                          placeholder="영문, 숫자, 특수문자 포함 8~15자"
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
                      <FormControl onChange={handleConfirmPasswordChange}>
                        <Input
                          type="password"
                          placeholder="비밀번호 재입력"
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
                        <FormControl onChange={handleNicknameChange}>
                          <Input
                            type="text"
                            placeholder="특수문자, 초성, 공백 제외 2~10자"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant={'outline'}
                          className="ml-4 font-bold"
                          onClick={() =>
                            handleNicknameDuplicationCheck(field.value)
                          }
                          disabled={validation.nickname}
                        >
                          {validation.nickname &&
                          !signUpDisabledOption.nickname ? (
                            <FaCheck className="text-green-700" />
                          ) : (
                            '중복 확인'
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full font-bold"
                  disabled={
                    signUpDisabledOption.email ||
                    signUpDisabledOption.password ||
                    signUpDisabledOption.confirmPassword ||
                    signUpDisabledOption.nickname
                  }
                >
                  회원가입
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
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
}
