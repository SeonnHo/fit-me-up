import { SignInCard } from '@/wigets/sign-in-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 로그인',
  description: '핏미업 로그인 페이지입니다.',
};

export default function SignInPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignInCard />
    </main>
  );
}
