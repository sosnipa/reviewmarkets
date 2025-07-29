import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin authentication using JWT
    const adminUser = getAdminFromRequest(request);

    // If no valid token, redirect to admin login
    if (!adminUser) {
      console.log('Admin authentication failed, redirecting to login');
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    console.log('Admin authentication successful for:', adminUser.email);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
