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
