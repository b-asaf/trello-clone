"use client";

import { useTheme } from "next-themes";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Plus } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/form/form-popover";
import { ThemeSwitch } from "@/components/theme-switch";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  const { resolvedTheme } = useTheme();

  return (
    <nav className="fix top-0 z-50 w-full px-4 h-14 border-b shadow-sm flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            variant="primary"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            size="sm"
            className="rounded-sm block md:hidden"
            variant="primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>{" "}
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
            elements: { avatarBox: { height: 30, width: 30 } },
          }}
        />
        <ThemeSwitch />
      </div>
    </nav>
  );
}
