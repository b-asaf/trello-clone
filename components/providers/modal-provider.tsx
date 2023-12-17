"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // make sure it mounts only in client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
}
