import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus GUI | Personal Project Interface",
  description: "A unified interface for managing various personal project GUIs",
  applicationName: "Nexus GUI",
  authors: [{ name: "Luxcium" }],
  keywords: ["GUI", "project management", "development", "Next.js"],
};

import Layout from "@/components/layout/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
