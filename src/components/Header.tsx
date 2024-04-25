'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  console.log('mount');

  return (
    <>
      <header className="w-full h-[60px] lg:h-[80px] fixed top-0 left-0 z-50 bg-white">
        <div className="flex items-center h-full lg:max-w-screen-lg mx-auto">
          <Link href={'/'}>
            <h1 className="font-bold text-xl max-lg:ml-4">FIT ME UP</h1>
          </Link>
          <div className="ml-auto mr-2">
            {session && session.user ? (
              <div className="flex items-center">
                <p className="text-sm font-bold mr-4">
                  {session.user.nickname}
                </p>
                <Button variant={'default'} onClick={() => signOut()}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Link href={'/api/auth/signin'}>
                <Button variant={'default'}>로그인</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
