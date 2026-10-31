
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import FluidBackground from "@/components/effects/FluidBackground";
import CursorFollower from "@/components/effects/CursorFollower";
import PortfolioChatbot from "@/components/sections/PortfolioChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isahak Ali | Full Stack Web Developer",
  description:
    "I'm Isahak Ali, a Full Stack Web Developer creating modern, responsive and meaningful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FluidBackground />
          <CursorFollower />

          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>

          <PortfolioChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
