import type { Metadata } from "next";
import Kalkulator_avarage_view from "@/pages/(tools-and-simulator)/kalkulator-average/kalkulator_avarage.view";

export default function Page() {
  return <Kalkulator_avarage_view />;
}

export const metadata: Metadata = {
  title: "Kalkulator Average Price Saham (Termasuk Fee Broker) - Stockplan",
  description:
    "Hitung average price saham secara otomatis setelah beli atau jual, termasuk fee broker. Simulasi trading dan rencanakan investasi Anda dengan kalkulator Stockplan.",

  keywords: [
    "kalkulator average saham",
    "rata rata harga saham",
    "average price saham",
    "hitung average saham",
    "simulasi beli saham",
    "fee broker saham",
    "trading plan saham",
    "kalkulator saham indonesia",
    "IDX saham",
    "stockplan",
  ],

  openGraph: {
    title: "Kalkulator Average Price Saham (Termasuk Fee Broker)",
    description:
      "Hitung average price saham setelah beli atau jual termasuk fee broker dengan mudah menggunakan Stockplan.",
    url: "https://stockplan.id/kalkulator-avarage",
    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-calculator-average.png",
        width: 1200,
        height: 630,
        alt: "Kalkulator Average Price Saham Stockplan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kalkulator Average Price Saham",
    description:
      "Hitung average saham termasuk fee broker secara cepat dan akurat.",
    images: ["/og-calculator-average.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://stockplan.id/kalkulator-avarage",
  },

  category: "finance",
};
