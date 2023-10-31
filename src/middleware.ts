import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isTokenExists = !!token?.accessToken;

        if (req.nextUrl.pathname === '/backoffice') {
          if (token?.user?.role.name !== 'admin') {
            return false;
          }
        }

        return isTokenExists;
      },
    },
  },
);

export const config = {
  matcher: ['/backoffice/:path*', '/member/:path*'],
};
