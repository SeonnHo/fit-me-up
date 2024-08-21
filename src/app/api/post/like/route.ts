import { Post } from '@/entities/post';
import { connectDB } from '@/shared/api/database';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  userId: string;
  postId: string;
  isLike: boolean;
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const postsCollection = database.collection<Post>('posts');

  const body: RequestBody = await request.json();

  try {
    const result = await postsCollection.findOneAndUpdate(
      { _id: new ObjectId(body.postId) },
      { $inc: { likeCount: body.isLike ? 1 : -1 } }
    );

    return NextResponse.json(result);
  } catch (error) {
    throw new Error(error as string);
  }
}
