import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* TODO: implement custom authentication logic */}
      <Toaster />
      {children}
    </ClerkProvider>
  );
}
