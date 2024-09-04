import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const nickname: string = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });

    if (user) return NextResponse.json(true);

    return NextResponse.json(false);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
