'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { LuChevronDown } from 'react-icons/lu';

export default function Header() {
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [extensionInfoList, setExtensionInfoList] = useState([
    { category: '/community/man', extended: false },
    { category: '/community/woman', extended: false },
  ]);

  const categoryList = [
    { name: '전체 글', path: '/community' },
    { name: '남성 커뮤니티', path: '/community/man' },
    { name: '여성 커뮤니티', path: '/community/woman' },
  ];

  const bulletinBoardList = [
    { name: '자유게시판', path: '/board/free' },
    { name: '질문게시판', path: '/board/question' },
    { name: '정보게시판', path: '/board/info' },
  ];

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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={'/community/fit'} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle({
                          className: '[font-weight:bold]',
                        })}
                      >
                        오늘의 핏
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      onClick={() => router.push('/community')}
                      className="font-bold"
                    >
                      커뮤니티
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[200px] px-4 py-2">
                        {categoryList.map((category) => (
                          <li key={category.name}>
                            <NavigationMenuLink
                              asChild
                              onSelect={(e) => e.preventDefault()}
                            >
                              <div className="relative flex items-center">
                                <Link
                                  href={category.path}
                                  className={`text-sm flex justify-center items-center hover:bg-accent rounded-md py-2 flex-grow ${
                                    path === category.path
                                      ? 'font-extrabold'
                                      : ''
                                  }`}
                                >
                                  {category.name}
                                </Link>
                                {category.path !== '/community' && (
                                  <>
                                    {extensionInfoList
                                      .filter(
                                        (extensionInfo) =>
                                          extensionInfo.category ===
                                          category.path
                                      )
                                      .map((info) => (
                                        <div
                                          key={info.category}
                                          className="absolute p-2 right-2 z-10 hover:bg-accent rounded-md cursor-pointer"
                                          onClick={() =>
                                            setExtensionInfoList((prevList) =>
                                              prevList.map((prev) => {
                                                if (
                                                  prev.category ===
                                                  info.category
                                                ) {
                                                  return {
                                                    ...prev,
                                                    extended: !prev.extended,
                                                  };
                                                } else {
                                                  return prev;
                                                }
                                              })
                                            )
                                          }
                                        >
                                          <LuChevronDown
                                            className={`transition duration-200 ${
                                              info.extended ? 'rotate-180' : ''
                                            }`}
                                          />
                                        </div>
                                      ))}
                                  </>
                                )}
                              </div>
                            </NavigationMenuLink>
                            {category.path !== '/community' && (
                              <>
                                {extensionInfoList.map((info) => {
                                  if (
                                    category.path === info.category &&
                                    info.extended
                                  ) {
                                    return (
                                      <ul key={info.category} className={``}>
                                        {bulletinBoardList.map((board) => (
                                          <li key={board.name}>
                                            <NavigationMenuLink
                                              asChild
                                              onSelect={(e) =>
                                                e.preventDefault()
                                              }
                                            >
                                              <Link
                                                href={
                                                  category.path + board.path
                                                }
                                                className={`text-sm flex justify-center items-center hover:bg-accent rounded-md py-2 flex-grow`}
                                              >
                                                {board.name}
                                              </Link>
                                            </NavigationMenuLink>
                                          </li>
                                        ))}
                                      </ul>
                                    );
                                  }
                                })}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
