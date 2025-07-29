# ReviewMarkets - Prop Firm Comparison Platform

A modern, responsive web application for comparing prop trading firms. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Frontend

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dynamic Content**: Real-time data from API endpoints
- **Interactive Components**:
  - Firms comparison table with filtering
  - Testimonials carousel
  - Newsletter subscription with popup
  - Contact form with validation
- **Modern UI**: Clean, professional design with dark mode support

### Backend API

- **Firms API** (`/api/firms`): CRUD operations for prop firm data
- **Testimonials API** (`/api/testimonials`): User reviews with approval system
- **Newsletter API** (`/api/newsletter`): Email subscription management
- **Contact API** (`/api/contact`): Contact form submissions

### Admin Panel

- **Dashboard**: Overview of all data
- **Firms Management**: View and edit prop firm information
- **Testimonials Management**: Approve and manage user reviews
- **Contact Management**: View and respond to contact messages
- **Newsletter Stats**: Subscriber analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/sosnipa/reviewmarkets.git
cd propfirm-next
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── firms/             # Prop firms data
│   │   ├── testimonials/      # User reviews
│   │   ├── newsletter/        # Email subscriptions
│   │   └── contact/           # Contact form
│   ├── admin/                 # Admin panel
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── layout/                # Layout components
│   ├── ui/                    # Reusable UI components
│   └── [sections]/            # Page sections
└── lib/
    └── utils.ts               # Utility functions
```

## 🎯 Current Status

### ✅ Completed

- [x] Responsive frontend design
- [x] Dynamic API routes
- [x] Admin panel interface
- [x] Form integrations
- [x] Data filtering and search
- [x] Loading states and error handling

### 🔄 In Progress

- [ ] Database integration (currently using in-memory data)
- [ ] Authentication system
- [ ] Email service integration
- [ ] Advanced admin features

### 📋 Next Steps

1. **Database Setup**: Integrate with PostgreSQL/MongoDB
2. **Authentication**: Add user login/admin access
3. **Email Service**: Connect with SendGrid/Mailchimp
4. **Deployment**: Deploy to Vercel
5. **SEO Optimization**: Add meta tags and sitemap
6. **Analytics**: Add Google Analytics
7. **Testing**: Unit and integration tests

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables can be set in Vercel dashboard

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Database (when implemented)
DATABASE_URL=your_database_url

# Email Service (when implemented)
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@reviewmarkets.com

# Authentication (when implemented)
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## 📱 Pages

- **Home** (`/`): Main landing page with all sections
- **Admin** (`/admin`): Admin panel for content management

## 🎨 Customization

### Colors

The app uses CSS custom properties for theming. Main colors are defined in `src/app/globals.css`:

```css
--brand-primary: #a21caf;
--brand-secondary: #10b981;
--brand-accent: #34d399;
```

### Components

All components are built with Tailwind CSS and can be easily customized by modifying the className props.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@reviewmarkets.com or create an issue in the GitHub repository.

---

**Note**: This is a work in progress. The current implementation uses in-memory data storage. For production use, integrate with a proper database and add authentication.
