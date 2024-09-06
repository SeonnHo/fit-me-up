import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/db';

interface RequestBody {
  userId: string;
  postId: string;
  content: string;
  commentId?: string;
  mentionedUserId?: string;
  mentioningUserId?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  try {
    if (postId) {
      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        orderBy: {
          id: 'asc',
        },
        include: {
          author: {
            select: {
              nickname: true,
            },
          },
        },
      });
      return NextResponse.json(comments);
    } else {
      throw new Error('postId 파라미터가 없습니다.');
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    if (body.mentioningUserId) {
      const createdReply = await prisma.comment.create({
        data: {
          content: body.content,
          author: { connect: { id: body.userId } },
          post: { connect: { id: body.postId } },
          parent: { connect: { id: body.commentId } },
          mentionedUser: body.mentionedUserId
            ? { connect: { id: body.mentionedUserId } }
            : undefined,
        },
        include: {
          author: {
            select: {
              nickname: true,
            },
          },
        },
      });

      return NextResponse.json(createdReply);
    } else {
      const createdComment = await prisma.comment.create({
        data: {
          content: body.content,
          author: { connect: { id: body.userId } },
          post: { connect: { id: body.postId } },
        },
        include: {
          author: {
            select: {
              nickname: true,
            },
          },
        },
      });

      return NextResponse.json(createdComment);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
