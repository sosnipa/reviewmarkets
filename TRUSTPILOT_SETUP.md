# Trustpilot API Integration Setup

This document explains how to set up Trustpilot API integration for fetching reviews from Trustpilot.

## ⚠️ Important Note: Paid Service

**Trustpilot API access requires a paid subscription.** The API is not available on free Trustpilot business accounts. You'll need to upgrade to a paid plan to access the API.

## Prerequisites

1. **Trustpilot Business Account**: You need a Trustpilot business account
2. **Paid Subscription**: Upgrade to a paid Trustpilot plan (Plus, Premium, or Enterprise)
3. **API Access**: Request API access from Trustpilot support
4. **API Key**: Obtain your API key from Trustpilot

## Setup Instructions

### 1. Get Trustpilot API Access

1. Go to [Trustpilot Business](https://business.trustpilot.com/)
2. Sign up for a business account
3. **Upgrade to a paid plan** (Plus, Premium, or Enterprise)
4. Contact Trustpilot support to request API access
5. Follow their approval process

### 2. Obtain API Key

Once approved:

1. Log into your Trustpilot business account
2. Navigate to API settings
3. Generate an API key
4. Copy the API key for use in your application

### 3. Configure Environment Variables

Add your Trustpilot API key to your `.env.local` file:

```bash
TRUSTPILOT_API_KEY=your_trustpilot_api_key_here
```

### 4. API Endpoints Used

The integration uses the following Trustpilot API endpoints:

- **Business Search**: `/v1/businesses/search` - Find businesses by name
- **Business Reviews**: `/v1/businesses/{businessId}/reviews` - Get reviews for a specific business

### 5. Supported Prop Firms

The system is configured to fetch reviews for these major prop firms:

- FTMO
- The5ers
- MyForexFunds
- Earn2Trade
- SurgeTrader

### 6. How It Works

1. **Review Fetching**: The system searches for each prop firm on Trustpilot
2. **Data Transformation**: Trustpilot reviews are transformed to match our testimonial format
3. **Display**: Reviews are displayed alongside user-submitted testimonials
4. **Caching**: Reviews are fetched on-demand and cached for performance

### 7. Rate Limits

Trustpilot API has rate limits. The system is designed to:

- Fetch reviews in batches
- Handle rate limiting gracefully
- Fall back to local testimonials if API is unavailable

### 8. Testing

To test the integration:

1. Ensure your API key is set in `.env.local`
2. Restart your development server
3. Visit the testimonials page
4. Check if Trustpilot reviews are displayed

### 9. Troubleshooting

**API Key Issues:**

- Verify your API key is correct
- Check if your API access is active
- Ensure the key has proper permissions

**403 Forbidden Errors:**

- This indicates you need a paid Trustpilot subscription
- Upgrade to Plus, Premium, or Enterprise plan
- Contact Trustpilot support to enable API access

**No Reviews Showing:**

- Check browser console for errors
- Verify the prop firm names match Trustpilot business names
- Check if the businesses have reviews on Trustpilot

**Rate Limiting:**

- The system will automatically handle rate limits
- Reviews will be fetched gradually to avoid hitting limits

### 10. Security Notes

- Never commit your API key to version control
- Use environment variables for all API keys
- Monitor API usage to stay within limits
- Consider implementing API key rotation

## Implementation Details

The Trustpilot integration is implemented in:

- `src/lib/services/trustpilot.ts` - API service
- `src/app/api/testimonials/route.ts` - Integration with testimonials API
- `src/components/TestimonialsSection.tsx` - Display logic

## Alternative Solutions

Since Trustpilot API requires a paid subscription, here are some alternatives:

### 1. Manual Review Import

- Manually collect reviews from Trustpilot
- Add them to your database as user testimonials
- Update them periodically

### 2. Web Scraping (Legal Considerations)

- Scrape public Trustpilot reviews (check Terms of Service)
- Implement rate limiting and respect robots.txt
- Consider legal implications

### 3. Trustpilot Widget Integration

- Use Trustpilot's embeddable widgets
- Display your TrustScore and recent reviews
- No API required, just embed code

### 4. Focus on User-Generated Content

- Encourage users to submit testimonials directly
- Build a strong community of user reviews
- Use social proof from your own platform

## Future Enhancements

Potential improvements:

- Add more prop firms to the list
- Implement review caching
- Add review filtering options
- Display Trustpilot business ratings
- Add review sentiment analysis
- Implement manual review import system
