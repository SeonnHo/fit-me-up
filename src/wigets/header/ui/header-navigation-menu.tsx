'use client';

import { cn } from '@/shared/lib/tailwind-merge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/shared/ui/navigation-menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { MouseEventHandler, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface NavigationMenuProps {
  isMobile: boolean;
  categoryList: {
    name: string;
    path: string;
  }[];
  boardList: {
    name: string;
    path: string;
  }[];
  onMenuClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const HeaderNavigationMenu = ({
  isMobile,
  categoryList,
  boardList,
  onMenuClick,
}: NavigationMenuProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [extensionInfoList, setExtensionInfoList] = useState([
    { category: '/community/man', extended: false },
    { category: '/community/woman', extended: false },
  ]);
  const path = usePathname();
  const router = useRouter();

  if (isMobile) {
    return (
      <nav className="mt-4">
        <ul className="flex flex-col">
          <li className="px-4 py-3">
            <Link
              href="/community/fit"
              className="font-bold block"
              onClick={onMenuClick}
            >
              오늘의 핏
            </Link>
          </li>

          <li className="relative px-4 py-3 flex flex-col">
            <Link href="/community" className="font-bold" onClick={onMenuClick}>
              커뮤니티
            </Link>
            <div
              className="absolute right-4 z-10 hover:bg-accent rounded-md cursor-pointer"
              onClick={() => setIsExtended((prev) => !prev)}
            >
              <LuChevronDown
                className={`size-6 transition duration-200 ${
                  isExtended ? 'rotate-180' : ''
                }`}
              />
            </div>
            {isExtended && (
              <ul className="space-y-2">
                {categoryList.map((category) => (
                  <li
                    key={category.name}
                    className={cn(
                      'first:mt-2 px-2 relative flex flex-col rounded-md',
                      extensionInfoList.map((info) =>
                        category.path === info.category && info.extended
                          ? 'bg-accent'
                          : ''
                      )
                    )}
                  >
                    <Link
                      href={category.path}
                      className={cn(
                        'block text-sm py-2',
                        category.path === path ? 'font-bold' : ''
                      )}
                      onClick={onMenuClick}
                    >
                      {category.name}
                    </Link>
                    {extensionInfoList.map((info) => {
                      if (info.category === category.path) {
                        return (
                          <React.Fragment key={info.category}>
                            <div
                              className="absolute top-2 right-2 z-10 hover:bg-accent rounded-md cursor-pointer"
                              onClick={() =>
                                setExtensionInfoList((prev) =>
                                  prev.map((extensionInfo) => {
                                    if (
                                      extensionInfo.category === info.category
                                    ) {
                                      return {
                                        ...extensionInfo,
                                        extended: !extensionInfo.extended,
                                      };
                                    } else {
                                      return extensionInfo;
                                    }
                                  })
                                )
                              }
                            >
                              <LuChevronDown
                                className={cn(
                                  'size-5 transition duration-200',
                                  info.extended ? 'rotate-180' : ''
                                )}
                              />
                            </div>
                            {info.extended && (
                              <ul className="px-2">
                                {boardList.map((board) => (
                                  <li key={board.name}>
                                    <Link
                                      href={category.path + board.path}
                                      className={cn(
                                        'block text-sm py-2',
                                        info.category + board.path === path
                                          ? 'font-bold'
                                          : ''
                                      )}
                                      onClick={onMenuClick}
                                    >
                                      {board.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </React.Fragment>
                        );
                      }
                    })}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
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
                  <ul className="w-[200px] px-4 py-2 space-y-2">
                    {categoryList.map((category) => (
                      <li
                        key={category.name}
                        className={extensionInfoList
                          .map((info) => {
                            if (
                              info.category === category.path &&
                              info.extended
                            ) {
                              return 'bg-slate-50 rounded-md';
                            }
                          })
                          .join('')}
                      >
                        <NavigationMenuLink
                          asChild
                          onSelect={(e) => e.preventDefault()}
                        >
                          <div className="relative flex items-center">
                            <Link
                              href={category.path}
                              className={cn(
                                'text-sm flex justify-center items-center hover:bg-accent rounded-md py-2 flex-grow',
                                path === category.path ? 'font-extrabold' : ''
                              )}
                            >
                              {category.name}
                            </Link>
                            {category.path !== '/community' && (
                              <>
                                {extensionInfoList
                                  .filter(
                                    (extensionInfo) =>
                                      extensionInfo.category === category.path
                                  )
                                  .map((info) => (
                                    <div
                                      key={info.category}
                                      className="absolute p-2 right-2 z-10 hover:bg-accent rounded-md cursor-pointer"
                                      onClick={() =>
                                        setExtensionInfoList((prevList) =>
                                          prevList.map((prev) => {
                                            if (
                                              prev.category === info.category
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
                                        className={cn(
                                          'transition duration-200',
                                          info.extended ? 'rotate-180' : ''
                                        )}
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
                                  <ul key={info.category}>
                                    {boardList.map((board) => (
                                      <li key={board.name}>
                                        <NavigationMenuLink
                                          asChild
                                          onSelect={(e) => e.preventDefault()}
                                        >
                                          <Link
                                            href={info.category + board.path}
                                            className={cn(
                                              'text-sm flex justify-center items-center hover:bg-accent rounded-md py-2 flex-grow',
                                              info.category + board.path ===
                                                path
                                                ? 'font-bold'
                                                : ''
                                            )}
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
    );
  }
};
