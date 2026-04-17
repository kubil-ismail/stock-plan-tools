import type { MetadataRoute } from "next";

const BASE_URL = "https://stockplan.id";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kalender-saham`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/aktivitas-insider`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kepemilikan-saham`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },

    {
      url: `${BASE_URL}/kalkulator-avarage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kalkulator-drawdown`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kalkulator-resiko-and-reward`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pembagian-portofolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kalkulator-dividen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/simulasi-strategi-investasi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
