import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ReachU | Moving Made Effortless",
    template: "%s | ReachU"
  },
  description: "ReachU is a modern, technology-driven platform for transportation and logistics needs. Move anything, anywhere, without the hassle.",
  keywords: ["logistics", "transport", "delivery", "home shifting", "moving", "parcel", "vehicle booking"],
  authors: [{ name: "ReachU" }],
  creator: "ReachU",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.reachu.co.in",
    title: "ReachU | Moving Made Effortless",
    description: "ReachU is a modern, technology-driven platform for transportation and logistics needs.",
    siteName: "ReachU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachU | Moving Made Effortless",
    description: "Move anything, anywhere, without the hassle with ReachU.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
