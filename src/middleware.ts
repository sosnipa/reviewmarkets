import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin authentication using JWT
    const adminUser = await getAdminFromRequest(request);

    // If no valid token, redirect to admin login
    if (!adminUser) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Valid token, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
