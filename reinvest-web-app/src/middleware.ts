// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/referral/')) {
    const split = request.nextUrl.pathname.split('/');

    if (split.length >= 3) {
      return NextResponse.redirect(new URL(`/register/?referral=${split[2]}`, request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/referral/:path*'],
};
