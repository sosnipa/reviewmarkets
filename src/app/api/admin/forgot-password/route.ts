import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import hybridEmailService from '@/lib/email-hybrid';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if admin user exists
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!adminUser) {
      // Don't reveal if user exists or not (security best practice)
      return NextResponse.json({
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send password reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reset-password?token=${resetToken}`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Password Reset Request</h2>
        <p>Hello ${adminUser.name || 'Admin'},</p>
        <p>You requested a password reset for your admin account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>ReviewMarkets Team</p>
      </div>
    `;

    await hybridEmailService.sendSmtpEmail({
      to: adminUser.email,
      subject: 'Password Reset Request - ReviewMarkets Admin',
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
