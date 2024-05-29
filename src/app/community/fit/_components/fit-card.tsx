'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

interface Props {
  title: string;
  description: string;
  content: string;
  image: string;
  alt: string;
  commentCount: string;
  likeCount: string;
}

export default function FitCard({
  title,
  description,
  content,
  image,
  alt,
  commentCount,
  likeCount,
}: Props) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);

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
            alt={alt}
            width={300}
            height={400}
            className="w-full"
          />
          <p className="line-clamp-1 text-sm">{content}</p>
          <div className="flex justify-end space-x-4">
            <div className="flex items-center space-x-1">
              <FaHeart className="size-5 text-red-500" />
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

          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          {isShowComment ? (
            <div
              className="bg-red-500 h-[500px] md:h-[600px] animate-slide-left"
              onClick={() => setIsShowComment(false)}
            ></div>
          ) : (
            <div className="md:h-[600px] overflow-y-scroll scrollbar-hide flex flex-col gap-2">
              <Image
                src={image}
                alt={alt}
                width={300}
                height={400}
                className="w-full"
              />
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
