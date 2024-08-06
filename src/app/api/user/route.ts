import { User } from '@/interfaces/user';
import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<User>('users');

  try {
    if (userId) {
      const result = await usersCollection.findOne<User>({ _id: userId });

      return NextResponse.json(result);
    } else {
      throw new Error('userId 파라미터가 없습니다.');
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
