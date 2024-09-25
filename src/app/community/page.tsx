import { SearchInput } from '@/features/search';
import { NavigationCard } from '@/wigets/navigation-card';
import { PostsTable } from '@/wigets/posts-table';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

export const metadata: Metadata = {
  title: '핏미업 - 커뮤니티',
  description: '핏미업 커뮤니티 페이지입니다.',
};

export default function CommunityPage() {
  return (
    <main className="flex space-x-5">
      <NavigationCard />
      <div className="flex flex-col space-y-2">
        <div className="flex justify-end items-center space-x-2">
          <SearchInput />
          <Link
            href="/community/create"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 shrink-0"
          >
            <FaRegEdit className="size-5" />
          </Link>
        </div>
        <PostsTable category="all" />
      </div>
    </main>
  );
}
