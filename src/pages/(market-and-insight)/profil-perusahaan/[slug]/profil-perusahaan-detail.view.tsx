"use client";

import company from "@/data/company.json";
import CompanyLogo from "@/components/companyLogo";
import { IndustryHierarchy } from "@/components/companyCard";
import { StockDetail } from "@/types/stocks";
import { GlassCard } from "@/components/glassCard";
import { TabsIcons } from "@/components/tabs";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import Profil_perusahaan_view from "./tabs/profil-perusahaan.view";
import Aksi_korporasi_view from "./tabs/aksi-korporasi.view";

function Company_detail_view({ slug }: { slug: string }) {
  const search = useSearchParams();
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const selectedCompany = _company.find((item) => item.ticker === slug)!;

  const tabs = search?.get("tabs") ?? "profil-perusahaan";

  return (
    <div className="relative min-h-screen py-6 md:py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-5xl mx-auto space-y-5 md:space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          nav={[
            { name: "Home", link: "/" },
            {
              name: "Market & Insight",
              link: "/#market-insight",
              className: "hidden md:block",
            },
            {
              name: "Profil Perusahaan",
              link: "/profil-perusahaan",
            },
            {
              name: selectedCompany?.ticker,
              link: `/profil-perusahaan/${selectedCompany?.ticker}`,
              active: true,
            },
          ]}
        />

        {/* Head */}
        <GlassCard>
          <div className="flex gap-4">
            {/* LOGO */}
            <CompanyLogo company={selectedCompany} />

            {/* COMPANY IDENTITY */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {selectedCompany?.ticker}
                </h1>
              </div>

              <p className="text-base text-gray-700 text-[14px] md:text-[16px] font-medium text-pretty">
                {selectedCompany?.name}
              </p>

              <IndustryHierarchy company={selectedCompany!} />
            </div>
          </div>
        </GlassCard>

        <TabsIcons />

        {/* Profil Perusahaan */}
        {tabs === "profil-perusahaan" && (
          <Profil_perusahaan_view selectedCompany={selectedCompany} />
        )}

        {/* Aksi Korporasi */}
        {tabs === "aksi-korporasi" && <Aksi_korporasi_view slug={slug} />}
      </div>
    </div>
  );
}

export default Company_detail_view;
