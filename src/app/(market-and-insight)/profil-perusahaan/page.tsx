import type { Metadata } from "next";
import { Suspense } from "react";
import Profil_Perusahaan_view from "@/pages/(market-and-insight)/profil-perusahaan/profil-perusahaan.view";

export default function Page() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Profil_Perusahaan_view />
      </Suspense>
    </>
  );
}

export const metadata: Metadata = {
  title:
    "Profil Perusahaan: Manajemen, Direksi, dan Informasi Perusahaan - Stockplan",

  description:
    "Lihat profil lengkap perusahaan, termasuk manajemen, direksi, komisaris, dan informasi perusahaan terkait untuk memahami bisnis di balik saham.",

  keywords: [
    "profil perusahaan",
    "manajemen perusahaan",
    "direksi perusahaan",
    "komisaris perusahaan",
    "informasi perusahaan",
    "anak perusahaan",
    "struktur perusahaan",
    "company profile saham",
    "data perusahaan",
    "stockplan",
  ],

  openGraph: {
    title: "Profil Perusahaan: Manajemen, Direksi, dan Informasi Perusahaan",

    description:
      "Telusuri profil perusahaan, termasuk direksi, komisaris, dan informasi perusahaan terkait.",

    url: "https://stockplan.id/profil-perusahaan",

    siteName: "Stockplan",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/og-company-profile.png",
        width: 1200,
        height: 630,
        alt: "Profil Perusahaan dan Manajemen Perusahaan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Profil Perusahaan: Manajemen dan Informasi Perusahaan",

    description: "Lihat profil lengkap perusahaan dan struktur manajemen.",

    images: ["/og-company-profile.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://stockplan.id/profil-perusahaan",
  },

  category: "finance",
};
