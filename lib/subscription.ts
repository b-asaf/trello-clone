import { auth } from "@clerk/nextjs";
import { db } from "./db";

const DAY_IN_SECONDS = 84_400_000;

export async function checkSubscription() {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_SECONDS >
      Date.now();

  return !!isValid;
}
