"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { toast } from "sonner";

import { ListWithCards } from "@/types";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order.tsx";
import { updateCardOrder } from "@/actions/update-card-order.tsx";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  // keep source of truth and use optimistic updates
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List order updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("cards order updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      // no place to drop the dragged item
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // Do nothing if trying to dop in the same position
      return;
    }

    // handle dragging list element
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    // handle dragging card element
    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        // One of the lists is not found, nothing to do here
        return;
      }

      // is Card exists in sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // is Card exists in destinationList
      if (!destination.cards) {
        destination.cards = [];
      }

      if (destination.droppableId === source.droppableId) {
        // handle - card move in the same list
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: reorderedCards, boardId });
      } else {
        // handle - card move into a different  list
        // remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // assign new listId to moved card
        movedCard.listId = destination.droppableId;

        // add moved card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // update the cards order in the source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // update the cards order in the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: destinationList.cards, boardId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={index} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
