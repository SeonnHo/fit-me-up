'use client';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { z } from 'zod';
import { credentialsSignUp } from '../api/sign-up';
import {
  checkEmailDuplication,
  checkNicknameDuplication,
} from '../api/check-duplication';
import { useState } from 'react';
import { EmailAuthNumberDialog } from './email-auth-number-dialog';
import { toast } from '@/shared/ui/use-toast';
import { useRouter } from 'next/navigation';

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

export const CredentialsSignUpForm = () => {
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
  const [isShowEmailAuthNumberDialog, setIsShowEmailAuthNumberDialog] =
    useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await credentialsSignUp(values);
    if (result.acknowledged) {
      toast({
        title: '회원가입 완료',
        description: '핏미업에 오신 걸 환영합니다.',
      });
      router.replace('/api/auth/signin');
    }
  };

  const handleCheckEmailDuplicationClick = async (email: string) => {
    const result = await checkEmailDuplication(email);

    if (result) {
      toast({
        variant: 'destructive',
        title: '중복된 이메일',
        description: '가입되어 있는 이메일입니다. 다른 이메일로 가입해 주세요.',
      });
    } else {
      setIsShowEmailAuthNumberDialog(true);
    }
  };

  const handleCheckNicknameDuplicationClick = async (nickname: string) => {
    const result = await checkNicknameDuplication(nickname);

    if (result) {
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
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
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant={'outline'}
                  className="ml-4 font-bold"
                  onClick={() => handleCheckEmailDuplicationClick(field.value)}
                  disabled={validation.email}
                >
                  {validation.email && !signUpDisabledOption.email ? (
                    <FaCheck className="text-green-700" />
                  ) : (
                    '이메일 인증'
                  )}
                </Button>
              </div>
              <FormMessage />
              {isShowEmailAuthNumberDialog && (
                <EmailAuthNumberDialog
                  open={isShowEmailAuthNumberDialog}
                  onOpenChange={setIsShowEmailAuthNumberDialog}
                  email={field.value}
                  time={3}
                  maxLength={6}
                  onSuccess={() => {
                    setSignUpDisabledOption((prev) => ({
                      ...prev,
                      email: false,
                    }));
                    setIsShowEmailAuthNumberDialog(false);
                    setValidation((prev) => ({
                      ...prev,
                      email: true,
                    }));
                  }}
                  onFailed={() => {
                    setSignUpDisabledOption((prev) => ({
                      ...prev,
                      email: true,
                    }));
                  }}
                />
              )}
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
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant={'outline'}
                  className="ml-4 font-bold"
                  onClick={() =>
                    handleCheckNicknameDuplicationClick(field.value)
                  }
                  disabled={validation.nickname}
                >
                  {validation.nickname && !signUpDisabledOption.nickname ? (
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
  );
};
