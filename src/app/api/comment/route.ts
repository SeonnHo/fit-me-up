import { ObjectId } from 'mongodb';
import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '@/interfaces/comment';
import { getNextSequence } from '@/lib/sequence-counter';

interface RequestBody {
  userId: string;
  boardId: string;
  content: string;
  _id?: string;
  mentionedUser?: string;
  mentioningUser?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get('boardId');

  const database = connectDB.db('fit_me_up');
  const commentsCollection = database.collection<Comment>('comments');

  try {
    if (boardId) {
      const comments = await commentsCollection
        .find<Comment>({
          boardId: { $eq: boardId },
        })
        .toArray();
      return NextResponse.json(comments);
    } else {
      throw new Error('boardId 파라미터가 없습니다.');
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const commentsCollection = database.collection<Comment>('comments');

  const date = new Date();

  const body: RequestBody = await request.json();

  if (body.mentioningUser) {
    const replySequence = await getNextSequence(body._id!);
    const reply = await commentsCollection.updateOne(
      { _id: new ObjectId(body._id) },
      {
        $push: {
          replies: {
            id: replySequence,
            userId: body.userId,
            boardId: body.boardId,
            content: body.content,
            createAt: date,
            mentionedUser: body.mentionedUser!,
            mentioningUser: body.mentioningUser!,
          },
        },
      }
    );
    return NextResponse.json(reply);
  } else {
    const comment = await commentsCollection.insertOne({
      userId: body.userId,
      boardId: body.boardId,
      content: body.content,
      createAt: date,
    });

    return NextResponse.json(comment);
  }
}
