import { ObjectId } from 'mongodb';
import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';

interface Comment {
  _id?: ObjectId;
  boardId: string;
  userId: string;
  createAt?: Date;
  content: string;
  replies?: Reply[];
}

interface Reply extends Comment {
  mentionUser: string;
}

interface RequestBody {
  userId: string;
  boardId: string;
  content: string;
  _id?: string;
  isReply?: boolean;
  mentionUser?: string;
}

export async function GET() {}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const commentsCollection = database.collection<Comment>('comments');

  const date = new Date();

  const body: RequestBody = await request.json();

  if (body.isReply) {
    const reply = await commentsCollection.updateOne(
      { _id: new ObjectId(body._id) },
      {
        $push: {
          replies: {
            userId: body.userId,
            boardId: body.boardId,
            content: body.content,
            createAt: date,
            mentionUser: body.mentionUser!,
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
