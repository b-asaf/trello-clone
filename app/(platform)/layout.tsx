import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* TODO: implement custom authentication logic in another app */}
      <Toaster />
      {children}
    </ClerkProvider>
  );
}
