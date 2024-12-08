"use client";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "sonner";
import Footer from "@/src/components/ui/Footer";
import Nav from "@/src/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark`}>
        <Providers>
          <Nav />
          <div className="min-h-screen">{children}</div>
          <Toaster position="bottom-right" richColors />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
