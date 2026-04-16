import type { Metadata } from "next";
import Home_View from "@/pages/home/home.view";

export default function App() {
  return <Home_View />;
}

export const metadata: Metadata = {
  title: {
    default: "Stockplan — Tools & Insight untuk Investor Saham",
    template: "%s | Stockplan",
  },
  description:
    "Stockplan adalah platform untuk merencanakan, mencatat, dan menganalisis investasi saham. Hitung average price, simulasi trading, dan pantau portofolio dengan mudah.",

  keywords: [
    "stockplan",
    "investasi saham",
    "trading plan",
    "simulasi saham",
    "average price saham",
    "kalkulator saham",
    "manajemen portofolio",
    "saham indonesia",
    "IDX",
    "investor saham",
  ],

  authors: [{ name: "Stockplan Team" }],
  creator: "Stockplan",
  publisher: "Stockplan",

  metadataBase: new URL("https://stockplan.id"),

  openGraph: {
    title: "Stockplan — Tools & Insight untuk Investor Saham",
    description:
      "Semua yang Anda butuhkan untuk merencanakan dan menganalisis investasi saham dalam satu platform.",
    url: "https://stockplan.id",
    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png", // nanti bisa lo ganti
        width: 1200,
        height: 630,
        alt: "Stockplan — Tools & Insight untuk Investor Saham",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Stockplan — Tools & Insight untuk Investor Saham",
    description:
      "Platform untuk merencanakan dan menganalisis investasi saham dengan mudah.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "finance",
};
