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
          if (!isTokenExists) {
            return true;
          }
        }

        return isTokenExists;
      },
    },
  },
);

export const config = {
  matcher: ['/backoffice/:path*'],
};
