import { authSignin } from '@/modules/auth/api';
import { chnageCommunityActived } from '@/services/redux/reducers/userReducer';
import store from '@/services/redux/store';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
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
          const resp = await authSignin({
            email: credentials.email,
            password: credentials.password,
          });

          if (resp.data.user?.community.length) {
            store.dispatch(
              chnageCommunityActived(resp.data.user.community[0].id),
            );
          }

          return {
            ...resp.data,
            id: String(resp.data.user?.id || ''),
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log('Failed signin: ', error);

          throw new Error(error.message);
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
        user: token.user,
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);
