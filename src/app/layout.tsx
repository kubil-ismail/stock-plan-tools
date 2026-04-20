import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <Analytics />
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/">
                <button className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="4"
                        y="10"
                        width="3"
                        height="6"
                        rx="1"
                        fill="white"
                      />
                      <rect
                        x="8.5"
                        y="6"
                        width="3"
                        height="10"
                        rx="1"
                        fill="white"
                      />
                      <rect
                        x="13"
                        y="8"
                        width="3"
                        height="8"
                        rx="1"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span className="text-[20px] font-bold text-[#2A2826]">
                    Stockplan
                  </span>
                </button>
              </Link>

              <nav className="flex items-center gap-8 hidden md:flex">
                <Link href="/#market-insight">
                  <button className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors cursor-pointer">
                    Market & Insight
                  </button>
                </Link>

                <Link href="/#tools-simulator">
                  <button className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors cursor-pointer">
                    Tools & Simulator
                  </button>
                </Link>

                <Link href="/#contact">
                  <button className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors cursor-pointer">
                    Contact Us
                  </button>
                </Link>
              </nav>
            </div>
          </header>

          {children}

          {/* Footer */}
          <footer className="bg-white border-t border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center">
              <p className="text-[14px] text-[#8A8682]">
                © 2026 Stockplan. Platform analisis dan tools investasi saham.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
