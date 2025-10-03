import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const authPaths = ['/sign-in', '/sign-up'];

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const response = await intlMiddleware(req);

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (
    (token &&
      authPaths.some((path) => req.nextUrl.pathname.startsWith(path))) ||
    (!token && req.nextUrl.pathname.startsWith('/me'))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
