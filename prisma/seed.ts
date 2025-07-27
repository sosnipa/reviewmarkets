import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.userFavorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.propFirm.deleteMany();
  await prisma.newsletterSubscription.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.user.deleteMany();

  // Create prop firms
  const firms = [
    {
      name: 'Alpha Capital',
      logo: '/Logo.png',
      country: 'GB',
      rating: 4.4,
      reviews: 893,
      years: 3,
      assets: JSON.stringify(['FX', 'Indices', 'Metals', 'Other Commodities']),
      platforms: JSON.stringify(['MT4', 'MT5']),
      maxAllocation: '$400K',
      promo: '15% OFF',
      description: 'Leading prop firm with excellent track record',
      website: 'https://example.com',
    },
    {
      name: 'The5ers',
      logo: '/Logo.png',
      country: 'IL',
      rating: 4.8,
      reviews: 986,
      years: 9,
      assets: JSON.stringify(['Crypto', 'Energy', 'FX', 'Other Commodities']),
      platforms: JSON.stringify(['MT4', 'cTrader']),
      maxAllocation: '$615K',
      promo: '5% OFF',
      description: 'Established firm with strong community',
      website: 'https://example.com',
    },
    {
      name: 'E8 Markets',
      logo: '/Logo.png',
      country: 'US',
      rating: 4.7,
      reviews: 134,
      years: 2,
      assets: JSON.stringify(['FX', 'Indices', 'Metals']),
      platforms: JSON.stringify(['MT5']),
      maxAllocation: '$900K',
      promo: '5% OFF',
      description: 'US-based firm with high allocation limits',
      website: 'https://example.com',
    },
    {
      name: 'FTMO',
      logo: '/Logo.png',
      country: 'CZ',
      rating: 4.6,
      reviews: 1247,
      years: 8,
      assets: JSON.stringify(['FX', 'Indices', 'Metals', 'Crypto']),
      platforms: JSON.stringify(['MT4', 'MT5']),
      maxAllocation: '$2M',
      promo: '10% OFF',
      description: 'One of the largest prop trading firms',
      website: 'https://example.com',
    },
    {
      name: 'MyForexFunds',
      logo: '/Logo.png',
      country: 'CA',
      rating: 4.3,
      reviews: 567,
      years: 4,
      assets: JSON.stringify(['FX', 'Indices', 'Metals']),
      platforms: JSON.stringify(['MT4', 'MT5']),
      maxAllocation: '$600K',
      promo: '20% OFF',
      description: 'Canadian firm with competitive pricing',
      website: 'https://example.com',
    },
  ];

  for (const firm of firms) {
    await prisma.propFirm.create({
      data: firm,
    });
  }

  // Create some sample users
  const users = [
    {
      email: 'alice@example.com',
      name: 'Alice Johnson',
    },
    {
      email: 'brian@example.com',
      name: 'Brian Lee',
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Create some sample newsletter subscriptions
  const subscriptions = [
    {
      email: 'test@example.com',
      source: 'landing_page',
    },
    {
      email: 'demo@example.com',
      source: 'popup',
    },
  ];

  for (const subscription of subscriptions) {
    await prisma.newsletterSubscription.create({
      data: subscription,
    });
  }

  // Create some sample contact messages
  const messages = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'I would like to learn more about your prop firm comparison service.',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Partnership Opportunity',
      message: 'I represent a prop firm and would like to discuss partnership opportunities.',
    },
  ];

  for (const message of messages) {
    await prisma.contactMessage.create({
      data: message,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
