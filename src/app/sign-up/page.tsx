import { SignUpCard } from '@/wigets/sign-up-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핏미업 - 회원가입',
  description: '핏미업 회원가입 페이지입니다.',
};

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignUpCard />
    </main>
  );
}
