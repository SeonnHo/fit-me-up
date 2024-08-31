import { OAuthSignUpCard } from '@/wigets/oauth-sign-up-card';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: '핏미업 - 회원가입',
  description: '핏미업 회원가입 페이지입니다.',
};

interface OAuthSignUpPageProps {
  params: {
    provider: string;
    id: string;
  };
}

export default function OAuthSignUpPage({ params }: OAuthSignUpPageProps) {
  if (!params.id && !params.provider) {
    redirect('/sign-up', RedirectType.replace);
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen max-sm:justify-start max-sm:pt-[60px]">
      <OAuthSignUpCard oauthId={params.id} provider={params.provider} />
    </main>
  );
}
