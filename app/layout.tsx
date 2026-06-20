import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CONFIG } from "@/portfolio.config";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CanvasBackground } from "@/components/shared/canvas-background";
import { ThemeProvider } from "@/components/context/theme-context";
import { IntroAnimation } from "@/components/shared/intro-animation";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
      className={`${outfit.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} theme-dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans relative">
        <ThemeProvider>
          {/* Cinematic intro — plays once per session */}
          <IntroAnimation />
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
