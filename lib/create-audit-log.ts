import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
}

export async function createAuditLog(props: Props) {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }

    const { entityId, entityTitle, entityType, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.error("[AUDIT_LOG_ERROR]", error);
  }
}
