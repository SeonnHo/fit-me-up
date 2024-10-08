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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { oauthSignUp } from '../api/sign-up';
import { toast } from '@/shared/ui/use-toast';
import { signIn } from 'next-auth/react';
import {
  checkEmailDuplication,
  checkNicknameDuplication,
} from '../api/check-duplication';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { useValidationStore } from '../model/validation-store';

const nicknameRegex = /[a-zA-Z0-9가-힣]/g;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요.' })
    .email({ message: '이메일 형식에 맞게 작성해 주세요.' }),

  nickname: z
    .string({ required_error: '닉네임을 입력해 주세요.' })
    .min(2, { message: '최소 2자 이상 입력해 주세요.' })
    .max(10, { message: '최대 10자까지만 입력 가능합니다.' })
    .regex(nicknameRegex, {
      message: '특수문자, 초성, 공백을 제외한 2~10자를 입력해 주세요.',
    }),
});

interface OAuthSignUpFormProps {
  oauthId: string;
  provider: string;
  defaultEmail?: string;
  defaultNickname?: string;
}

export const OAuthSignUpForm = ({
  oauthId,
  provider,
  defaultEmail,
  defaultNickname,
}: OAuthSignUpFormProps) => {
  const [
    isEnabledCheckNicknameDuplication,
    setIsEnabledCheckNicknameDuplication,
  ] = useState(defaultNickname ?? false);

  const [isEnabledCheckEmailDuplication, setIsEnabledCheckEmailDuplication] =
    useState(defaultEmail ?? false);

  const { isValidNickname, setIsValidNickname, isValidEmail, setIsValidEmail } =
    useValidationStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail ?? '',
      nickname: defaultNickname ?? '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await oauthSignUp({
      oauthId,
      email: values.email,
      nickname: values.nickname,
      provider,
    });

    if (result) {
      toast({
        title: '회원가입 완료',
        description: '핏미업에 오신 걸 환영합니다.',
      });
      await signIn(provider, {
        redirect: true,
        callbackUrl: '/',
      });
    } else {
      toast({
        title: '회원가입 실패',
        description: '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  const handleCheckEmailDuplicationClick = async (email: string) => {
    const result = await checkEmailDuplication(email);

    if (result) {
      toast({
        variant: 'destructive',
        title: '중복된 이메일',
        description: '다른 이메일으로 변경 후 재시도 하세요.',
      });
    } else {
      toast({
        title: '사용 가능한 닉네임',
        description: '현재 입력한 이메일으로 가입 가능해요.',
      });
      setIsEnabledCheckEmailDuplication(false);
      setIsValidEmail(true);
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
      setIsEnabledCheckNicknameDuplication(false);
      setIsValidNickname(true);
    }
  };

  const handleEmailChange = () => {
    if (z.string().min(1).email().safeParse(form.watch('email')).success) {
      setIsEnabledCheckEmailDuplication(true);
      setIsValidEmail(false);
    } else {
      setIsEnabledCheckEmailDuplication(false);
      setIsValidEmail(false);
    }
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
      setIsEnabledCheckNicknameDuplication(true);
      setIsValidNickname(false);
    } else {
      setIsEnabledCheckNicknameDuplication(false);
      setIsValidNickname(false);
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
              <div className="flex space-x-4">
                <FormControl onChange={handleEmailChange}>
                  <Input type="email" placeholder="이메일" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant={'outline'}
                  className="font-bold"
                  onClick={() => handleCheckEmailDuplicationClick(field.value)}
                  disabled={!isEnabledCheckEmailDuplication}
                >
                  중복확인
                </Button>
              </div>
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
              <div className="flex space-x-4">
                <FormControl onChange={handleNicknameChange}>
                  <Input type="text" placeholder="닉네임" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant={'outline'}
                  className="font-bold"
                  onClick={() =>
                    handleCheckNicknameDuplicationClick(field.value)
                  }
                  disabled={!isEnabledCheckNicknameDuplication}
                >
                  중복확인
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-bold"
          disabled={!isValidNickname || !isValidEmail}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
};
