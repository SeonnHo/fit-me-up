'use client';

import { useMediaQuery } from '@/shared/lib/use-media-query';
import { useSession } from 'next-auth/react';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

const categoryList = [
  { name: '전체 글', path: '/community' },
  { name: '남성 커뮤니티', path: '/community/man' },
  { name: '여성 커뮤니티', path: '/community/woman' },
];

const boardList = [
  { name: '자유게시판', path: '/board/free' },
  { name: '질문게시판', path: '/board/question' },
  { name: '정보게시판', path: '/board/info' },
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
