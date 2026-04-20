import type { Metadata } from "next";
import { unslugify } from "@/lib/utils";
import Kepemilikan_saham_view from "@/pages/(market-and-insight)/kepemilikan-saham/kepemilikan_saham.view";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page() {
  return <Kepemilikan_saham_view />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const _slug = (await params).slug;
  const slug = unslugify(_slug);

  return {
    title: `Kepemilikan Saham ${slug} - Stockplan`,

    description: `Lihat struktur kepemilikan saham ${slug} di Bursa Efek Indonesia. Ketahui pemegang saham terbesar, institusi, dan pemerintah secara lengkap.`,

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
      title: `Kepemilikan Saham & Pemegang Saham  ${slug}`,

      description: `Telusuri struktur kepemilikan saham ${slug} di Bursa Efek Indonesia. Lihat pemegang saham pemerintah, institusi, dan individu secara lengkap.`,

      url: `https://stockplan.id/kepemilikan-saham/${slug}`,

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

      title: `Kepemilikan Saham & Pemegang Saham  ${slug}`,

      description: `Lihat siapa pemilik saham ${slug}.`,

      images: ["/og-shareholder.png"],
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `https://stockplan.id/kepemilikan-saham/${slug}`,
    },

    category: "finance",
  };
}
