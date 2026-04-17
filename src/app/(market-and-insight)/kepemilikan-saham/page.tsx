import type { Metadata } from "next";
import Kepemilikan_saham_view from "@/pages/(market-and-insight)/kepemilikan-saham/kepemilikan_saham.view";

export default function Page() {
  return <Kepemilikan_saham_view />;
}

export const metadata: Metadata = {
  title: "Kepemilikan Saham & Pemegang Saham Perusahaan - Stockplan",

  description:
    "Lihat daftar pemegang saham dan struktur kepemilikan saham perusahaan di Bursa Efek Indonesia (IDX). Ketahui siapa pemilik saham terbesar, pemerintah, institusi, dan investor individu.",

  keywords: [
    "kepemilikan saham",
    "pemegang saham perusahaan",
    "ownership saham",
    "struktur pemegang saham",
    "siapa pemilik saham",
    "shareholder perusahaan",
    "pemegang saham terbesar",
    "saham pemerintah indonesia",
    "data pemegang saham IDX",
    "stockplan",
  ],

  openGraph: {
    title: "Kepemilikan Saham & Pemegang Saham Perusahaan",

    description:
      "Telusuri struktur kepemilikan saham perusahaan di Bursa Efek Indonesia. Lihat pemegang saham pemerintah, institusi, dan individu secara lengkap.",

    url: "https://stockplan.id/kepemilikan-saham",

    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/og-shareholder.png",
        width: 1200,
        height: 630,
        alt: "Kepemilikan Saham dan Pemegang Saham Perusahaan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Kepemilikan Saham & Pemegang Saham Perusahaan",

    description: "Lihat siapa pemilik saham terbesar di perusahaan IDX.",

    images: ["/og-shareholder.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://stockplan.id/kepemilikan-saham",
  },

  category: "finance",
};
