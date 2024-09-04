import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  oauthId: string;
  provider: string;
}

export async function POST(request: NextRequest) {
  const { oauthId, provider }: RequestBody = await request.json();

  try {
    if (oauthId && provider) {
      const oauthUser = await prisma.user.findUnique({
        where: {
          oauthId,
          provider,
        },
      });

      return NextResponse.json(oauthUser);
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
