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
      // const reply = await commentsCollection.updateOne(
      //   { _id: new ObjectId(body._id) },
      //   {
      //     $push: {
      //       replies: {
      //         id: replySequence,
      //         userId: body.userId,
      //         postId: body.postId,
      //         content: body.content,
      //         createAt: date,
      //         mentionedUser: body.mentionedUser!,
      //         mentioningUser: body.mentioningUser!,
      //       },
      //     },
      //   }
      // );

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
      });

      return NextResponse.json(createdReply);
    } else {
      // const comment = await commentsCollection.insertOne({
      //   userId: body.userId,
      //   postId: body.postId,
      //   content: body.content,
      //   createAt: date,
      // });

      const createdComment = await prisma.comment.create({
        data: {
          content: body.content,
          author: { connect: { id: body.userId } },
          post: { connect: { id: body.postId } },
        },
      });

      return NextResponse.json(createdComment);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
