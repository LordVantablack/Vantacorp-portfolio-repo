import type { Metadata } from "next";

import { syne, dmSans, jetbrainsMono } from "@/lib/fonts";
import { ConvexClientProvider } from "@/components/ui/ConvexClientProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "VantaLabs — Software, engineered to scale.",
  description: "VantaLabs is a development agency specializing in web development, mobile apps, AI integration, and workflow automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} dark`}>
      <body>
        <SmoothScroll>
          <ConvexClientProvider>
            <Navbar />
            <main id="main"><PageTransition>{children}</PageTransition></main>
            <Footer />
          </ConvexClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
