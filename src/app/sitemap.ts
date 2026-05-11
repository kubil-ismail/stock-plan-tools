import type { MetadataRoute } from "next";

import shareholder from "@/data/company/shareholders.json";
import company from "@/data/company/company.json";

import type { ShareholderResponse, StockListResponse } from "@/types/stocks";

const BASE_URL = "https://stockplan.id";

const shareholdersData = shareholder as ShareholderResponse[];

const companyData = company.data as StockListResponse[];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/informasi-perusahaan",
    "/kepemilikan-saham",
    "/profil-perusahaan",
    "/kalkulator-avarage",
    "/watchlist",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const shareholdersSitemap: MetadataRoute.Sitemap = Array.from(
    new Map(shareholdersData.map((item) => [item.slug, item])).values()
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({
      url: `${BASE_URL}/kepemilikan-saham/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const profilSitemap: MetadataRoute.Sitemap = Array.from(
    new Map(companyData.map((item) => [item.ticker, item])).values()
  )
    .sort((a, b) => a.ticker.localeCompare(b.ticker))
    .map((item) => ({
      url: `${BASE_URL}/profil-perusahaan/${item.ticker}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...shareholdersSitemap, ...profilSitemap];
}
