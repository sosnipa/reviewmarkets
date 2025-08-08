# 📚 ReviewMarket User Guide

## 🎯 Overview

ReviewMarket is a comprehensive platform for comparing and reviewing prop trading firms. This guide covers all features for both users and administrators.

## 👥 User Roles

### **🌐 Public Users**
- Browse prop firms
- Read reviews and testimonials
- Submit testimonials
- Subscribe to newsletters
- Contact support

### **🔐 Administrators**
- Manage prop firm data
- Moderate testimonials
- Handle contact messages
- Manage newsletter subscribers
- Access analytics dashboard

---

## 🌐 Public Features

### **🏠 Homepage Navigation**

#### **Hero Section**
- **Purpose**: Landing page introduction
- **Features**: Call-to-action buttons, value proposition
- **Action**: Click "Get Started" to explore prop firms

#### **Features Section**
- **Purpose**: Showcase platform benefits
- **Features**: Key selling points and platform advantages
- **Action**: Scroll to learn about platform capabilities

#### **Prop Firms Grid**
- **Purpose**: Display available prop trading firms
- **Features**: 
  - Firm cards with logos and ratings
  - Quick comparison information
  - "View Details" buttons
- **Action**: Click on any firm to see detailed information

#### **Market Data Section**
- **Purpose**: Real-time market information
- **Features**:
  - **Quotes Tab**: Live market quotes (stocks, forex, crypto)
  - **Chart Tab**: Interactive TradingView charts
  - **News Tab**: Market news feed
  - **Symbol Search**: Search for specific trading symbols
- **Action**: 
  - Switch between tabs to view different data
  - Use symbol search to find specific assets
  - Click on quotes to see detailed information

#### **Testimonials Section**
- **Purpose**: User reviews and experiences
- **Features**:
  - Carousel of approved testimonials
  - Star ratings and user photos
  - Auto-scrolling with pause/play controls
- **Action**: 
  - Click arrows to navigate
  - Click pause to stop auto-scroll
  - Click "View All" to see more testimonials

#### **Newsletter Section**
- **Purpose**: Email subscription for updates
- **Features**:
  - Email input field
  - Subscription confirmation
  - Unsubscribe link
- **Action**: 
  - Enter email address
  - Click "Subscribe" to receive updates
  - Check email for confirmation

#### **Contact Section**
- **Purpose**: Contact support team
- **Features**:
  - Contact form with name, email, message
  - Form validation
  - Success/error messages
- **Action**:
  - Fill out the contact form
  - Click "Send Message" to submit
  - Receive confirmation email

### **📄 Dedicated Pages**

#### **Testimonials Page** (`/testimonials`)
- **Purpose**: Submit and view testimonials
- **Features**:
  - Testimonial submission form
  - Preview of existing testimonials
  - Trustpilot integration
- **How to Use**:
  1. **Submit a Testimonial**:
     - Fill out the form with your name, title, review
     - Select a rating (1-5 stars)
     - Choose a prop firm (optional)
     - Click "Submit Testimonial"
     - Your review will be reviewed by admin before publication
  2. **View Testimonials**:
     - Scroll through approved testimonials
     - See ratings and user information
     - Click on Trustpilot widget to leave external reviews

#### **Email Preferences** (`/preferences`)
- **Purpose**: Manage email subscription settings
- **Features**:
  - View current subscription status
  - Update email preferences
  - Unsubscribe options
- **How to Use**:
  1. Enter your email address
  2. View current subscription status
  3. Update preferences or unsubscribe
  4. Save changes

#### **Unsubscribe** (`/unsubscribe`)
- **Purpose**: Unsubscribe from newsletters
- **Features**:
  - One-click unsubscribe
  - Confirmation message
- **How to Use**:
  1. Click unsubscribe link from email
  2. Confirm unsubscribe action
  3. Receive confirmation

---

## 🔐 Admin Panel

### **🔑 Accessing Admin Panel**

#### **Login**
- **URL**: `/admin`
- **Credentials**: 
  - Email: `support@reviewmarket.org`
  - Password: `Myguy@2025`
- **Security**: JWT-based authentication with session management

#### **Navigation**
The admin panel has several tabs:
- **Dashboard**: Overview and statistics
- **Firms**: Manage prop trading firms
- **Testimonials**: Moderate user testimonials
- **Contacts**: Handle contact messages
- **Newsletter**: Manage subscribers
- **Templates**: Email template management

### **📊 Dashboard**

