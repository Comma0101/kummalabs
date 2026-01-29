# Korami Website - Contact Form Setup

## Setting Up Email Notifications

The contact form uses [Resend](https://resend.com) to send email notifications when someone submits the form.

### Step 1: Get a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Get your API key from the dashboard

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.local.example .env.local
```

Then edit `.env.local` and add your credentials:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
NOTIFICATION_EMAIL=your@email.com
```

### Step 3: Test the Form

1. Restart your dev server: `npm run dev`
2. Go to the contact section
3. Fill out and submit the form
4. Check your email for the notification

### Development Mode

If you haven't configured Resend yet, the form will still work and log submissions to the console. You'll see the form data in your terminal.

### Production

For production, make sure to:
1. Add your environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Update the "from" email address in `/src/app/api/contact/route.ts` to use your verified domain

Example for Vercel:
```bash
vercel env add RESEND_API_KEY
vercel env add NOTIFICATION_EMAIL
```
