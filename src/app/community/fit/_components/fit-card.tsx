'use client';

import Comment from '@/components/comment/comment';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import FitImage from './fit-image';
import { useCommentStore } from '@/store/use-comment-store';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import Image from 'next/image';

interface Props {
  createAt: Date;
  content: string;
  image: string;
  commentCount: string;
  likeCount: string;
  user: {
    _id: string;
    nickname: string;
  };
}

export default function FitCard({
  createAt,
  content,
  image,
  commentCount,
  likeCount,
  user,
}: Props) {
  const [isLike, setIsLike] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const { mentionedUser, setMentionedUser } = useCommentStore();
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAddComment = async () => {
    if (!comment) {
      setComment('');
      toast({
        title: '로그인 필요',
        description: '로그인이 필요한 기능입니다. 로그인 후 이용해 주세요.',
      });
      return;
    }
    // TODO: 댓글 추가 요청 API 로직 작성
  };

  const dateFormatter = (date: Date): string => {
    const milliSeconds = new Date().getTime() - date.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    // const years = days / 365;
    // return `${Math.floor(years)}년 전`;

    const createAt = new Date(
      date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    );
    return `${createAt.getFullYear()}년 ${
      createAt.getMonth() + 1
    }월 ${createAt.getDate()}일`;
  };

  return (
    <>
      <Card className="w-[400px] max-sm:w-full max-sm:rounded-none max-sm:border-y max-sm:border-x-0">
        <CardHeader className="p-3 flex flex-row justify-between items-center space-y-0">
          <div className="flex space-x-2 items-center">
            <Image
              src="/profile_icon.png"
              alt="profile"
              width={40}
              height={40}
            />
            <CardTitle className="text-base line-clamp-1">
              {user.nickname}
            </CardTitle>
          </div>
          <CardDescription>{dateFormatter(createAt)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          <div className="relative w-full h-[500px]">
            <FitImage image={image} />
          </div>
          <div className="flex space-x-4 px-3">
            <div className="flex items-center space-x-1">
              {isLike ? (
                <FaHeart
                  className="size-6 text-red-500 cursor-pointer animate-heart-race"
                  onClick={() => setIsLike(false)}
                />
              ) : (
                <FaRegHeart
                  className="size-6 cursor-pointer"
                  onClick={() => setIsLike(true)}
                />
              )}
              <p className="text-sm">{likeCount}</p>
            </div>
            <div className="flex items-center space-x-1">
              <FaRegComment
                className="size-6 cursor-pointer"
                onClick={() => setIsShowComment(true)}
              />
              <p className="text-sm">{commentCount}</p>
            </div>
          </div>
          <div className="flex px-3 pb-3">
            <p className="text-sm font-bold mr-2">{user.nickname}</p>
            <p className="line-clamp-3 text-sm">{content}</p>
          </div>
        </CardContent>
      </Card>

      {isMobile ? (
        <Drawer
          open={isShowComment}
          onOpenChange={(open) => setIsShowComment(open)}
        >
          <DrawerContent onEscapeKeyDown={(e) => e.preventDefault()}>
            <DrawerHeader className="p-2 gap-0">
              <DrawerTitle className="text-base text-center">댓글</DrawerTitle>
              <DrawerDescription className="text-center">
                {session?.user ? '' : '로그인 후 이용 가능합니다.'}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col min-h-[150px] max-h-[500px] space-y-2 px-2 pb-2">
              <ul className="overflow-scroll">
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
              </ul>
              <div className="flex flex-col space-y-1">
                {mentionedUser && (
                  <div className="flex items-center space-x-4">
                    <p className="text-xs font-bold">
                      {mentionedUser}님에게 답글 추가...
                    </p>
                    <Button
                      variant="ghost"
                      type="button"
                      className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
                      onClick={() => setMentionedUser('')}
                    >
                      취소
                    </Button>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={
                      mentionedUser ? '답글 추가...' : '댓글 추가...'
                    }
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!session}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    disabled={!comment}
                    onClick={handleAddComment}
                  >
                    <FaArrowUpLong className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <AlertDialog
          open={isShowComment}
          onOpenChange={(open) => setIsShowComment(open)}
        >
          <AlertDialogContent
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="p-3 gap-0"
          >
            <AlertDialogCancel className="absolute top-2 right-2 border-none p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent">
              <MdClose className="size-6 text-zinc-400 hover:text-zinc-700" />
            </AlertDialogCancel>

            <AlertDialogHeader className="p-0 space-y-0">
              <AlertDialogTitle className="text-base font-bold text-center">
                댓글
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {session?.user ? '' : '로그인 후 이용 가능합니다.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col h-[600px] space-y-2 pt-2">
              <ul className="overflow-scroll">
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good1"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good2"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
                <Comment
                  image="/profile_icon.png"
                  nickname="good"
                  createAt="2024-06-01"
                  content="완전 멋있어요."
                />
              </ul>
              <div className="flex flex-col space-y-1">
                {mentionedUser && (
                  <div className="flex items-center space-x-4">
                    <p className="text-xs font-bold">
                      {mentionedUser}님에게 답글 추가...
                    </p>
                    <Button
                      variant="ghost"
                      type="button"
                      className="text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent"
                      onClick={() => setMentionedUser('')}
                    >
                      취소
                    </Button>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={
                      mentionedUser ? '답글 추가...' : '댓글 추가...'
                    }
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!session}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    disabled={!comment}
                    onClick={handleAddComment}
                  >
                    <FaArrowUpLong className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
