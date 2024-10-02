"use client";

import "@/app/ui/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { inter } from "@/app/ui/fonts";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html
        lang="en"
        className={`${inter.className} antialiased flex h-screen w-screen`}
      >
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
