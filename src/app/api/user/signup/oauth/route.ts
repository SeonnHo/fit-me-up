import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  oauthId: string;
  email: string;
  nickname: string;
  provider: string;
  image?: string;
}

export async function POST(reqeust: NextRequest) {
  const { oauthId, email, nickname, provider, image }: RequestBody =
    await reqeust.json();

  try {
    const createdOAuthUser = await prisma.user.create({
      data: {
        oauthId,
        email,
        nickname,
        provider,
        profileImageUrl: image
          ? process.env.PROFILE_URL + image
          : process.env.DEFAULT_PROFILE_URL,
      },
    });

    return NextResponse.json(createdOAuthUser);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
