'use client';

import Link from 'next/link';
import { Navigation } from './navigation';
import { NavigationGroup } from './navigation-group';
import { NavigationItem } from './navigation-item';
import { RxCornerBottomLeft } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/tailwind-merge';
import { useMediaQuery } from '@/shared/lib/use-media-query';

export const NavigationCard = () => {
  const pathname = usePathname();
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const navCategoryList = [
    { name: '전체 글', path: '/community' },
    { name: '남성 커뮤니티', path: '/community/male' },
    { name: '여성 커뮤니티', path: '/community/female' },
  ];

  const boardList = [
    { name: '자유게시판', path: '/free' },
    { name: '질문게시판', path: '/question' },
    { name: '정보게시판', path: '/info' },
  ];

  if (isTablet) return;

  return (
    <Navigation>
      <NavigationGroup>
        {navCategoryList.map((category) => (
          <NavigationItem
            key={category.name}
            className="border-b last:border-none"
          >
            <Link
              href={category.path}
              className={cn(
                'text-sm hover:font-bold',
                pathname === category.path && 'font-bold'
              )}
            >
              {category.name}
            </Link>
            {category.name !== '전체 글' && (
              <NavigationGroup className="p-0">
                {boardList.map((board) => (
                  <NavigationItem key={board.name} className="flex space-x-1">
                    <RxCornerBottomLeft />
                    <Link
                      href={category.path + board.path}
                      className={cn(
                        'text-sm hover:font-bold',
                        pathname === category.path + board.path && 'font-bold'
                      )}
                    >
                      {board.name}
                    </Link>
                  </NavigationItem>
                ))}
              </NavigationGroup>
            )}
          </NavigationItem>
        ))}
      </NavigationGroup>
    </Navigation>
  );
};
