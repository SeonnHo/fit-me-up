import { NavigationCard } from '@/wigets/navigation-card';
import React from 'react';

export default function CommunityPage() {
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
  return (
    <main className="relative max-w-screen-xl h-[300vh] flex lg:items-start lg:space-x-4">
      <NavigationCard />
      <nav className="sticky top-[100px] border rounded w-[200px] p-4 max-lg:hidden">
        <ul>
          {navCategoryList.map((category) => (
            <React.Fragment key={category.name}>
              <li className="text-sm [&~&]:mt-4 cursor-pointer hover:font-bold">
                {category.name}
              </li>
              {category.name !== '전체 글' && (
                <ul className="space-y-2 mt-2 px-3">
                  {boardList.map((board) => (
                    <li
                      key={board.name}
                      className="text-sm cursor-pointer hover:font-bold"
                    >
                      {board.name}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </main>
  );
}
