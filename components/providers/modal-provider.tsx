"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "../modals/pro-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  // To avoid Hydration Mismatch - useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => setIsMounted(true), []);

  // make sure it mounts only in client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}
