import type { MetadataRoute } from "next";
import shareholder from "@/data/shareholders.json";
import company from "@/data/company_list.json";
import { slugify } from "@/lib/utils";

const BASE_URL = "https://stockplan.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/informasi-perusahaan",
    "/kepemilikan-saham",
    "/profil-perusahaan",
    "/kalkulator-avarage",
    "/watchlist",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const shareholders_sitemap = Array.from(
    new Map(
      shareholder.data.map((item) => [slugify(item.shareholder_name), item])
    ).values()
  )
    .sort((a, b) => a.shareholder_name.localeCompare(b.shareholder_name))
    .map((item) => ({
      url: `${BASE_URL}/kepemilikan-saham/${slugify(item.shareholder_name)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const profil_sitemap = Array.from(
    new Map(company.data.map((item) => [item.code, item])).values()
  )
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((item) => ({
      url: `${BASE_URL}/profil-perusahaan/${item.code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...shareholders_sitemap, ...profil_sitemap];
}
