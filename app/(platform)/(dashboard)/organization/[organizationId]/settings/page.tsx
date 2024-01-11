"use client";

import { OrganizationProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
          elements: {
            rootBox: { boxShadow: "none", width: "100%" },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
}
