import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit');
  const pageParam = searchParams.get('page');
  const userId = searchParams.get('userId');
  const category = searchParams.get('category');

  try {
    if (!limit) {
      throw new Error('"limit" does not have a value.');
    }

    if (!pageParam) {
      throw new Error('"pageParam" does not have a value.');
    }

    if (!userId) {
      throw new Error('"userId" does not have a value.');
    }

    if (!category) {
      throw new Error('"category" does not have a value');
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        ...(category === 'todayFit'
          ? { category: category }
          : { NOT: { category: 'todayFit' } }),
      },
      skip: (Number(pageParam) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        id: 'desc',
      },
      include: {
        author: {
          select: {
            nickname: true,
            profileImageUrl: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({
      posts: posts,
      page: Number(pageParam),
      next: posts.length < Number(limit) ? null : true,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
