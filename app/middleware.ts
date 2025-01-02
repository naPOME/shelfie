// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  const protectedRoutes = ['/bookCollection', '/bookSection', '/bookDetail', '/bookSummery', '/dashboard'];

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookCollection', '/bookSection', '/bookDetail/:path*', '/bookSummery', '/dashboard'],
};