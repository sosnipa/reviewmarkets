import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Security configuration
const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '24h';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// In-memory store for login attempts (in production, use Redis or database)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

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
   * Generate a JWT token for admin authentication
   */
  static generateToken(user: AdminUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  /**
   * Verify and decode a JWT token
   */
  static verifyToken(token: string): AdminUser | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
      return decoded;
    } catch {
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
export function getAdminFromRequest(request: NextRequest): AdminUser | null {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;

  return AuthService.verifyToken(token);
}

/**
 * Create a secure admin session
 */
export function createAdminSession(user: AdminUser): NextResponse {
  const token = AuthService.generateToken(user);
  const response = NextResponse.json({
    success: true,
    user: { email: user.email, role: user.role },
  });

  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
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
