import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/db';

interface RequestBody {
  userId: string;
  postId: string;
  content: string;
  parentCommentId?: string;
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
          parent: { connect: { id: body.parentCommentId } },
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
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body: { commentId: string; content: string } = await request.json();

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: body.commentId,
      },
      data: {
        content: body.content,
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body: { commentId: string } = await request.json();

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: body.commentId,
      },
    });

    return NextResponse.json(deletedComment);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
