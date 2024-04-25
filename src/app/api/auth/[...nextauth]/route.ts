import { NextApiRequest } from 'next';
import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
  ],
  callbacks: {
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
