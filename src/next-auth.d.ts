import { ObjectId } from 'mongodb';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email?: string;
      image?: string;
      nickname?: string;
      needsSignUp?: boolean;
      oauthId?: string;
      oauthProvider?: string;
    };
    accessToken?: string;
  }

  interface User {
    id?: string;
    email?: string;
    nickname?: string;
    image?: string;
    needsSignUp?: boolean;
    oauthId?: string;
    oauthProvider?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id?: string;
      email?: string;
      image?: string;
      nickname?: string;
      needsSignUp?: boolean;
      oauthProvider?: string;
      oauthId?: string;
    };
    accessToken?: string;
  }
}
