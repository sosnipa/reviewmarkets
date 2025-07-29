import { Resend } from 'resend';
import nodemailer from 'nodemailer';

interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

interface BulkEmailData {
  subscribers: string[];
  subject: string;
  html: string;
  from?: string;
}

class HybridEmailService {
  private resend: Resend | null = null;
  private smtpTransporter: nodemailer.Transporter | null = null;

  private getResend() {
    if (!this.resend) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
    return this.resend;
  }

  private getSmtpTransporter() {
    if (!this.smtpTransporter) {
      this.smtpTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'reviewmarket.org',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || 'support@reviewmarket.org',
          pass: process.env.SMTP_PASS || '',
        },
      });
    }
    return this.smtpTransporter;
  }

  // Send email using Resend (for newsletters)
  async sendResendEmail(data: EmailData) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Resend API key not configured');
    }

    try {
      const result = await this.getResend().emails.send({
        from: data.from || process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: Array.isArray(data.to) ? data.to[0] : data.to, // Only first recipient in TO
        bcc: Array.isArray(data.to) && data.to.length > 1 ? data.to.slice(1) : undefined, // Rest in BCC
        subject: data.subject,
        html: data.html,
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }
  }

  // Send email using cPanel SMTP (for support)
  async sendSmtpEmail(data: EmailData) {
    try {
      const result = await this.getSmtpTransporter().sendMail({
        from: data.from || process.env.SMTP_USER || 'support@reviewmarket.org',
        to: Array.isArray(data.to) ? data.to[0] : data.to, // Only first recipient in TO
        bcc: Array.isArray(data.to) && data.to.length > 1 ? data.to.slice(1) : undefined, // Rest in BCC
        subject: data.subject,
        html: data.html,
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('SMTP email error:', error);
      return { success: false, error };
    }
  }

  // Send welcome email (using Resend for better deliverability)
  async sendWelcomeEmail(email: string, name?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
    const preferencesUrl = `${baseUrl}/preferences?email=${encodeURIComponent(email)}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ReviewMarkets!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
            <p style="color: white; margin: 0; font-size: 18px; opacity: 0.9;">Welcome to the community! 🎉</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #10b981; margin-top: 0;">Hello ${name || 'there'}!</h2>
            <p>Thank you for subscribing to our newsletter! You're now part of our community of traders who get the latest insights on prop firms, exclusive deals, and market updates.</p>
            
            <h3 style="color: #10b981;">What you'll receive:</h3>
            <ul style="color: #666;">
              <li>Latest prop firm reviews and comparisons</li>
              <li>Exclusive deals and promotions</li>
              <li>Market insights and trading tips</li>
              <li>Early access to new features</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>© 2024 ReviewMarkets. All rights reserved.</p>
            <p><a href="${unsubscribeUrl}" style="color: #10b981;">Unsubscribe</a> | <a href="${preferencesUrl}" style="color: #10b981;">Manage Preferences</a></p>
          </div>
        </body>
      </html>
    `;

    return this.sendResendEmail({
      to: email,
      subject: 'Welcome to ReviewMarkets Newsletter! 🎉',
      html,
      from: 'ReviewMarkets Team <support@reviewmarket.org>',
    });
  }

  // Send admin notification (using SMTP for support communication)
  async sendAdminNotification(email: string, name?: string) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Newsletter Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #10b981; margin-top: 0;">New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>ReviewMarkets Admin Notification</p>
          </div>
        </body>
      </html>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || 'support@reviewmarket.org';

    return this.sendSmtpEmail({
      to: adminEmail,
      subject: `New Newsletter Subscription: ${email}`,
      html,
    });
  }

  // Send bulk newsletter (using Resend for better deliverability)
  async sendBulkNewsletter(data: BulkEmailData) {
    return this.sendResendEmail({
      to: data.subscribers,
      subject: data.subject,
      html: data.html,
    });
  }

  // Send promotional email (using Resend)
  async sendPromotionalEmail(subscribers: string[], subject: string, content: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
            <p style="color: white; margin: 0; font-size: 16px;">Exclusive Promotional Offer</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            ${content}
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>© 2024 ReviewMarkets. All rights reserved.</p>
            <p><a href="${baseUrl}/unsubscribe" style="color: #10b981;">Unsubscribe</a> | <a href="${baseUrl}/preferences" style="color: #10b981;">Manage Preferences</a></p>
          </div>
        </body>
      </html>
    `;

    return this.sendResendEmail({
      to: subscribers,
      subject,
      html,
    });
  }

  // Send support email (using SMTP)
  async sendSupportEmail(to: string, subject: string, content: string) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ReviewMarkets</h1>
            <p style="color: white; margin: 0; font-size: 16px;">Support Team</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            ${content}
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>© 2024 ReviewMarkets. All rights reserved.</p>
            <p>Need help? Reply to this email or contact us at support@reviewmarket.org</p>
          </div>
        </body>
      </html>
    `;

    return this.sendSmtpEmail({
      to,
      subject,
      html,
    });
  }

  // Send individual email (choose based on type)
  async sendIndividualEmail(
    to: string,
    subject: string,
    content: string,
    type: 'newsletter' | 'support' = 'newsletter'
  ) {
    if (type === 'support') {
      return this.sendSupportEmail(to, subject, content);
    } else {
      return this.sendResendEmail({
        to,
        subject,
        html: content,
      });
    }
  }
}

// Export singleton instance
const hybridEmailService = new HybridEmailService();
export default hybridEmailService;
