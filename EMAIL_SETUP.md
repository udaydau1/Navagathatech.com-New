# Email Setup Guide for Contact Form

## Overview
The contact form now uses **Resend** to send emails to `info@navagathatech.com` whenever someone submits a contact request.

## Setup Steps

### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (includes 100 emails/day for free)
3. Verify your email address

### 2. Get Your API Key
1. Log in to Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Navagatha Website")
5. Copy the API key (it starts with `re_`)

### 3. Configure Locally

Create a `.env.local` file in your project root:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

**Important:** Never commit this file to Git. It's already in `.gitignore`.

### 4. Configure on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your application

### 5. Verify Domain (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `navagathatech.com`
4. Follow the DNS setup instructions
5. Once verified, update the `from` field in `app/api/contact/route.ts`:
   ```typescript
   from: 'Navagatha Tech <noreply@navagathatech.com>',
   ```

## Testing

### Local Testing
1. Make sure `.env.local` has your API key
2. Run `npm run dev`
3. Go to `http://localhost:3000/contact`
4. Submit a test form
5. Check your email at `info@navagathatech.com`

### Production Testing
1. After deploying to Vercel with the environment variable
2. Visit your live website
3. Submit a contact form
4. Check your email

## Email Features

✅ Professional HTML email template  
✅ Includes all form fields (name, email, company, country, message)  
✅ Reply-to set to the sender's email  
✅ Timestamp in IST timezone  
✅ Inquiry type categorization  
✅ Mobile-friendly design  

## Troubleshooting

### Not receiving emails?
1. Check Resend dashboard → **Logs** to see if emails were sent
2. Check your spam folder
3. Verify the API key is correctly set in environment variables
4. Check Vercel deployment logs for errors

### "Email service not configured" message?
- The API key is not set in environment variables
- Restart your development server after adding `.env.local`

## Free Tier Limits

Resend free tier includes:
- 100 emails per day
- 3,000 emails per month
- Perfect for small to medium business contact forms

## Support

If you need help:
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
