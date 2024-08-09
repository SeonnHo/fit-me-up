import { Board } from '@/interfaces/board';
import { connectDB } from '@/lib/database';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  userId: string;
  boardId: string;
  isLike: boolean;
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const boardsCollection = database.collection<Board>('boards');

  const body: RequestBody = await request.json();

  try {
    const result = await boardsCollection.findOneAndUpdate(
      { _id: new ObjectId(body.boardId) },
      { $inc: { likeCount: body.isLike ? 1 : -1 } }
    );

    return NextResponse.json(result);
  } catch (error) {
    throw new Error(error as string);
  }
}
