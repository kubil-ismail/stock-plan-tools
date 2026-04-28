import type { Metadata } from "next";
import Watchlist_view from "@/pages/(tools-and-simulator)/watchlist/watchlist.view";

export default function Page() {
  return <Watchlist_view />;
}

export const metadata: Metadata = {
  title: "Watchlist Saham - Pantau Saham dan Rencana Trading | Stockplan",

  description:
    "Buat dan kelola watchlist saham untuk memantau saham potensial, menyusun rencana trading, dan mencatat strategi investasi Anda. Simpan saham pilihan dan pantau pergerakannya dalam satu tempat.",

  keywords: [
    "watchlist saham",
    "daftar pantauan saham",
    "pantau saham",
    "rencana trading saham",
    "saham yang dipantau",
    "stock watchlist indonesia",
    "trading plan saham",
    "monitor saham",
    "aplikasi watchlist saham",
    "stockplan",
  ],

  openGraph: {
    title: "Watchlist Saham - Pantau Saham dan Rencana Trading",

    description:
      "Kelola daftar saham yang ingin Anda pantau. Buat watchlist untuk strategi trading dan investasi dengan mudah.",

    url: "https://stockplan.id/watchlist",

    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/og-watchlist.png",
        width: 1200,
        height: 630,
        alt: "Watchlist Saham dan Rencana Trading",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Watchlist Saham - Pantau Saham Pilihan",

    description: "Buat watchlist saham dan susun rencana trading Anda.",

    images: ["/og-watchlist.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://stockplan.id/watchlist",
  },

  category: "finance",
};
