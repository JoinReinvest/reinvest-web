import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware (request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const response = NextResponse.next()
  const token = await getToken({ req: request })

  if (!token) {
    const url = new URL(`/login`, request.url)

    url.searchParams.set("callbackUrl", pathname)

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|login|register|_next/static|_next/image|favicon.ico).*)',
  ],
}
