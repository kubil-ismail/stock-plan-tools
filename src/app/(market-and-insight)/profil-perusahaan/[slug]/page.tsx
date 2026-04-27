import { Metadata } from "next";
import company from "@/data/company.json";
import Profil_perusahaan_detail_view from "@/pages/(market-and-insight)/profil-perusahaan/[slug]/profil-perusahaan-detail.view";
import { StockDetail } from "@/types/stocks";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page(props: Props) {
  const { params } = props;
  const { slug } = await params;

  return <Profil_perusahaan_detail_view slug={String(slug)} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const companySelected = _company.find((item) => item.ticker === String(slug));

  const name = companySelected?.name || slug;
  const ticker = companySelected?.ticker || slug;

  return {
    title: `Profil Perusahaan ${name} (${ticker}) | Saham, Direksi, Komisaris & Kepemilikan | Stockplan`,

    description: `Lihat profil lengkap perusahaan ${name} (${ticker}) di Bursa Efek Indonesia (IDX). Termasuk bidang usaha, direksi, komisaris, pemegang saham, dan informasi saham terbaru.`,

    keywords: [
      `profil perusahaan ${ticker}`,
      `${name}`,
      `saham ${ticker}`,
      `perusahaan ${ticker}`,
      `direksi ${ticker}`,
      `komisaris ${ticker}`,
      `kepemilikan saham ${ticker}`,
      "perusahaan IDX",
      "data perusahaan BEI",
      "stockplan",
    ],

    openGraph: {
      title: `Profil Perusahaan ${name} (${ticker}) | Saham, Direksi, Komisaris & Kepemilikan`,

      description: `Lihat profil lengkap perusahaan ${name} (${ticker}) di Bursa Efek Indonesia (IDX). Termasuk bidang usaha, direksi, komisaris, pemegang saham, dan informasi saham terbaru.`,

      url: `https://stockplan.id/profil-perusahaan/${slug}`,

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
      title: `Profil Perusahaan ${name} (${ticker}) | Saham, Direksi, Komisaris & Kepemilikan`,

      description: `Lihat profil lengkap perusahaan ${name} (${ticker}) di Bursa Efek Indonesia (IDX). Termasuk bidang usaha, direksi, komisaris, pemegang saham, dan informasi saham terbaru.`,

      images: ["/og-shareholder.png"],
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `https://stockplan.id/profil-perusahaan/${slug}`,
    },

    category: "finance",
  };
}
