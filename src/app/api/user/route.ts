import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        const { password, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
      } else {
        throw new Error('user를 찾을 수 없습니다.');
      }
    } else {
      throw new Error('userId 파라미터가 없습니다.');
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
