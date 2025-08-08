import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { AdminUserService } from '@/lib/admin-users';
import { createAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check for lockout
    if (AuthService.isLockedOut(email)) {
      const remainingTime = AuthService.getRemainingLockoutTime(email);
      return NextResponse.json(
        {
          error: `Account temporarily locked. Try again in ${Math.ceil(remainingTime / 60)} minutes.`,
          locked: true,
          remainingTime,
        },
        { status: 429 }
      );
    }

    // Verify credentials
    const user = await AdminUserService.verifyCredentials(email, password);

    if (!user) {
      // Record failed attempt
      AuthService.recordFailedAttempt(email);
      const remainingAttempts = AuthService.getRemainingAttempts(email);

      return NextResponse.json(
        {
          error: `Invalid credentials. ${remainingAttempts} attempts remaining.`,
          remainingAttempts,
        },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    AuthService.clearFailedAttempts(email);

    // Create secure session
    return await createAdminSession(user);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}
