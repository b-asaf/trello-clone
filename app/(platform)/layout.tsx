import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* TODO: implement custom authentication logic */}
      {children}
    </ClerkProvider>
  );
}
