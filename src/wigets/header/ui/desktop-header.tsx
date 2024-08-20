'use client';

import { Session } from 'next-auth';
import Link from 'next/link';
import { HeaderNavigationMenu } from './header-navigation-menu';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/shared/ui/button';

interface DesktopHeaderProps {
  session: Session | null;
  categoryList: {
    name: string;
    path: string;
  }[];
  boardList: {
    name: string;
    path: string;
  }[];
}

export const DesktopHeader = ({
  session,
  categoryList,
  boardList,
}: DesktopHeaderProps) => {
  const router = useRouter();

  return (
    <header className="w-full h-[80px] fixed top-0 left-0 z-50 bg-white">
      <div className="flex items-center h-full lg:max-w-screen-lg mx-auto">
        <h1 className="font-bold text-xl ml-4">
          <Link href={'/'}>FIT ME UP</Link>
        </h1>
        <HeaderNavigationMenu
          isMobile={false}
          categoryList={categoryList}
          boardList={boardList}
        />
        {session && session.user ? (
          <div className="flex items-center">
            <div className="flex items-center mx-4 space-x-2">
              <div className="size-10 bg-default-profile bg-center bg-no-repeat bg-contain" />
              <div className="text-sm font-bold">{session.user.nickname}</div>
            </div>
            <Button
              variant="default"
              type="button"
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              className="mr-4"
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            type="button"
            className="mx-4"
            onClick={() => router.push('/api/auth/signin')}
          >
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};
