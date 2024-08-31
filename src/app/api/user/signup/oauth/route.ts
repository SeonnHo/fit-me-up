import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  oauthId: string;
  email: string;
  nickname: string;
  provider: string;
}

export async function POST(reqeust: NextRequest) {
  const { oauthId, email, nickname, provider }: RequestBody =
    await reqeust.json();

  try {
    const createdOAuthUser = await prisma.oAuthUser.create({
      data: {
        oauthId,
        email,
        nickname,
        provider,
      },
    });

    return NextResponse.json(createdOAuthUser);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
