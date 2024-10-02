import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          nickname: true,
          profileImageUrl: true,
          createdAt: true,
          posts: true,
          likePosts: true,
          comments: true,
        },
      });

      if (user) {
        return NextResponse.json(user);
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
