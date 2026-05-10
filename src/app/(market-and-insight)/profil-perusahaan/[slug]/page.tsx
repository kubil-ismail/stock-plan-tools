import { Metadata } from "next";
import company from "@/data/archive/company.json";
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

  const [requestDetailCompany] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/AADI`).then((res) =>
      res.json(),
    ),
  ]);

  return (
    <Profil_perusahaan_detail_view
      slug={String(slug)}
      detailCompany={requestDetailCompany}
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const companySelected = _company.find((item) => item.ticker === String(slug));

  const name = companySelected?.name || slug;
  const ticker = companySelected?.ticker || slug;

  const baseUrl = "https://stockplan.id";
  const ogImage = `${baseUrl}/api/og/profil-perusahaan?ticker=${ticker}&name=${name}&industry=${companySelected?.industry?.name}&sector=${companySelected?.sector?.name}`;

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

      description: `Lihat profil lengkap perusahaan ${name} (${ticker}). Termasuk bidang usaha, direksi, komisaris, pemegang saham, dan informasi saham terbaru.`,

      url: `https://stockplan.id/profil-perusahaan/${slug}`,

      siteName: "Stockplan",
      locale: "id_ID",
      type: "website",

      images: [
        {
          url: ogImage, // ✅ FULL URL
          width: 1200,
          height: 630,
          alt: `Profil Perusahaan ${name} (${ticker})`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Profil Perusahaan ${name} (${ticker})`,
      description: `Lihat profil lengkap perusahaan ${name} (${ticker}). Termasuk bidang usaha, direksi, komisaris, pemegang saham, dan informasi saham terbaru.`,
      images: [ogImage], // ✅ sama dengan OG
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
