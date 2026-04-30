import type { Metadata } from "next";
import Informasi_perusahaan_view from "@/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view";

export default function Page() {
  return <Informasi_perusahaan_view />;
}

export const metadata: Metadata = {
  title:
    "Informasi Perusahaan: Aksi Korporasi & Notasi Khusus Saham IDX | Stockplan",

  description:
    "Lihat data aksi korporasi dan notasi khusus saham di Bursa Efek Indonesia (IDX). Temukan informasi penting seperti dividen, right issue, stock split, hingga notasi khusus emiten secara lengkap.",

  keywords: [
    "aksi korporasi",
    "notasi khusus saham",
    "dividen saham",
    "right issue",
    "stock split",
    "data saham IDX",
    "informasi emiten",
    "notasi saham BEI",
    "Stockplan",
  ],

  openGraph: {
    title: "Aksi Korporasi & Notasi Khusus Saham IDX",

    description:
      "Telusuri aksi korporasi seperti dividen, right issue, stock split serta notasi khusus saham di Bursa Efek Indonesia.",

    url: "https://stockplan.id/informasi-perusahaan",

    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/og-company.png",
        width: 1200,
        height: 630,
        alt: "Aksi Korporasi dan Notasi Khusus Saham IDX",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Aksi Korporasi & Notasi Khusus Saham IDX",

    description:
      "Cek dividen, right issue, stock split, dan notasi khusus saham secara lengkap.",

    images: ["/og-company.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://stockplan.id/informasi-perusahaan",
  },

  category: "finance",
};
