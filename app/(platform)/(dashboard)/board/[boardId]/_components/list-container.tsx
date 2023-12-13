"use client";

import { useEffect, useState } from "react";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  // keep source of truth and use optimistic updates
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => (
        <ListItem key={index} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
