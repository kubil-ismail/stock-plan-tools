import { Metadata } from "next";
import { StockDetailResponse } from "@/types/stocks";
import Profil_perusahaan_detail_view from "@/pages/(market-and-insight)/profil-perusahaan/[slug]/profil-perusahaan-detail.view";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page(props: Props) {
  const { params } = props;
  const { slug } = await params;

  const [requestDetailCompany] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${String(
        slug
      ).toUpperCase()}`
    ).then((res) => res.json()),
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

  const [requestDetailCompany] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${String(
        slug
      ).toUpperCase()}`
    ).then((res) => res.json()),
  ]);

  const _company: StockDetailResponse = requestDetailCompany.data;

  const name = _company?.company_name || slug;
  const ticker = _company?.ticker || slug;

  const baseUrl = "https://stockplan.id";
  const ogImage = `${baseUrl}/api/og/profil-perusahaan?ticker=${ticker}&name=${name}&industry=${_company?.industry?.name}&sector=${_company?.sector?.name}`;

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
