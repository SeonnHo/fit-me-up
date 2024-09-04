import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const email: string = await request.json();

  try {
    const existedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existedUser) return NextResponse.json(true);

    return NextResponse.json(false);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
