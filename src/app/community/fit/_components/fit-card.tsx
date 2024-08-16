'use client';

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
import { ObjectId } from 'mongodb';
import CommentList from '@/components/comment/comment-list';
import { dateFormatter } from '@/shared/lib/date-formatter';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  _id: string;
  createAt: Date;
  content: string;
  images: string[];
  commentCount: number;
  likeCount: number;
  fitInfo: {
    section: string;
    info: string;
    size: string;
  }[];
  bodyInfo: {
    gender: string;
    height: number | undefined;
    weight: number | undefined;
  };
  user: {
    _id: string | ObjectId;
    nickname: string;
  };
}

export default function FitCard({
  _id,
  createAt,
  content,
  images,
  commentCount,
  likeCount,
  fitInfo,
  bodyInfo,
  user,
}: Props) {
  const [isLike, setIsLike] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const {
    mentionedUser,
    setMentionedUser,
    mentioningUser,
    setMentioningUser,
    commentId,
    setCommentId,
  } = useCommentStore();
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({
      _id,
      userId,
      boardId,
      content,
      mentionedUser,
      mentioningUser,
    }: {
      _id: string;
      userId: string | null | undefined;
      boardId: string;
      content: string;
      mentionedUser: string;
      mentioningUser: string;
    }) => {
      const data = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: _id,
          userId: userId,
          boardId: boardId,
          content: content,
          mentionedUser,
          mentioningUser,
        }),
      }).then((res) => res.json());
      return data;
    },
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
      queryClient.invalidateQueries({ queryKey: ['boards', 'todayFit'] });
    },
  });

  const handleAddComment = async () => {
    if (!comment) {
      setComment('');
      toast({
        title: '로그인 필요',
        description: '로그인이 필요한 기능입니다. 로그인 후 이용해 주세요.',
      });
      return;
    }

    mutate(
      {
        _id: commentId,
        userId: session?.user.id,
        boardId: _id,
        content: comment,
        mentionedUser,
        mentioningUser,
      },
      {
        onSuccess: () => {
          toast({
            title: '댓글 등록',
            description: '댓글이 성공적으로 등록되었습니다.',
          });
          setComment('');
          setCommentId('');
          setMentionedUser('');
          setMentioningUser('');
        },
        onError: (error) => {
          toast({
            title: '에러 발생',
            description: error.message,
          });
        },
      }
    );
  };

  const handleLikeClick = async (isLike: boolean) => {
    const body = {
      userId: session?.user.id,
      boardId: _id,
      isLike,
    };
    const data = await fetch('/api/board/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        setIsLike(isLike);
        queryClient.invalidateQueries({ queryKey: ['boards', 'todayFit'] });
        return res.json();
      })
      .catch((error) => console.log(error));
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
            <FitImage
              image={
                process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_TODAY_FIT_URL +
                images[0]
              }
              fitInfo={fitInfo}
              bodyInfo={bodyInfo}
            />
          </div>
          <div className="flex px-3">
            <div className="flex items-center space-x-1">
              {isLike ? (
                <FaHeart
                  className="size-6 text-red-500 cursor-pointer animate-heart-race"
                  onClick={() => handleLikeClick(false)}
                />
              ) : (
                <FaRegHeart
                  className="size-6 cursor-pointer"
                  onClick={() => handleLikeClick(true)}
                />
              )}
              <p className="text-sm">{likeCount}</p>
            </div>
            <div className="flex items-center space-x-1 ml-4">
              <FaRegComment
                className="size-6 cursor-pointer"
                onClick={() => setIsShowComment(true)}
              />
              <p className="text-sm">{commentCount}</p>
            </div>
          </div>
          <div className="flex px-3 pb-3">
            <p className="w-full line-clamp-3 text-sm break-all">
              <b>{user.nickname}</b> {content}
            </p>
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
            <div className="flex flex-col justify-between min-h-[150px] max-h-[500px] space-y-2 px-2 pb-2">
              <CommentList boardId={_id} />
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
            <div className="flex flex-col justify-between h-[600px] space-y-2 pt-2">
              <CommentList boardId={_id} />
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
