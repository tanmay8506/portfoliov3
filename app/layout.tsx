import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CONFIG } from "@/portfolio.config";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CanvasBackground } from "@/components/shared/canvas-background";
import { ThemeProvider } from "@/components/context/theme-context";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans relative">
        <ThemeProvider>
          {/* Particle System Mesh (Behind everything) */}
          <CanvasBackground />

          {/* Premium Background Layer Overlays */}
          <div className="fixed inset-0 pointer-events-none z-2 bg-grid" />
          <div className="fixed inset-0 pointer-events-none z-3 bg-glow-1" />
          <div className="fixed inset-0 pointer-events-none z-3 bg-glow-2" />

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
