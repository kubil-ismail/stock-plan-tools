"use client";

import Link from "next/link";
import company from "@/data/company.json";
import CompanyLogo from "@/components/companyLogo";
import ManagementCard from "@/components/managementCard";
import SecretaryCard from "@/components/secretaryCard";
import ShareholderCard from "@/components/shareholderCard";
import SubsidiarieCard from "@/components/subsidiarieCard";
import { IndustryHierarchy } from "@/components/companyCard";
import { StockDetail, StockManagement } from "@/types/stocks";
import { GlassCard } from "@/components/glassCard";
import { parseNumber, sortManagement } from "@/lib/utils";
import { format } from "date-fns";

function Company_detail_view({ slug }: { slug: string }) {
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const selectedCompany = _company.find((item) => item.ticker === slug)!;

  const ceo = selectedCompany?.managements.find(
    (item: StockManagement) =>
      item.position === "PRESIDEN DIREKTUR" ||
      item.position === "DIREKTUR UTAMA"
  );

  const secretary = selectedCompany?.managements.find(
    (item: StockManagement) => item.position === "SEKRETARIS PERUSAHAAN"
  );

  const managements = sortManagement(selectedCompany?.managements);

  const shareholders = selectedCompany.shareholders
    .slice()
    .sort((a, b) => parseNumber(b.total) - parseNumber(a.total));

  const subsidiaries = selectedCompany.subsidiaries
    .slice()
    .sort((a, b) => parseNumber(b.asset) - parseNumber(a.asset));

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Head */}
        <GlassCard>
          <div className="flex gap-6 items-center">
            {/* LOGO */}
            <CompanyLogo company={selectedCompany} />

            {/* COMPANY IDENTITY */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {selectedCompany?.ticker}
                </h1>
              </div>

              <p className="text-base text-gray-700 font-medium">
                {selectedCompany?.name}
              </p>

              <IndustryHierarchy company={selectedCompany!} />
            </div>
          </div>
        </GlassCard>

        {/* INFORMASI PERUSAHAAN */}
        <GlassCard>
          <h3 className="text-[24px] font-semibold text-foreground mb-1 flex items-center gap-2">
            Tentang {selectedCompany?.name}
          </h3>
          <p className="text-[14px] text-muted-foreground mb-6">
            Detailed corporate structure and fundamentals
          </p>

          <section className="my-10">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Sector
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {selectedCompany?.sector?.name}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Website
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {selectedCompany?.website}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  IPO date
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {format(
                    selectedCompany?.listing_date ?? new Date(),
                    "d MMMM yyyy"
                  )}
                </p>
              </div>

              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Industry
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {selectedCompany?.sector?.name}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  NPWP
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {selectedCompany?.tin}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1 capitalize">
                  {ceo?.position?.toLowerCase()}
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {ceo?.name}
                </p>
              </div>

              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Papan
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {selectedCompany?.listing_board}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Headquarters
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {selectedCompany?.office_address}
                </p>
              </div>
            </div>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Main Business
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {selectedCompany?.main_business}
            </p>
          </section>

          {/* Sekertaris Perusahaan */}
          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Sekertaris Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <SecretaryCard secretary={secretary!} />
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Manajemen Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {managements.map((item, key) => (
                <Link
                  href={`/kepemilikan-saham/${item.name.toLowerCase()}`}
                  key={key}
                >
                  <ManagementCard item={item} />
                </Link>
              ))}
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Pemegang Saham
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {shareholders?.map((item, key) => (
                <Link
                  href={`/kepemilikan-saham/${item.name.toLowerCase()}`}
                  key={key}
                >
                  <ShareholderCard item={item} />
                </Link>
              ))}
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Anak Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {subsidiaries.map((item, key) => (
                <SubsidiarieCard item={item} key={key} />
              ))}
            </div>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}

export default Company_detail_view;
