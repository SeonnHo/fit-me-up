import { connectDB } from '@/shared/api/database';
import { signJwtAccessToken } from '@/shared/lib/jwt';
import * as bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
}

interface User {
  _id: string;
  email: string;
  password: string;
  nickname: string;
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<User>('users');

  const body: RequestBody = await request.json();

  const user = await usersCollection.findOne<User>({
    email: body.email,
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPassword } = user;

    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = {
      ...userWithoutPassword,
      accessToken,
    };

    return NextResponse.json(result);
  } else {
    return NextResponse.json(null);
  }
}
