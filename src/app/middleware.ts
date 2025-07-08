// src/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Map of route prefixes to required roles
const ROLE_MAP: Record<string, string> = {
  '/admin': 'ADMIN',
  '/seller': 'SELLER'
};

// Public paths and assets
const PUBLIC_PATHS = ['/', '/login', '/signup', '/favicon.ico'];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip auth for public paths, Next.js internals and API routes
  if (pathname.match(/^\/(?:api|_next|static)\//) || PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Get NextAuth token (JWT) to identify session and role
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // Not authenticated: redirect to login with callbackUrl
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = `?callbackUrl=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  for (const prefix in ROLE_MAP) {
    if (pathname.startsWith(prefix)) {
      const required = ROLE_MAP[prefix];
      if (token.role !== required) {
        // Forbidden: redirect to home or custom error page
        return NextResponse.redirect(new URL('/', req.url));
      }
      break;
    }
  }

  // Authenticated and authorized
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|static|favicon\.ico).*)'
};
