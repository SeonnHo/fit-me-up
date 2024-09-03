'use client';

import { OAuthSignUpForm, useValidationStore } from '@/features/sign-up';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BeatLoader } from 'react-spinners';

export const OAuthSignUpCard = () => {
  const { isValidNickname, isValidEmail } = useValidationStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.user.needsSignUp) {
      router.replace('/');
    }
  }, [session, router]);

  if (status === 'loading')
    return (
      <section>
        <BeatLoader size={15} />
      </section>
    );

  return (
    <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none relative">
      <CardHeader>
        <CardTitle className="text-center">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <OAuthSignUpForm
          oauthId={session?.user.oauthId!}
          provider={session?.user.oauthProvider!}
          defaultEmail={session?.user.email}
          defaultNickname={session?.user.nickname}
        />
      </CardContent>
      {(!isValidNickname || !isValidEmail) && (
        <section className="flex justify-center items-center mt-4 max-sm:flex-col max-sm:px-2 absolute -bottom-10 left-1/2 -translate-x-1/2 w-screen max-sm:-bottom-14">
          <RiErrorWarningFill className="size-5 text-red-600 mr-2 max-sm:mb-2 shrink-0" />
          <p className="font-bold text-sm text-red-600 text-center">
            커뮤니티를 이용하기 위해 이메일과 닉네임이 필요합니다.
          </p>
        </section>
      )}
    </Card>
  );
};
