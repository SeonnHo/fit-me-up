'use client';

import { useMediaQuery } from '@/shared/lib/use-media-query';
import { useSession } from 'next-auth/react';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

const categoryList = [
  { name: '전체 글', path: '/community' },
  { name: '남성 커뮤니티', path: '/community/male' },
  { name: '여성 커뮤니티', path: '/community/female' },
];

const boardList = [
  { name: '자유게시판', path: '/free' },
  { name: '질문게시판', path: '/question' },
  { name: '정보게시판', path: '/info' },
];

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();

  if (isMobile) {
    return (
      <MobileHeader
        session={session}
        categoryList={categoryList}
        boardList={boardList}
      />
    );
  } else {
    return (
      <DesktopHeader
        session={session}
        categoryList={categoryList}
        boardList={boardList}
      />
    );
  }
};
