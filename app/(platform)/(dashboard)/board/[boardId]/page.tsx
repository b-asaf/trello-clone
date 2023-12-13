import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import ListContainer from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    id: string;
  };
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = db.list.findMany({
    where: { boardId: params.id, board: { orgId } },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      {/* @ts-ignore */}
      <ListContainer boardId={params.id} data={lists} />
    </div>
  );
}
