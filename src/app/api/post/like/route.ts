import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/db';

interface RequestBody {
  userId: string;
  postId: string;
  isLike: boolean;
}

export async function POST(request: NextRequest) {
  const { userId, postId, isLike }: RequestBody = await request.json();

  try {
    if (isLike) {
      const result = await prisma.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function DELETE(request: NextRequest) {
  const { userId, postId, isLike }: RequestBody = await request.json();

  try {
    if (userId && postId && !isLike) {
      const result = await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
