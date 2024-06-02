'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface Props {
  image: string;
  nickname: string;
  createAt: string;
  content: string;
}

export default function Comment({ image, nickname, createAt, content }: Props) {
  const { data: session } = useSession();

  return (
    <li className="flex space-x-2 items-start border-y py-2 [&:first-child~li]:border-t-0">
      <Image
        src={image}
        alt="프로필이미지"
        width={40}
        height={40}
        className="rounded-full flex-grow-0 shrink-0"
      />
      <div className="w-full flex flex-col items-start space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <p className="text-sm font-bold">{nickname}</p>
            <p className="text-xs text-zinc-400">{createAt}</p>
          </div>
          {session && nickname === session.user.nickname && (
            <div className="flex space-x-2 items-center">
              <Button
                variant="ghost"
                type="button"
                className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
              >
                수정
              </Button>
              <Button
                variant="ghost"
                type="button"
                className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
              >
                삭제
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm">{content}</p>
        <Button
          variant="ghost"
          type="button"
          className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
        >
          답글 달기
        </Button>
      </div>
    </li>
  );
}
