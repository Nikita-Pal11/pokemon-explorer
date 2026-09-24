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
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/bg.webp"
            className="h-full w-full opacity-20 object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/85 to-slate-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-br from-purple-600/15 via-indigo-600/10 to-transparent blur-[130px] rounded-full" />
        </div>
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
