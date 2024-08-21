import { User } from '@/entities/user';
import { connectDB } from '@/shared/api/database';
import { signJwtAccessToken } from '@/shared/lib/jwt';
import * as bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
}

interface UserWithPassword extends User {
  password: string;
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const usersCollection = database.collection<UserWithPassword>('users');

  const body: RequestBody = await request.json();
  const TYPE = 'credentials';

  const user = await usersCollection.findOne<UserWithPassword>({
    email: body.email,
    type: TYPE,
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
