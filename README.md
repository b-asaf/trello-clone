## Demo / Deployment

To play with a deployed version of the application go to: [trello-clone](https://trello-clone-b-asafs-projects.vercel.app/)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

### environment variables:

1. change `.env-example` to `.env`
2. fill the relevant environment variables - for each site (clerk, unsplash, stripe)follow site guidelines

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tools

1. Database
   1. database:
      - MySql as database
      - Prisma as ORM
   2. database hosting [filess.io](https://dash.filess.io/#/app/databases)
      - initial worked with MySQL in docker -> due to issues with deploying db host in Vercel moved to filess.io
   - during development the DB was deployed inside a docker (see docket-compose.yml), due to issues with deploying the db in vercel host I moved to filess.io as db host.
2. Authentication - [clerk](https://clerk.com/solutions/nextjs-authentication)
3. Style - tailwind.css
4. [shadcn-ui](https://ui.shadcn.com/docs) - Re-usable components above radix-ui & tailwind.css
5. Icons - [lucide](https://lucide.dev/guide/) - with react package
6. Payment - [stripe](https://stripe.com/)
7. State management - [zustand](https://github.com/pmndrs/zustand)
8. Schema validation - [zod](https://zod.dev/?id=introduction)

#### Prisma ORM

1. (SHOULD BE DONE ONLY ON DEV!!) Reset the DB: `npx prisma migrate reset`
2. push new schema(s) to db: `npx prisma db push`
3. create the new schema(s) locally: `npx prisma generate`
4. Visualize DB in browser - [prisma studio](https://www.prisma.io/blog/prisma-studio-3rtf78dg99fe): `npx prisma studio` (work well with docker, TBD::check how to make it work with filess.io)

#### Stripe

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

## NextJS - Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
