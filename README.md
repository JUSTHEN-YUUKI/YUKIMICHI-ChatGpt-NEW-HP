This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## YUKIMICHI Inquiry Email Setup

The `/quote` and `/contact` forms submit to `/api/inquiry`. Production email delivery uses the SendGrid Mail Send API with credentials stored only in Vercel environment variables.

Do not commit SendGrid API keys or real `.env.local` files. Use `.env.example` only as a key list.

SendGrid is the recommended production delivery path. Direct SMTP delivery is no longer used by `/api/inquiry`.

Required Vercel Production environment variables:

```text
CONTACT_TO_EMAIL=exporter@justhen.co.jp
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

The SendGrid API key must never be placed in logs, comments, or committed files. `SENDGRID_FROM_EMAIL` must be a sender address allowed by the SendGrid account, ideally from an authenticated domain.

Vercel Production setup:

1. Open the Vercel dashboard.
2. Open the `YUKIMICHI-ChatGpt-NEW-HP` project.
3. Open `Settings` -> `Environment Variables`.
4. Add the 3 variables above to the `Production` environment.
5. After saving, open `Deployments` and redeploy the latest production deployment.
6. Test sending from `/contact` and `/quote`.

SendGrid setup:

1. Create a restricted API key with Mail Send permission.
2. Complete Sender Authentication for `justhen.co.jp` in SendGrid. Single Sender Verification can be used for testing, but Domain Authentication is preferred for production.
3. Set `SENDGRID_FROM_EMAIL` to the authenticated sender address.
4. Confirm SendGrid account sending limits and suppression settings if delivery fails.

If sending still fails after the variables are set, confirm the SendGrid API key permission, sender authentication, sender address, account sending limits, and Vercel redeployment state.

## Analytics and Search Verification Setup

This site supports Google Analytics 4, Google Search Console verification, and Microsoft Clarity through environment variables only. Do not hardcode measurement IDs or project IDs in source files.

The analytics tags are loaded only when `VERCEL_ENV=production`. They do not run on localhost or normal preview/dev environments.

### Google Analytics 4

1. Create or open the GA4 property for `https://justhen.co.jp`.
2. Create a Web data stream for the production site.
3. Copy the Measurement ID, for example `G-XXXXXXXXXX`.
4. Add it to Vercel Production as `GA_MEASUREMENT_ID`.
5. Redeploy the production deployment after saving the variable.

GA4 uses `gtag.js` with `send_page_view: false` on initialization. Page views are sent from the App Router client transition handler so SPA route changes are tracked without duplicate initial page views.

### Google Search Console

1. Open Google Search Console and add `https://justhen.co.jp` as a property.
2. Choose HTML meta tag verification.
3. Copy only the verification token from the `content` value.
4. Add it to Vercel Production as `GOOGLE_SITE_VERIFICATION`.
5. Redeploy, then run verification in Search Console.

The app generates the meta tag from the environment variable through Next.js metadata.

### Microsoft Clarity

1. Create or open the Clarity project for `https://justhen.co.jp`.
2. Copy the Clarity Project ID.
3. Add it to Vercel Production as `CLARITY_PROJECT_ID`.
4. Redeploy production.

Clarity is loaded asynchronously after the page becomes interactive.

### Vercel Environment Variables

```text
GA_MEASUREMENT_ID=
GOOGLE_SITE_VERIFICATION=
CLARITY_PROJECT_ID=
```

Keep the existing inquiry email variables configured as well:

```text
CONTACT_TO_EMAIL=exporter@justhen.co.jp
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

### Operation Check

1. Confirm the variables are set in Vercel Production, not only locally.
2. Redeploy the production site.
3. Open the production site and confirm no analytics scripts are loaded on localhost.
4. In the browser network panel on production, confirm `gtag/js` loads when `GA_MEASUREMENT_ID` is set.
5. Confirm `www.clarity.ms/tag/` loads when `CLARITY_PROJECT_ID` is set.
6. View the page source or Elements panel and confirm the `google-site-verification` meta tag appears when `GOOGLE_SITE_VERIFICATION` is set.

### Inquiry Event Check

1. Open GA4 Realtime or DebugView for the production property.
2. Submit a successful `/contact` inquiry and confirm the `contact_submit` event appears.
3. Submit a successful `/quote` request and confirm the `quote_submit` event appears.

Only the event names are sent. Form names, company names, email addresses, phone numbers, addresses, message bodies, quote details, and attachments are not sent to GA4.

### Instagram and Link Click Check

1. Open GA4 Realtime or DebugView.
2. Click an Instagram link on the production site and confirm `instagram_click`.
3. Click a `mailto:` link and confirm `email_click`.
4. Click a `tel:` link if one is added in the future and confirm `phone_click`.
5. Click an external non-Instagram link and confirm `outbound_click`.

No link URL, label, email address, phone number, or other personal data is attached to these custom events.
