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
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import { MdClose, MdArrowBack } from 'react-icons/md';
import FitImage from './fit-image';
import { useCommentStore } from '@/store/use-comment-store';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

interface Props {
  title: string;
  description: string;
  content: string;
  image: string;
  commentCount: string;
  likeCount: string;
}

export default function FitCard({
  title,
  description,
  content,
  image,
  commentCount,
  likeCount,
}: Props) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const { mentionedUser, setMentionedUser } = useCommentStore();
  const { data: session } = useSession();

  const handleAddComment = async () => {
    if (!comment) {
      setComment('');
      toast({
        title: '로그인 필요',
        description: '로그인이 필요한 기능입니다. 로그인 후 이용해 주세요.',
      });
      return;
    }
    // await fetch('/api/comment', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: {}
    // })
  };

  return (
    <>
      <Card
        className="transition duration-200 hover:scale-105 cursor-pointer w-[300px]"
        onClick={() => setIsOpenDetails(true)}
      >
        <CardHeader>
          <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Image
            src={image}
            alt="핏이미지"
            width={300}
            height={400}
            className="w-full"
          />
          <p className="line-clamp-1 text-sm">{content}</p>
          <div className="flex justify-end space-x-4">
            <div className="flex items-center space-x-1">
              <FaRegHeart className="size-5" />
              <p className="text-sm">{likeCount}</p>
            </div>
            <div className="flex items-center space-x-1">
              <FaRegComment className="size-5" />
              <p className="text-sm">{commentCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isOpenDetails}
        onOpenChange={(open) => {
          setIsOpenDetails(open);
          setIsShowComment(open);
        }}
      >
        <AlertDialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="overflow-hidden"
        >
          <AlertDialogCancel className="absolute top-2 right-2 border-none p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent">
            <MdClose className="size-6 text-zinc-400 hover:text-zinc-700" />
          </AlertDialogCancel>

          {isShowComment && (
            <Button
              variant="ghost"
              className="absolute top-2 left-2 border-none p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent"
              onClick={() => setIsShowComment(false)}
            >
              <MdArrowBack className="size-6 text-zinc-400 hover:text-zinc-700" />
            </Button>
          )}

          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          {isShowComment ? (
            <div className="flex flex-col h-[500px] md:h-[600px] animate-slide-left space-y-2">
              <ul className="overflow-scroll scrollbar-hide">
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
                    placeholder="댓글 추가..."
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
          ) : (
            <div className="h-[500px] md:h-[600px] overflow-y-scroll scrollbar-hide flex flex-col gap-2">
              <FitImage image={image} />
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold">
                  좋아요 {likeCount}개 • 댓글 {commentCount}개
                </p>
                <div className="flex items-center gap-4">
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
                  <FaRegComment
                    className="size-6 cursor-pointer"
                    onClick={() => setIsShowComment(true)}
                  />
                </div>
              </div>
              <p className="text-sm">{content}</p>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
