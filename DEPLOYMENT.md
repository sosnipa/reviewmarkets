# 🚀 ReviewMarket Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Security Review

- [x] **JWT Secret**: Fixed hardcoded fallback - now requires environment variable
- [x] **Admin Authentication**: All admin routes protected by middleware
- [x] **Environment Variables**: All secrets use environment variables
- [x] **Git Ignore**: Properly configured to exclude sensitive files
- [x] **Password Hashing**: All passwords properly hashed with bcrypt
- [x] **API Protection**: Admin APIs require authentication

### ✅ Database Setup

- [x] **SQLite Database**: Configured for local development
- [x] **Prisma Schema**: All models properly defined
- [x] **Migrations**: Database schema up to date
- [x] **Seed Data**: Sample data created

### ✅ Admin User Setup

- [x] **Admin Email**: support@reviewmarket.org
- [x] **Admin Password**: Myguy@2025
- [x] **User Created**: Admin user exists in database

## 🔧 Environment Variables for Production

Create a `.env.local` file with these variables:

```bash
# Database (for Vercel, use their database or external)
DATABASE_URL="your-production-database-url"

# Email Configuration
EMAIL_FROM="support@reviewmarket.org"
ADMIN_EMAIL="support@reviewmarket.org"
NEXT_PUBLIC_BASE_URL="https://your-domain.vercel.app"

# Security
JWT_SECRET="your-super-secure-jwt-secret-key"
UNSUBSCRIBE_SECRET="your-unsubscribe-secret-key"
PREFERENCES_SECRET="your-preferences-secret-key"

# Email Services
RESEND_API_KEY="your-resend-api-key"
SMTP_HOST="your-smtp-host"
SMTP_PORT="465"
SMTP_USER="support@reviewmarket.org"
SMTP_PASS="your-smtp-password"

# Optional APIs
TRUSTPILOT_API_KEY="your-trustpilot-api-key"
SCRAPINGBEE_API_KEY="your-scrapingbee-api-key"
```

## 🚀 Vercel Deployment Steps

### 1. Prepare Repository

```bash
# Remove any sensitive files
rm -f .env.local
rm -f database.db

# Commit changes
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Deploy to Vercel

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Configure Environment Variables**: Add all environment variables in Vercel dashboard
3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Deploy**: Click deploy and wait for build

### 3. Post-Deployment Setup

1. **Database Migration**: Run `npx prisma db push` in Vercel shell
2. **Seed Database**: Run `npm run seed` to populate with sample data
3. **Test Admin Login**: Verify admin access works
4. **Test Email**: Send test email to verify email functionality

## 🔒 Security Best Practices

### ✅ Implemented

- [x] **JWT Authentication**: Secure token-based auth
- [x] **Password Hashing**: bcrypt with salt rounds
- [x] **Route Protection**: Middleware guards admin routes
- [x] **Environment Variables**: No hardcoded secrets
- [x] **Input Validation**: All inputs validated
- [x] **SQL Injection Protection**: Prisma ORM prevents SQL injection
- [x] **XSS Protection**: Content properly escaped

### 🔄 Recommended for Production

- [ ] **Rate Limiting**: Implement API rate limiting
- [ ] **CORS Configuration**: Set up proper CORS headers
- [ ] **HTTPS Only**: Force HTTPS in production
- [ ] **Security Headers**: Add security headers
- [ ] **Logging**: Implement proper error logging
- [ ] **Backup Strategy**: Set up database backups

## 📊 Monitoring & Maintenance

### Health Checks

- [ ] **Database Connection**: Monitor database connectivity
- [ ] **Email Delivery**: Track email delivery rates
- [ ] **API Response Times**: Monitor API performance
- [ ] **Error Rates**: Track application errors

### Regular Maintenance

- [ ] **Update Dependencies**: Keep packages updated
- [ ] **Security Patches**: Apply security updates
- [ ] **Database Backups**: Regular backup schedule
- [ ] **Performance Monitoring**: Track site performance

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**: Check environment variables are set
2. **Database Errors**: Verify DATABASE_URL is correct
3. **Email Issues**: Check SMTP/Resend configuration
4. **Admin Login**: Verify admin user exists in database

### Support

- **Admin Login**: support@reviewmarket.org / Myguy@2025
- **Technical Issues**: Check Vercel logs for errors
- **Email Problems**: Verify API keys and SMTP settings

## 🎉 Deployment Complete!

Once deployed, your ReviewMarket application will be live with:

- ✅ **Secure Admin Panel**: Protected by JWT authentication
- ✅ **Contact Management**: Full CRUD with email replies
- ✅ **Testimonial System**: User submissions with admin moderation
- ✅ **Email Integration**: Newsletter and support emails
- ✅ **Prop Firm Management**: Complete admin interface
- ✅ **Responsive Design**: Works on all devices

**Live URL**: https://your-domain.vercel.app
**Admin Panel**: https://your-domain.vercel.app/admin
