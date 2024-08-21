import { User } from '@/entities/user';
import { connectDB } from '@/shared/api/database';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  id: string;
  nickname: string;
}

export async function POST(reqeust: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<User>('users');

  const body: RequestBody = await reqeust.json();

  const result = await usersCollection.updateOne(
    {
      _id: body.id,
    },
    { $set: { nickname: body.nickname } }
  );

  return NextResponse.json(result);
}
