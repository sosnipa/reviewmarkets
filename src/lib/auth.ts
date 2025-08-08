import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security configuration
const SALT_ROUNDS = 12;
const JWT_EXPIRES_IN = '24h';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// JWT secret - must be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// In-memory store for login attempts (in production, use Redis or database)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

// Admin user interface
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  createdAt: Date;
}

export class AuthService {
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Verify a password against its hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token for admin user
   */
  static async generateToken(user: AdminUser): Promise<string> {
    const encoder = new TextEncoder();
    const jwt = await new jose.SignJWT({ id: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(encoder.encode(JWT_SECRET));
    return jwt;
  }

  /**
   * Verify JWT token and return user data
   */
  static async verifyToken(token: string): Promise<AdminUser | null> {
    try {
      const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      return {
        id: payload.id as string,
        email: payload.email as string,
        role: payload.role as 'admin',
        createdAt: new Date(), // We don't need the actual createdAt for verification
      };
    } catch (error) {
      console.log('AuthService.verifyToken - Token verification failed:', error);
      return null;
    }
  }

  /**
   * Check if user is locked out due to too many login attempts
   */
  static isLockedOut(identifier: string): boolean {
    const attempts = loginAttempts.get(identifier);
    if (!attempts) return false;

    if (Date.now() < attempts.lockedUntil) {
      return true;
    }

    // Clear expired lockout
    loginAttempts.delete(identifier);
    return false;
  }

  /**
   * Record a failed login attempt
   */
  static recordFailedAttempt(identifier: string): void {
    const attempts = loginAttempts.get(identifier) || { count: 0, lockedUntil: 0 };
    attempts.count++;

    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      attempts.lockedUntil = Date.now() + LOCKOUT_DURATION;
    }

    loginAttempts.set(identifier, attempts);
  }

  /**
   * Clear failed login attempts on successful login
   */
  static clearFailedAttempts(identifier: string): void {
    loginAttempts.delete(identifier);
  }

  /**
   * Get remaining lockout time in seconds
   */
  static getRemainingLockoutTime(identifier: string): number {
    const attempts = loginAttempts.get(identifier);
    if (!attempts || Date.now() >= attempts.lockedUntil) {
      return 0;
    }
    return Math.ceil((attempts.lockedUntil - Date.now()) / 1000);
  }

  /**
   * Get remaining login attempts
   */
  static getRemainingAttempts(identifier: string): number {
    const attempts = loginAttempts.get(identifier);
    if (!attempts) return MAX_LOGIN_ATTEMPTS;
    return Math.max(0, MAX_LOGIN_ATTEMPTS - attempts.count);
  }
}

/**
 * Middleware helper to extract and verify admin token
 */
export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  const adminTokenCookie = request.cookies.get('admin_token');
  const token = adminTokenCookie?.value;
  if (!token) return null;

  const user = await AuthService.verifyToken(token);
  return user;
}

/**
 * Create a secure admin session
 */
export async function createAdminSession(user: AdminUser): Promise<NextResponse> {
  const token = await AuthService.generateToken(user);
  const response = NextResponse.json({
    success: true,
    user: { email: user.email, role: user.role },
  });

  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: false, // Set to false for localhost
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });

  return response;
}

/**
 * Clear admin session
 */
export function clearAdminSession(): NextResponse {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
