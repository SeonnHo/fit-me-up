import prisma from '@/shared/lib/db';
import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
  nickname: string;
  image?: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, salt),
        profileImageUrl: body.image
          ? process.env.PROFILE_URL + body.image
          : process.env.DEFAULT_PROFILE_URL,
        nickname: body.nickname,
      },
    });

    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
