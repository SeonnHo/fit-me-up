import { connectDB } from '@/lib/database';
import { NextApiRequest } from 'next';
import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';

interface User {
  _id: string;
  email: string | null | undefined;
  password: string | null | undefined;
  nickname: string | null | undefined;
  type: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(
        credentials: Record<'email' | 'password', any> | undefined,
        req:
          | Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
          | NextApiRequest
      ) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: String(profile.id),
          email: profile.email,
          image: profile.properties.profile_image,
          nickname: profile.properties.nickname,
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.response.id,
          email: undefined,
          nickname: profile.response.nickname,
          image: profile.response.profile_image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          nickname: profile.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'kakao') {
        const database = connectDB.db('fit_me_up');
        const usersCollection = database.collection<User>('users');

        const existingUser = await usersCollection.findOne<User>({
          _id: user.id,
        });

        if (!existingUser) {
          const newUser = await usersCollection.insertOne({
            _id: user.id,
            email: null,
            password: null,
            nickname: null,
            type: account!.provider,
          });

          return `/sign-up/oauth/${account!.provider}/${newUser.insertedId}`;
        }

        if (!existingUser.nickname) {
          return `/sign-up/oauth/${account!.provider}/${existingUser._id}`;
        } else {
          user.nickname = existingUser.nickname;
        }
      }

      if (account?.provider === 'naver') {
        const database = connectDB.db('fit_me_up');
        const usersCollection = database.collection<User>('users');

        const existingUser = await usersCollection.findOne<User>({
          _id: user.id,
        });

        if (!existingUser) {
          const newUser = await usersCollection.insertOne({
            _id: user.id,
            email: null,
            password: null,
            nickname: null,
            type: account.provider,
          });

          return `/sign-up/oauth/${account.provider}/${newUser.insertedId}`;
        }

        if (!existingUser.nickname) {
          return `/sign-up/oauth/${account!.provider}/${existingUser._id}`;
        } else {
          user.nickname = existingUser.nickname;
        }
      }

      if (account?.provider === 'google') {
        const database = connectDB.db('fit_me_up');
        const usersCollection = database.collection<User>('users');

        const existingUser = await usersCollection.findOne<User>({
          _id: user.id,
        });

        if (!existingUser) {
          const newUser = await usersCollection.insertOne({
            _id: user.id,
            email: user.email,
            password: null,
            nickname: null,
            type: account.provider,
          });

          return `/sign-up/oauth/${account.provider}/${newUser.insertedId}`;
        }

        if (!existingUser.nickname) {
          return `/sign-up/oauth/${account!.provider}/${existingUser._id}`;
        } else {
          user.nickname = existingUser.nickname;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
  },
});

export { handler as GET, handler as POST };
