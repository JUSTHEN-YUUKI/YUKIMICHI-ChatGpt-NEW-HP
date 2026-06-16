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

The `/quote` and `/contact` forms submit to `/api/inquiry`. Production email delivery uses the Resend API with credentials stored only in Vercel environment variables.

Do not commit Resend API keys or real `.env.local` files. Use `.env.example` only as a key list.

Resend is the recommended production delivery path. The previous Nodemailer SMTP path for Onamae.com / GMO is no longer used by `/api/inquiry`.

Required Vercel Production environment variables:

```text
CONTACT_TO_EMAIL=exporter@justhen.co.jp
RESEND_API_KEY=<Resend API key entered directly in Vercel>
RESEND_FROM_EMAIL=<verified Resend sender, for example YUKIMICHI <no-reply@justhen.co.jp>>
```

`RESEND_API_KEY` must never be placed in README, logs, comments, or committed files. `RESEND_FROM_EMAIL` must be a sender address allowed by the Resend account, usually from a verified domain.

Vercel Production setup:

1. Open the Vercel dashboard.
2. Open the `YUKIMICHI-ChatGpt-NEW-HP` project.
3. Open `Settings` -> `Environment Variables`.
4. Add the 3 variables above to the `Production` environment.
5. After saving, open `Deployments` and redeploy the latest production deployment.
6. Test sending from `/contact` and `/quote`.

If sending still fails after the variables are set, confirm the Resend API key, sender domain verification, sender address, and account sending limits in the Resend dashboard, then redeploy or retry.
