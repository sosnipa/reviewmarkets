import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default email templates
  const templates = [
    {
      name: 'Welcome Email',
      subject: 'Welcome to ReviewMarket! 🎉',
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ReviewMarket!</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ReviewMarket!</h1>
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
              <p>© 2025 ReviewMarket. All rights reserved.</p>
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
              <p>© 2025 ReviewMarket. All rights reserved.</p>
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
              <p>© 2025 ReviewMarket. All rights reserved.</p>
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

  // Create sample prop firms for testing
  const sampleFirms = [
    {
      name: 'FTMO',
      logo: 'https://via.placeholder.com/150x150/10b981/ffffff?text=FTMO',
      country: 'Czech Republic',
      rating: 4.6,
      reviews: 1247,
      years: 8,
      assets: ['FX', 'Indices', 'Metals', 'Crypto'],
      platforms: ['MT4', 'MT5'],
      maxAllocation: '$2M',
      promo: '10% OFF',
      description: 'One of the largest prop trading firms with excellent reputation',
      website: 'https://ftmo.com',
    },
    {
      name: 'MyForexFunds',
      logo: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=MFF',
      country: 'Canada',
      rating: 4.3,
      reviews: 567,
      years: 4,
      assets: ['FX', 'Indices', 'Metals'],
      platforms: ['MT4', 'MT5'],
      maxAllocation: '$600K',
      promo: '20% OFF',
      description: 'Canadian firm with competitive pricing and good support',
      website: 'https://myforexfunds.com',
    },
    {
      name: 'The5ers',
      logo: 'https://via.placeholder.com/150x150/f59e0b/ffffff?text=5ers',
      country: 'Israel',
      rating: 4.4,
      reviews: 892,
      years: 6,
      assets: ['FX', 'Indices', 'Metals', 'Crypto'],
      platforms: ['MT4', 'MT5', 'cTrader'],
      maxAllocation: '$1.5M',
      promo: '15% OFF',
      description: 'Innovative prop firm with flexible funding options',
      website: 'https://the5ers.com',
    },
    {
      name: 'Earn2Trade',
      logo: 'https://via.placeholder.com/150x150/ef4444/ffffff?text=E2T',
      country: 'United States',
      rating: 4.2,
      reviews: 445,
      years: 5,
      assets: ['FX', 'Indices', 'Metals'],
      platforms: ['MT4', 'MT5'],
      maxAllocation: '$400K',
      promo: '25% OFF',
      description: 'US-based firm with comprehensive training programs',
      website: 'https://earn2trade.com',
    },
    {
      name: 'SurgeTrader',
      logo: 'https://via.placeholder.com/150x150/8b5cf6/ffffff?text=ST',
      country: 'United States',
      rating: 4.5,
      reviews: 678,
      years: 3,
      assets: ['FX', 'Indices', 'Metals', 'Crypto'],
      platforms: ['MT4', 'MT5'],
      maxAllocation: '$1M',
      promo: '30% OFF',
      description: 'Fast-growing prop firm with excellent profit splits',
      website: 'https://surgetrader.com',
    },
  ];

  for (const firm of sampleFirms) {
    await prisma.propFirm.upsert({
      where: { name: firm.name },
      update: {
        logo: firm.logo,
        country: firm.country,
        rating: firm.rating,
        reviews: firm.reviews,
        years: firm.years,
        assets: JSON.stringify(firm.assets),
        platforms: JSON.stringify(firm.platforms),
        maxAllocation: firm.maxAllocation,
        promo: firm.promo,
        description: firm.description,
        website: firm.website,
      },
      create: {
        name: firm.name,
        logo: firm.logo,
        country: firm.country,
        rating: firm.rating,
        reviews: firm.reviews,
        years: firm.years,
        assets: JSON.stringify(firm.assets),
        platforms: JSON.stringify(firm.platforms),
        maxAllocation: firm.maxAllocation,
        promo: firm.promo,
        description: firm.description,
        website: firm.website,
      },
    });
  }

  console.log('✅ Sample prop firms created');

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Alice Johnson',
      title: 'Day Trader',
      review:
        'This platform made it so easy to compare prop firms. I found the perfect fit for my trading style! The detailed reviews and filters saved me hours of research.',
      rating: 5,
      isApproved: true,
      source: 'user',
      firmName: 'FTMO',
      email: 'alice@example.com',
    },
    {
      name: 'Brian Lee',
      title: 'Forex Trader',
      review:
        'The reviews and filters are top-notch. I saved hours of research and found exactly what I was looking for. Highly recommended for any serious trader!',
      rating: 5,
      isApproved: true,
      source: 'user',
      firmName: 'The5ers',
      email: 'brian@example.com',
    },
    {
      name: 'Sarah Chen',
      title: 'Swing Trader',
      review:
        'Excellent comparison tool! The platform helped me understand the differences between various prop firms and choose the best one for my trading strategy.',
      rating: 4,
      isApproved: true,
      source: 'user',
      firmName: 'MyForexFunds',
      email: 'sarah@example.com',
    },
    {
      name: 'Michael Rodriguez',
      title: 'Crypto Trader',
      review:
        'Great resource for comparing prop firms. The detailed breakdown of fees, platforms, and requirements made my decision much easier.',
      rating: 5,
      isApproved: true,
      source: 'user',
      firmName: 'Earn2Trade',
      email: 'michael@example.com',
    },
    {
      name: 'Emma Wilson',
      title: 'Scalper',
      review:
        'This platform is a game-changer for prop firm research. The user reviews are honest and the comparison features are incredibly helpful.',
      rating: 5,
      isApproved: true,
      source: 'user',
      firmName: 'SurgeTrader',
      email: 'emma@example.com',
    },
    {
      name: 'David Thompson',
      title: 'Options Trader',
      review:
        'Finally found a comprehensive comparison site for prop firms. The platform helped me avoid costly mistakes and find the right firm for my needs.',
      rating: 4,
      isApproved: false, // Pending approval
      source: 'user',
      firmName: 'FTMO',
      email: 'david@example.com',
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.name.toLowerCase().replace(' ', '-')}` },
      update: testimonial,
      create: testimonial,
    });
  }

  console.log('✅ Sample testimonials created');

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
