'use client';

import { OAuthSignUpForm, useValidationStore } from '@/features/sign-up';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { RiErrorWarningFill } from 'react-icons/ri';

interface OAuthSignUpCardProps {
  params: {
    provider: string;
    id: string;
  };
}

export const OAuthSignUpCard = ({ params }: OAuthSignUpCardProps) => {
  const { isValidNickname } = useValidationStore();

  return (
    <Card className="w-[500px] max-sm:w-full max-sm:border-none max-sm:shadow-none relative">
      <CardHeader>
        <CardTitle className="text-center">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <OAuthSignUpForm params={params} />
      </CardContent>
      {isValidNickname && (
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
  );
};
