import { connectDB } from '@/shared/api/database';
import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface User {
  email: string;
  password: string;
  nickname: string;
  type: string;
}

export async function POST(request: Request) {
  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<User>('users');

  const body: User = await request.json();
  const TYPE = 'credentials';

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const user = await usersCollection.insertOne({
    email: body.email,
    password: await bcrypt.hash(body.password, salt),
    nickname: body.nickname,
    type: TYPE,
  });

  return NextResponse.json(user);
}
