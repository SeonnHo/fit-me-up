'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RiErrorWarningFill } from 'react-icons/ri';

const nicknameRegex = /[a-zA-Z0-9가-힣]/g;

const formSchema = z.object({
  nickname: z
    .string({ required_error: '닉네임을 입력해 주세요.' })
    .min(2, { message: '최소 2자 이상 입력해 주세요.' })
    .max(10, { message: '최대 10자까지만 입력 가능합니다.' })
    .regex(nicknameRegex, {
      message: '특수문자, 초성, 공백을 제외한 2~10자를 입력해 주세요.',
    }),
});

type Props = {
  params: {
    provider: string;
    id: string;
  };
};

export default function OAuthSignUpPage({ params }: Props) {
  const [isNicknameCheck, setIsNicknameCheck] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { nickname } = values;

    const body = JSON.stringify({ id: params.id, nickname });

    await fetch('/api/user/signup/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then(async (data) => {
        if (data.acknowledged) {
          toast({
            title: '회원가입 완료',
            description: '핏미업에 오신 걸 환영합니다.',
          });
          await signIn(params.provider, {
            redirect: true,
            callbackUrl: '/',
          });
        }
      });
  };

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
          setIsNicknameCheck(true);
          setIsDisabled(false);
        }
      });
  };

  const handleNicknameChange = () => {
    if (form.watch('nickname')) {
      setIsNicknameCheck(false);
      setIsDisabled(true);
    } else {
      setIsNicknameCheck(true);
      setIsDisabled(true);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen max-sm:justify-start max-sm:pt-[60px]">
      <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none relative">
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
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <div className="flex">
                      <FormControl onChange={handleNicknameChange}>
                        <Input type="text" placeholder="닉네임" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant={'outline'}
                        className="ml-4 font-bold"
                        onClick={() =>
                          handleNicknameDuplicationCheck(field.value)
                        }
                        disabled={isNicknameCheck}
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
                disabled={isDisabled}
              >
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
        {isDisabled && (
          <section className="flex justify-center items-center mt-4 max-sm:flex-col max-sm:px-2 absolute -bottom-10 left-1/2 -translate-x-1/2 w-screen max-sm:-bottom-14">
            <RiErrorWarningFill className="size-5 text-red-600 mr-2 max-sm:mb-2 shrink-0" />
            <p className="font-bold text-sm text-red-600 text-center">
              커뮤니티를 이용하기 위해 닉네임이 필요합니다.&nbsp;
              <br className="sm:hidden" />
              닉네임을 정하여 회원가입을 완료해주세요.
            </p>
          </section>
        )}
      </Card>
    </main>
  );
}
