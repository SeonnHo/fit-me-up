import { User } from '@/entities/user';
import { connectDB } from '@/shared/api/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<User>('users');

  const nickname: string = await request.json();

  const user = await usersCollection.findOne({
    nickname: nickname,
  });

  if (user) {
    return NextResponse.json(true);
  }

  return NextResponse.json(false);
}
