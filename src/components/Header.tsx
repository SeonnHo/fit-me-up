'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <>
      <header className="w-full h-[60px] lg:h-[80px] fixed top-0 left-0 z-50 bg-white">
        <div className="flex items-center h-full lg:max-w-screen-lg mx-auto">
          <Link href={'/'}>
            <h1 className="font-bold text-xl max-lg:ml-4">FIT ME UP</h1>
          </Link>
          <div className="ml-auto mr-2">
            <Link href={'/sign-in'}>
              <Button variant={'default'}>로그인</Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
