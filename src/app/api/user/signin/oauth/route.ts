import prisma from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const oauthId = searchParams.get('oauthId');
  const provider = searchParams.get('provider');

  try {
    if (oauthId && provider) {
      const oauthUser = await prisma.oAuthUser.findUnique({
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
