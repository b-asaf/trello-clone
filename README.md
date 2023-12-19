This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma tools

1. (SHOULD BE DONE ONLY ON DEV!!) Reset the DB: `npx prisma migrate reset`
2. push new schema(s) to db: `npx prisma db push`
3. create the new schema(s) locally: `npx prisma generate`
4. see db content: `npx prisma studio`

## STRIPE

In order to use/test stripe locally, you need to following:

1. Login into [stripe.com](https://stripe.com/)
2. Go to dashboards and click the `developers` buttons
3. Click on webhooks tab
4. Click on "Test in local environment": `https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local`
5. Follow the instructions...**make sure** to keep the terminal open/running
6. enter fake credit card information:
   1. the important fake information is the credit card number: 4242 4242 4242 4242
   2. the rest of the information is not really important for the testing purposes

Enabling billing portal (in development mode):

1. Search for `billing portal`
2. Select `Customer portal` (should be under: Settings -> Customer portal)
3. Click on `activate test link` button
