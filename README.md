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

The `/quote` and `/contact` forms submit to `/api/inquiry`. Production email delivery uses Nodemailer with SMTP settings stored only in Vercel environment variables.

Do not commit SMTP passwords or real `.env.local` files. Use `.env.example` only as a key list.

Required Vercel Production environment variables:

```text
CONTACT_TO_EMAIL=exporter@justhen.co.jp
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=exporter@justhen.co.jp
SMTP_PASS=<Outlook or Microsoft 365 SMTP password>
SMTP_FROM=YUKIMICHI Website <exporter@justhen.co.jp>
```

`SMTP_PORT=465` uses SMTP secure mode. Other ports, such as `587`, use non-secure transport initialization with provider-supported TLS negotiation. Do not place the real `SMTP_PASS` value in README, logs, or committed files.

Vercel Production setup:

1. Open the Vercel dashboard.
2. Open the `YUKIMICHI-ChatGpt-NEW-HP` project.
3. Open `Settings` -> `Environment Variables`.
4. Add the 6 variables above to the `Production` environment.
5. After saving, open `Deployments` and redeploy the latest production deployment.
6. Test sending from `/contact` and `/quote`.

If sending still fails after the variables are set, SMTP AUTH may be disabled on the Microsoft 365 mailbox. Enable SMTP AUTH for `exporter@justhen.co.jp`, then redeploy or retry.
