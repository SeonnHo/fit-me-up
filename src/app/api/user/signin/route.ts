import prisma from '@/shared/lib/db';
import { signJwtAccessToken } from '@/shared/lib/jwt';
import * as bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.password, user.password!))) {
      const { password, ...userWithoutPassword } = user;

      const accessToken = signJwtAccessToken(userWithoutPassword);
      const result = {
        ...userWithoutPassword,
        accessToken,
      };

      return NextResponse.json(result);
    } else {
      throw new Error('이메일 또는 패스워드가 일치하지 않습니다.');
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
