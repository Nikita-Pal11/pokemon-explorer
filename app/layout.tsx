import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon Center",
  description: "Explore Pokémon stats, types, and details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="relative min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <img
          src="/bg.webp"
          className="-z-10 fixed inset-0 h-full w-full opacity-20 object-cover pointer-events-none"
          alt=""
        />
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
