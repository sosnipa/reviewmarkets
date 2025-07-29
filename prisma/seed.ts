import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default email templates
  const templates = [
    {
      name: 'Welcome Email',
      subject: 'Welcome to ReviewMarkets! 🎉',
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ReviewMarkets!</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ReviewMarkets!</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #10b981; margin-top: 0;">Hello {{name}}!</h2>
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
              <p><a href="{{unsubscribe_url}}" style="color: #10b981;">Unsubscribe</a> | <a href="{{preferences_url}}" style="color: #10b981;">Manage Preferences</a></p>
            </div>
          </body>
        </html>
      `,
      type: 'welcome',
    },
    {
      name: 'Weekly Newsletter',
      subject: 'This Week in Prop Trading 📈',
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>This Week in Prop Trading</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">This Week in Prop Trading</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">{{date}}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #10b981; margin-top: 0;">Latest Updates</h2>
              {{content}}
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>© 2024 ReviewMarkets. All rights reserved.</p>
              <p><a href="{{unsubscribe_url}}" style="color: #10b981;">Unsubscribe</a> | <a href="{{preferences_url}}" style="color: #10b981;">Manage Preferences</a></p>
            </div>
          </body>
        </html>
      `,
      type: 'newsletter',
    },
    {
      name: 'Promotional Offer',
      subject: 'Exclusive Prop Firm Deal! 🎯',
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exclusive Prop Firm Deal</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Exclusive Prop Firm Deal</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Limited Time Offer</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #10b981; margin-top: 0;">Special Offer for You</h2>
              {{content}}
              
              <div style="text-align: center; margin-top: 25px;">
                <a href="{{cta_url}}" style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Claim Offer</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>© 2024 ReviewMarkets. All rights reserved.</p>
              <p><a href="{{unsubscribe_url}}" style="color: #10b981;">Unsubscribe</a> | <a href="{{preferences_url}}" style="color: #10b981;">Manage Preferences</a></p>
            </div>
          </body>
        </html>
      `,
      type: 'promotional',
    },
  ];

  for (const template of templates) {
    await prisma.emailTemplate.upsert({
      where: { name: template.name },
      update: template,
      create: template,
    });
  }

  console.log('✅ Email templates created');

  // Create sample subscribers for testing
  const sampleSubscribers = [
    { email: 'test1@example.com', source: 'website' },
    { email: 'test2@example.com', source: 'popup' },
    { email: 'test3@example.com', source: 'landing' },
  ];

  for (const subscriber of sampleSubscribers) {
    await prisma.newsletterSubscription.upsert({
      where: { email: subscriber.email },
      update: {},
      create: subscriber,
    });
  }

  console.log('✅ Sample subscribers created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
