import { authSigninBackoffice } from '@/modules/auth/api';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/backoffice',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const resp = await authSigninBackoffice({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            ...resp.data,
            id: String(resp.data.user?.id || ''),
          };
        } catch (error) {
          console.log('Failed signin: ', error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          user: user.user,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);
