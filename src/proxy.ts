import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect /admin/* routes (except /admin/login)
// Next.js 16 uses "proxy" convention (replaces "middleware")
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page always
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // For /admin/* routes, check for session cookie
  if (pathname.startsWith('/admin')) {
    const sessionCookie =
      request.cookies.get('__Secure-next-auth.session-token') ||
      request.cookies.get('next-auth.session-token');

    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
