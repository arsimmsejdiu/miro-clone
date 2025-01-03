import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import "./globals.css";
import {ModalProvider} from "@/components/providers/modal-provider";
import { Loading } from "@/components/auth/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Board collaboration with anyone to make you plans come to light ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            {children}
            <ModalProvider />
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}

