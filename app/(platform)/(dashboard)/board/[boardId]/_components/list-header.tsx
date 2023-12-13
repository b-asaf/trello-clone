"use client";

import { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { toast } from "sonner";

import { List } from "@prisma/client";
import { updateList } from "@/actions/update-list";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "@/components/form/form-input";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
}

export function ListHeader({ data }: ListHeaderProps) {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      // inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = data.id;
    const boardId = data.boardId;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ id, title, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={handleSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={() => {}} data={data} />
    </div>
  );
}
