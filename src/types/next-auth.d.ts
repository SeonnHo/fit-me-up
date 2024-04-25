import { ObjectId } from 'mongodb';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null | undefined;
      email?: string | null | undefined;
      nickname?: string | null | undefined;
      accessToken?: string | null | undefined;
    };
  }
}