#### **Overview**
- **Purpose**: Main admin dashboard with statistics
- **Features**:
  - Total prop firms count
  - Testimonial statistics (approved, pending, total)
  - Contact message statistics
  - Newsletter subscriber count
- **Action**: Click on any statistic to navigate to detailed management

### **🏢 Prop Firms Management**

#### **View Firms**
- **Purpose**: See all prop firms in the system
- **Features**:
  - Table view with firm details
  - Search and filter capabilities
  - Edit and delete actions
- **Information Displayed**:
  - Firm name and logo
  - Country and rating
  - Years in business
  - Supported assets and platforms
  - Maximum allocation

#### **Add New Firm**
1. **Click "Add New Firm"** button
2. **Fill out the form**:
   - **Name**: Firm name (required)
   - **Logo**: URL to firm logo
   - **Country**: Select from dropdown
   - **Rating**: 1-5 star rating
   - **Reviews**: Number of reviews
   - **Years**: Years in business
   - **Assets**: Select supported assets (forex, stocks, crypto, etc.)
   - **Platforms**: Select supported platforms (MT4, MT5, cTrader, etc.)
   - **Max Allocation**: Maximum account size
   - **Promo**: Promotional information
   - **Description**: Detailed firm description
   - **Website**: Firm website URL
3. **Click "Add Firm"** to save

#### **Edit Firm**
1. **Click "Edit"** button next to any firm
2. **Modify the information** in the form
3. **Click "Update Firm"** to save changes

#### **Delete Firm**
1. **Click "Delete"** button next to any firm
2. **Confirm deletion** in the popup
3. **Firm will be permanently removed**

### **💬 Testimonials Management**

#### **View Testimonials**
- **Purpose**: Manage user-submitted testimonials
- **Features**:
  - List of all testimonials (approved and pending)
  - Filter by status (All, Unread, Read, Replied)
  - Search by name, email, or review content
  - Statistics dashboard

#### **Statistics Display**
- **Total Messages**: All testimonials in system
- **Unread Messages**: Pending approval
- **Read (No Reply)**: Approved but not replied to
- **Replied Messages**: Approved and replied to

#### **Approve Testimonials**
1. **Find pending testimonial** in the list
2. **Click "Approve"** button
3. **Testimonial will be published** on the website
4. **Statistics will update** automatically

#### **Edit Testimonials**
1. **Click "Edit"** button next to any testimonial
2. **Modify the content** in the popup form
3. **Click "Save"** to update

#### **Delete Testimonials**
1. **Click "Delete"** button next to any testimonial
2. **Confirm deletion** in the popup
3. **Testimonial will be permanently removed**

### **📧 Contact Messages Management**

#### **View Messages**
- **Purpose**: Handle user contact form submissions
- **Features**:
  - List of all contact messages
  - Filter by status (All, Unread, Read, Replied)
  - Search functionality
  - Statistics dashboard

#### **Statistics Display**
- **Total Messages**: All contact submissions
- **Unread Messages**: New submissions
- **Read (No Reply)**: Read but not replied to
- **Replied Messages**: Replied to user

#### **Reply to Messages**
1. **Click "Reply"** button next to any message
2. **Modal will open** showing:
   - Original user message
   - User contact information
   - Reply text area
   - Previous replies (if any)
3. **Type your reply** in the text area
4. **Click "Send Reply"** to:
   - Send email to user
   - Mark message as replied
   - Update statistics

#### **Mark as Read**
1. **Click "Mark Read"** button next to unread messages
2. **Message status will update** to read
3. **Statistics will update** automatically

#### **Delete Messages**
1. **Click "Delete"** button next to any message
2. **Confirm deletion** in the popup
3. **Message will be permanently removed**

### **📬 Newsletter Management**

#### **View Subscribers**
- **Purpose**: Manage newsletter subscribers
- **Features**:
  - List of all subscribers
  - Subscription status
  - Email management
- **Information Displayed**:
  - Email address
  - Subscription date
  - Active status
  - Source of subscription

#### **Subscriber Actions**
- **View Details**: Click to see subscriber information
- **Edit Status**: Change active/inactive status
- **Delete**: Remove subscriber from list

### **📋 Email Templates**

#### **Manage Templates**
- **Purpose**: Create and edit email templates
- **Features**:
  - Template categories (welcome, newsletter, promotional, support)
  - HTML editor with preview
  - Template activation/deactivation
