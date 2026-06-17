import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CONFIG } from "@/portfolio.config";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CanvasBackground } from "@/components/shared/canvas-background";
import { ThemeProvider } from "@/components/context/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: CONFIG.seo.title,
    description: CONFIG.seo.description,
    openGraph: {
      title: CONFIG.seo.ogTitle,
      description: CONFIG.seo.ogDescription,
      type: "website",
    },
    alternates: {
      canonical: CONFIG.seo.canonical,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans relative">
        <ThemeProvider>
          {/* Particle System Mesh (Behind everything) */}
          <CanvasBackground />

          {/* Global sticky header */}
          <Nav />

          {/* Main content area */}
          <main className="flex-1 pt-14 relative z-10">{children}</main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
