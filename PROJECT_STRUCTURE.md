# 📁 ReviewMarket Project Structure

## 🏗️ Directory Organization

```
propfirm-next/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 admin/              # Admin panel pages
│   │   ├── 📁 api/                # API routes
│   │   │   ├── 📁 admin/          # Admin API endpoints
│   │   │   ├── 📁 contact/        # Contact form API
│   │   │   ├── 📁 firms/          # Prop firms API
│   │   │   ├── 📁 newsletter/     # Newsletter API
│   │   │   ├── 📁 preferences/    # Email preferences API
│   │   │   ├── 📁 symbol-search/  # Symbol search API
│   │   │   ├── 📁 testimonials/   # Testimonials API
│   │   │   └── 📁 unsubscribe/    # Unsubscribe API
│   │   ├── 📁 preferences/        # Email preferences page
│   │   ├── 📁 testimonials/       # Testimonials page
│   │   ├── 📁 unsubscribe/        # Unsubscribe page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Homepage
│   ├── 📁 components/             # React components
│   │   ├── 📁 forms/              # Form components
│   │   │   ├── NewsletterForm.tsx
│   │   │   └── TestimonialForm.tsx
│   │   ├── 📁 layout/             # Layout components
│   │   │   └── Navbar.tsx
│   │   ├── 📁 sections/           # Page sections
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── FirmsGridSection.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MarketDataSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   ├── 📁 ui/                 # Shadcn UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   ├── 📁 widgets/            # Third-party widgets
│   │   │   ├── SymbolSearch.tsx
│   │   │   ├── TradingViewChart.tsx
│   │   │   ├── TradingViewNews.tsx
│   │   │   ├── TradingViewWidget.tsx
│   │   │   └── TrustpilotWidget.tsx
│   │   ├── Footer.tsx
│   │   └── middleware.ts          # Next.js middleware
│   ├── 📁 lib/                    # Utility libraries
│   │   ├── 📁 services/           # External services
│   │   │   └── trustpilot.ts      # Trustpilot API service
│   │   ├── admin-users.ts         # Admin user management
│   │   ├── auth.ts                # Authentication utilities
│   │   ├── db.ts                  # Database connection
│   │   ├── email-hybrid.ts        # Email service
│   │   └── utils.ts               # Utility functions
│   └── 📁 types/                  # TypeScript types
│       └── global.d.ts            # Global type definitions
├── 📁 prisma/                     # Database schema
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding
├── 📁 public/                     # Static assets
├── 📁 scripts/                    # Utility scripts
├── .env.local                     # Environment variables (not in git)
├── .gitignore                     # Git ignore rules
├── DEPLOYMENT.md                  # Deployment guide
├── PROJECT_STRUCTURE.md            # This file
├── README.md                      # Project documentation
├── TRUSTPILOT_SETUP.md            # Trustpilot integration guide
├── components.json                 # Shadcn UI configuration
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎯 Component Categories

### **📋 Forms** (`src/components/forms/`)

- **NewsletterForm**: Newsletter subscription form
- **TestimonialForm**: User testimonial submission form

### **🏗️ Layout** (`src/components/layout/`)

- **Navbar**: Main navigation component
- **Footer**: Site footer component

### **📄 Sections** (`src/components/sections/`)

- **Hero**: Landing page hero section
- **FeaturesSection**: Product features showcase
- **FirmsGridSection**: Prop firms grid display
- **MarketDataSection**: Trading data and charts
- **TestimonialsSection**: User testimonials carousel
- **NewsletterSection**: Newsletter subscription section
- **ContactSection**: Contact form section

### **🔧 Widgets** (`src/components/widgets/`)

- **TradingViewWidget**: Market quotes widget
- **TradingViewChart**: Advanced trading chart
- **TradingViewNews**: Market news feed
- **SymbolSearch**: Symbol search functionality
- **TrustpilotWidget**: Trustpilot integration

### **🎨 UI Components** (`src/components/ui/`)

- **Badge**: Status and label components
- **Button**: Button components with variants
- **Card**: Card layout components
- **Dialog**: Modal dialog components
- **DropdownMenu**: Dropdown menu components
- **Input**: Form input components
- **Select**: Select dropdown components
- **Textarea**: Multi-line text input

## 🔌 API Routes

### **🔐 Admin APIs** (`src/app/api/admin/`)

- **Login**: Admin authentication
- **Logout**: Admin session termination
- **Change Password**: Password management
- **Forgot Password**: Password reset
- **Analytics**: Dashboard analytics
- **Subscribers**: Newsletter subscriber management
- **Testimonials**: Testimonial moderation
- **Contact**: Contact message management
- **Templates**: Email template management

### **🌐 Public APIs** (`src/app/api/`)

- **Contact**: Contact form submission
- **Firms**: Prop firm data
- **Newsletter**: Newsletter subscription
- **Preferences**: Email preferences
- **Testimonials**: Public testimonial access
- **Unsubscribe**: Newsletter unsubscribe
- **Symbol Search**: Trading symbol search

## 🗄️ Database Models

### **👥 User Management**

- **AdminUser**: Admin authentication and management
- **User**: General user accounts
- **NewsletterSubscription**: Newsletter subscribers

### **💬 Content Management**

- **ContactMessage**: Contact form submissions
- **Testimonial**: User testimonials and reviews
- **PropFirm**: Prop trading firm data
- **Review**: User reviews for prop firms
- **UserFavorite**: User favorite firms

### **📧 Email System**

- **EmailCampaign**: Email campaign tracking
- **EmailEvent**: Email delivery events
- **EmailTemplate**: Email template management

### **📊 Data**

- **MarketData**: Market data caching

## 🔧 Services

### **📧 Email Service** (`src/lib/email-hybrid.ts`)

- **Resend Integration**: For newsletters and marketing emails
- **SMTP Integration**: For support and transactional emails
- **Template System**: HTML email templates
- **Bulk Email**: Newsletter campaigns

### **🔐 Authentication** (`src/lib/auth.ts`)

- **JWT Tokens**: Secure session management
- **Password Hashing**: bcrypt with salt rounds
- **Admin Middleware**: Route protection

### **🌐 External APIs** (`src/lib/services/`)

- **Trustpilot**: Review integration (optional)

## 🎨 Styling

### **🎨 Tailwind CSS**

- **Custom Theme**: Brand colors and typography
- **Responsive Design**: Mobile-first approach
- **Component Variants**: Consistent design system

### **🎭 Framer Motion**

- **Animations**: Smooth page transitions
- **Micro-interactions**: Enhanced user experience
- **Carousels**: Testimonial and content carousels

## 🚀 Deployment

### **📋 Environment Variables**

- **Database**: DATABASE_URL
- **Email**: RESEND*API_KEY, SMTP*\*
- **Security**: JWT_SECRET, UNSUBSCRIBE_SECRET
- **External APIs**: TRUSTPILOT_API_KEY

### **🔒 Security Features**

- **JWT Authentication**: Secure admin access
- **Password Hashing**: bcrypt encryption
- **Route Protection**: Middleware guards
- **Input Validation**: Form validation
- **SQL Injection Protection**: Prisma ORM

## 📊 Features Overview

### **✅ Implemented**

- **Admin Panel**: Complete CRUD operations
- **Contact Management**: Form submissions with email replies
- **Testimonial System**: User submissions with admin moderation
- **Newsletter System**: Subscription management
- **Prop Firm Management**: Database-driven firm data
- **TradingView Integration**: Market data widgets
- **Email Integration**: Newsletter and support emails
- **Responsive Design**: Mobile and desktop optimized

### **🔄 Future Enhancements**

- **Rate Limiting**: API protection
- **CORS Configuration**: Cross-origin requests
- **Security Headers**: Enhanced security
- **Logging System**: Error tracking
- **Backup Strategy**: Data protection
- **Performance Monitoring**: Site optimization
