import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning- https://react.dev/reference/react-dom/components/common#common-props
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* wrapping with client component won't make all the components client components -
            https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
