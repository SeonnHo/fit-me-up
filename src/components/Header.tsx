'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <header className="w-full h-[80px] max-md:h-[60px] fixed top-0 left-0 z-50 bg-white">
        <div className="h-full lg:max-w-screen-lg flex max-md:justify-center items-center mx-auto">
          <h1 className="font-bold text-xl md:ml-4">FIT ME UP</h1>
        </div>
      </header>
    );

  return (
    <header className="w-full h-[80px] max-md:h-[60px] fixed top-0 left-0 z-50 bg-white">
      {isMobile ? (
        <div className="flex items-center h-full mx-auto justify-center">
          <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
            <SheetTrigger className="p-0 h-auto absolute left-4">
              <MdMenu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side={'left'}
              className="flex flex-col justify-between"
            >
              <div className="flex flex-col">
                {session && session.user && (
                  <SheetHeader className="items-center mt-4">
                    <div className="size-16 bg-default-profile bg-center bg-no-repeat bg-contain" />
                    <div className="text-lg font-bold">
                      {session.user.nickname}
                    </div>
                  </SheetHeader>
                )}
                <nav className="mt-4">
                  <ul className="flex flex-col space-y-2">
                    <li
                      className="px-4 py-3 border-y hover:bg-slate-100 flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        router.push('/community/fit');
                        setIsOpenSheet(false);
                      }}
                    >
                      <div className="font-bold">오늘의 핏</div>
                      <FaArrowRight />
                    </li>

                    <li
                      className="px-4 py-3 border-y hover:bg-slate-100 flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        router.push('/community');
                        setIsOpenSheet(false);
                      }}
                    >
                      <div className="font-bold">커뮤니티</div>
                      <FaArrowRight />
                    </li>
                  </ul>
                </nav>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  {session && session.user ? (
                    <Button
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
            <Link href={'/'}>FIT ME UP</Link>
          </h1>
        </div>
      ) : (
        <div className="flex items-center h-full lg:max-w-screen-lg mx-auto">
          <h1 className="font-bold text-xl ml-4">
            <Link href={'/'}>FIT ME UP</Link>
          </h1>

          <nav className="ml-auto flex items-center">
            <ul className="flex space-x-2">
              <li className="hover:bg-slate-100 px-4 py-2 rounded transition">
                <Link href={'/community/fit'} className="font-bold">
                  오늘의 핏
                </Link>
              </li>
              <li className="hover:bg-slate-100 px-4 py-2 rounded transition">
                <Link href={'/community'} className="font-bold">
                  커뮤니티
                </Link>
              </li>
            </ul>
          </nav>

          {session && session.user ? (
            <div className="flex items-center">
              <div className="flex items-center mx-4 space-x-2">
                <div className="size-10 bg-default-profile bg-center bg-no-repeat bg-contain" />
                <div className="text-sm font-bold">{session.user.nickname}</div>
              </div>
              <Button
                variant={'default'}
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="mr-4"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant={'default'}
              className="mx-4"
              onClick={() => router.push('/api/auth/signin')}
            >
              로그인
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
