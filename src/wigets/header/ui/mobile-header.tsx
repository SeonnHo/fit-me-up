'use client';

import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { HeaderNavigationMenu } from './header-navigation-menu';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface MobileHeaderProps {
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

export const MobileHeader = ({
  session,
  categoryList,
  boardList,
}: MobileHeaderProps) => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full h-[60px] fixed top-0 left-0 z-50 bg-white">
      <div className="flex items-center h-full mx-auto justify-center">
        <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
          <SheetTrigger className="p-0 h-auto absolute left-4">
            <MdMenu className="size-6" />
          </SheetTrigger>

          <SheetContent side="left" className="flex flex-col justify-between">
            <div className="flex flex-col">
              <SheetHeader className="items-center mt-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/profile_icon.png" alt="프로필 이미지" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <SheetTitle className="text-base font-bold">
                  {session && session.user
                    ? session.user.nickname
                    : '로그인 필요'}
                </SheetTitle>

                <SheetDescription>
                  {session && session.user ? '' : '로그인 후 프로필 표시'}
                </SheetDescription>
              </SheetHeader>

              <HeaderNavigationMenu
                isMobile
                categoryList={categoryList}
                boardList={boardList}
                onMenuClick={() => setIsOpenSheet(false)}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                {session && session.user ? (
                  <Button
                    variant="default"
                    type="button"
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: '/' })
                    }
                    className="flex-grow"
                  >
                    로그아웃
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    type="button"
                    className="flex-grow"
                    onClick={() => {
                      router.push('/api/auth/signin');
                      setIsOpenSheet(false);
                    }}
                  >
                    로그인
                  </Button>
                )}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-xl">
          <Link href="/">FIT ME UP</Link>
        </h1>
      </div>
    </header>
  );
};
