import { NextApiRequest } from 'next';
import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';

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
    async signIn({ user, account, profile }) {
      const apiUrl = `${process.env.NEXTAUTH_URL}/api/user/signin/oauth?oauthId=${user.id}&provider=${account?.provider}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const existedUser = await response.json();

      if (existedUser) {
        if (!existedUser.nickname && !existedUser.email) {
          return `/sign-up/oauth/${account?.provider}/${user.id}`;
        } else {
          user.email = existedUser.email;
          user.nickname = existedUser.nickname;
          return true;
        }
      }

      if (!existedUser) {
        return `/sign-up/oauth/${account?.provider}/${user.id}`;
      }

      return false;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
          oauthId: user.id,
          authType: account?.provider,
        };
      }

      return token;
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
