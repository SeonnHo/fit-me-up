import { ObjectId } from 'mongodb';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | null | undefined;
      email?: string | null | undefined;
      nickname?: string | null | undefined;
      accessToken?: string | null | undefined;
    };
  }

  interface User {
    nickname?: string | null | undefined;
  }
}
