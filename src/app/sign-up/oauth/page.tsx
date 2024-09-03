import { OAuthSignUpCard } from '@/wigets/oauth-sign-up-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 회원가입',
  description: '핏미업 회원가입 페이지입니다.',
};

export default function OAuthSignUpPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen max-sm:justify-start max-sm:pt-[60px]">
      <OAuthSignUpCard />
    </main>
  );
}
