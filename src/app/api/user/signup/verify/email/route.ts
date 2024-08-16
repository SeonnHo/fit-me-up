import { sendEmail } from '@/shared/api/mailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const email: string = await request.json();

  const randomNumber = String(Math.floor(Math.random() * 888889) + 111111);

  const mailerInfo = await sendEmail({
    email: email,
    authNumber: randomNumber,
  });

  return NextResponse.json({ ...mailerInfo, authNumber: randomNumber });
}