- **Template Types**:
  - **Welcome Email**: Sent to new subscribers
  - **Newsletter**: Weekly/monthly updates
  - **Promotional**: Special offers and deals
  - **Support**: Customer service emails

---

## 🔧 Technical Features

### **📊 Market Data Integration**

#### **TradingView Widgets**
- **Quotes Widget**: Real-time market quotes
- **Chart Widget**: Interactive trading charts
- **News Widget**: Market news feed
- **Symbol Search**: Search for specific assets

#### **Data Sources**
- **TradingView**: Market data and charts
- **Trustpilot**: External reviews (optional)
- **Internal Database**: Prop firm information

### **📧 Email System**

#### **Email Types**
- **Newsletter Emails**: Sent via Resend API
- **Support Emails**: Sent via SMTP
- **Transactional Emails**: Password resets, confirmations

#### **Email Features**
- **HTML Templates**: Professional formatting
- **Unsubscribe Links**: One-click unsubscribe
- **Preference Management**: User-controlled settings
- **Delivery Tracking**: Email delivery monitoring

### **🔒 Security Features**

#### **Authentication**
- **JWT Tokens**: Secure session management
- **Password Hashing**: bcrypt with salt rounds
- **Route Protection**: Middleware guards admin routes

#### **Data Protection**
- **Input Validation**: Form validation and sanitization
- **SQL Injection Protection**: Prisma ORM
- **Environment Variables**: Secure configuration
- **HTTPS Only**: Production security

---

## 🚀 Getting Started

### **For Users**

1. **Visit the Website**: Navigate to the homepage
2. **Browse Prop Firms**: Explore available trading firms
3. **Read Reviews**: Check testimonials and ratings
4. **Submit Feedback**: Share your experience
5. **Subscribe**: Get updates via newsletter
6. **Contact Support**: Reach out for help

### **For Administrators**

1. **Access Admin Panel**: Go to `/admin`
2. **Login**: Use admin credentials
3. **Review Dashboard**: Check statistics and overview
4. **Manage Content**: Add/edit prop firms, moderate testimonials
5. **Handle Support**: Reply to contact messages
6. **Monitor Analytics**: Track user engagement

---

## 🆘 Troubleshooting

### **Common Issues**

#### **Admin Login Problems**
- **Issue**: Can't log in to admin panel
- **Solution**: 
  - Verify credentials: `support@reviewmarket.org` / `Myguy@2025`
  - Check if admin user exists in database
  - Clear browser cookies and try again

#### **Email Not Sending**
- **Issue**: Contact form or newsletter emails not working
- **Solution**:
  - Check environment variables (RESEND_API_KEY, SMTP settings)
  - Verify email service configuration
  - Check server logs for errors

#### **Testimonials Not Appearing**
- **Issue**: Submitted testimonials not showing on website
- **Solution**:
  - Check if testimonial is approved in admin panel
  - Verify testimonial meets minimum requirements
  - Check admin approval status

#### **Market Data Not Loading**
- **Issue**: TradingView widgets not displaying
- **Solution**:
  - Check internet connection
  - Verify TradingView API access
  - Refresh page and try again

### **Support Contact**

- **Admin Email**: `support@reviewmarket.org`
- **Technical Issues**: Check server logs and error messages
- **Feature Requests**: Submit through contact form
- **Bug Reports**: Include steps to reproduce and error details

---

## 📈 Best Practices

### **For Users**
- **Submit Honest Reviews**: Provide accurate testimonials
- **Include Details**: Share specific experiences and insights
- **Stay Updated**: Subscribe to newsletter for latest information
- **Contact Support**: Reach out for questions or issues

### **For Administrators**
- **Regular Monitoring**: Check admin panel daily
- **Quick Response**: Reply to contact messages promptly
- **Content Quality**: Review and approve testimonials carefully
- **Data Backup**: Regular database backups
- **Security Updates**: Keep dependencies updated

---

## 🎉 Success Metrics

### **User Engagement**
- **Testimonial Submissions**: Track user feedback
- **Newsletter Subscriptions**: Monitor email signups
- **Contact Messages**: Measure support requests
- **Page Views**: Track website traffic

### **Admin Efficiency**
- **Response Time**: How quickly admin replies to messages
- **Content Quality**: Quality of approved testimonials
- **System Uptime**: Website availability
- **User Satisfaction**: Positive feedback and reviews

---

**📚 This guide covers all features of the ReviewMarket platform. For additional support, contact the admin team or refer to the technical documentation.** 