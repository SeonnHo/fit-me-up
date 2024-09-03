import NextAuth from 'next-auth';
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

      async authorize(credentials, req) {
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
      if (account && account.provider !== 'credencials') {
        const apiUrl = `${process.env.NEXTAUTH_URL}/api/user/signin/oauth?oauthId=${user.id}&provider=${account?.provider}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }

        const existedUser = await response.json();

        if (!existedUser || (!existedUser.nickname && !existedUser.email)) {
          user.needsSignUp = true;
          user.oauthProvider = account?.provider;
          user.oauthId = user.id;
          return true;
        } else {
          user.email = existedUser.email;
          user.nickname = existedUser.nickname;
          return true;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        if (!token.user) {
          token.user = {};
        }

        token.user.id = user.id;
        token.user.email = user.email;
        token.user.nickname = user.nickname;
        token.user.image = user.image;

        if (user.needsSignUp) {
          token.user.needsSignUp = user.needsSignUp;
          token.user.oauthProvider = user.oauthProvider;
          token.user.oauthId = user.oauthId;
        }

        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = { ...token.user };
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
  },
});

export { handler as GET, handler as POST };
