import { Resend } from 'resend';

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
  source?: string;
}

export interface BulkEmailData {
  subscribers: string[];
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private static instance: EmailService;
  private resend: Resend;

  private constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Send a single email
   */
  async sendEmail(data: EmailData) {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.log('Resend API key not configured, skipping email send');
        return { success: false, error: 'API key not configured' };
      }

      const result = await this.resend.emails.send({
        from: data.from || process.env.EMAIL_FROM || 'noreply@reviewmarkets.com',
        to: data.to,
        subject: data.subject,
        html: data.html,
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }

  /**
   * Send welcome email to new newsletter subscriber
   */
  async sendWelcomeEmail(data: NewsletterData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ReviewMarkets Newsletter</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ReviewMarkets!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your trusted source for prop firm comparisons</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #2c3e50; margin-top: 0;">🎉 You're Successfully Subscribed!</h2>
            <p>Hi ${data.name || 'there'},</p>
            <p>Thank you for subscribing to our newsletter! You'll now receive:</p>
            <ul style="margin: 20px 0;">
              <li>📊 Latest prop firm reviews and comparisons</li>
              <li>💰 Exclusive deals and promotions</li>
              <li>📈 Market insights and trading tips</li>
              <li>🏆 New prop firm launches and updates</li>
            </ul>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2980b9; margin-top: 0;">What's Next?</h3>
            <p>Keep an eye on your inbox for our next newsletter. We promise to only send you valuable content that helps you make informed decisions about prop firms.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">Visit ReviewMarkets</a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>© 2024 ReviewMarkets. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.email,
      subject: 'Welcome to ReviewMarkets Newsletter! 🎉',
      html,
    });
  }

  /**
   * Send admin notification for new subscriber
   */
  async sendAdminNotification(data: NewsletterData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Newsletter Subscriber</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #2c3e50; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">New Newsletter Subscriber</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #2c3e50;">📧 New Subscription Details:</h3>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
            <p><strong>Source:</strong> ${data.source || 'Unknown'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Total Subscribers:</strong> Check your admin dashboard for the current count.</p>
          </div>
        </body>
      </html>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@reviewmarkets.com';

    return this.sendEmail({
      to: adminEmail,
      subject: '📧 New Newsletter Subscriber - ReviewMarkets',
      html,
    });
  }

  /**
   * Send bulk email to all subscribers
   */
  async sendBulkEmail(data: BulkEmailData) {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.log('Resend API key not configured, skipping bulk email');
        return { success: false, error: 'API key not configured' };
      }

      // Send emails in batches to avoid rate limits
      const batchSize = 50;
      const batches = [];

      for (let i = 0; i < data.subscribers.length; i += batchSize) {
        batches.push(data.subscribers.slice(i, i + batchSize));
      }

      const results = [];

      for (const batch of batches) {
        const result = await this.resend.emails.send({
          from: data.from || process.env.EMAIL_FROM || 'noreply@reviewmarkets.com',
          to: batch,
          subject: data.subject,
          html: data.html,
        });

        results.push(result);

        // Add delay between batches to respect rate limits
        if (batches.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return {
        success: true,
        data: results,
        totalSent: data.subscribers.length,
        batches: batches.length,
      };
    } catch (error) {
      console.error('Error sending bulk email:', error);
      return { success: false, error };
    }
  }

  /**
   * Send promotional email template
   */
  async sendPromotionalEmail(
    subscribers: string[],
    title: string,
    content: string,
    ctaText?: string,
    ctaUrl?: string
  ) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${title}</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            ${content}
          </div>
          
          ${
            ctaText && ctaUrl
              ? `
            <div style="text-align: center; margin-top: 30px;">
              <a href="${ctaUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">${ctaText}</a>
            </div>
          `
              : ''
          }
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>© 2024 ReviewMarkets. All rights reserved.</p>
            <p><a href="#" style="color: #667eea;">Unsubscribe</a> | <a href="#" style="color: #667eea;">Manage Preferences</a></p>
          </div>
        </body>
      </html>
    `;

    return this.sendBulkEmail({
      subscribers,
      subject: title,
      html,
    });
  }
}

export default EmailService.getInstance();
