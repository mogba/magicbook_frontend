import "@/app/ui/globals.css";

import type { Metadata } from "next";

import { inter } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Magicbook",
  description: "Save your favorite YouTube Videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
