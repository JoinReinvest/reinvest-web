import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { URL as URLS } from './constants/urls';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();
  const token = await getToken({ req: request });

  if (!token) {
    const url = new URL(URLS.login, request.url);

    url.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|login|logout|register|_next/static|_next/image|favicon.ico|manifest.json).*)'],
};
