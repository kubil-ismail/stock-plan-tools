"use client";

import React from "react";
import { Building2, Mail, Phone, User, Users, Landmark } from "lucide-react";
import companys from "@/data/company.json";
import { useParams } from "next/navigation";
import CompanyLogo from "@/components/companyLogo";
import { format } from "date-fns";
import Link from "next/link";

// =============================
// REUSABLE GLASS CARD (cleaner, more enterprise look)
// =============================

const TYPE_PRIORITY: Record<string, number> = {
  KOMISARIS: 1,
  DIREKSI: 2,
  "SEKRETARIS PERUSAHAAN": 3,
  "KOMITE AUDIT": 4,
};

const POSITION_PRIORITY: Record<string, number> = {
  "KOMISARIS UTAMA": 1,
  KOMISARIS: 2,

  "DIREKTUR UTAMA": 1,
  "WAKIL DIREKTUR UTAMA": 2,
  DIREKTUR: 3,

  "SEKRETARIS PERUSAHAAN": 1,

  KETUA: 1,
  ANGGOTA: 2,
};

function getShareholderIcon(type?: string) {
  switch (type) {
    case "Lebih dari 5%":
      return <Building2 className="w-5 h-5 text-primary" />;

    case "Direksi":
    case "Komisaris":
      return <User className="w-5 h-5 text-primary" />;

    case "Masyarakat Non Warkat":
    case "Masyarakat Warkat":
      return <Users className="w-5 h-5 text-primary" />;

    case "Saham Treasury":
      return <Landmark className="w-5 h-5 text-primary" />;

    default:
      return <User className="w-5 h-5 text-primary" />;
  }
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-6 md:p-8 shadow-sm">
      {children}
    </div>
  );
}

function sortManagement(data: any[]) {
  return [...data].sort((a, b) => {
    // 1️⃣ sort by TYPE dulu
    const typeA = TYPE_PRIORITY[a.type] ?? 999;
    const typeB = TYPE_PRIORITY[b.type] ?? 999;

    if (typeA !== typeB) {
      return typeA - typeB;
    }

    // 2️⃣ baru sort by POSITION dalam type yang sama
    const posA = POSITION_PRIORITY[a.position] ?? 999;
    const posB = POSITION_PRIORITY[b.position] ?? 999;

    if (posA !== posB) {
      return posA - posB;
    }

    // 3️⃣ fallback: name
    return a.name.localeCompare(b.name);
  });
}

function formatPosition(type?: string, position?: string) {
  if (!type && !position) return "-";

  // case: Komite
  if (type === "KOMITE AUDIT") {
    return `Komite Audit ${capitalize(position)}`;
  }

  // case: Sekretaris
  if (type === "SEKRETARIS PERUSAHAAN") {
    return "Sekretaris Perusahaan";
  }

  // case: Direksi / Komisaris
  if (type === position) {
    return capitalize(position);
  }

  return capitalize(position);
}

function parseNumber(value?: string | number) {
  if (value === null || value === undefined) return 0;

  if (typeof value === "number") return value;

  return Number(value.replace(/\./g, ""));
}

function capitalize(text?: string) {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// =============================
// COMPANY DETAIL VIEW
// =============================

function Company_detail_view() {
  const params = useParams();
  const _company: any = companys.data.find(
    (item) => item.ticker === params?.slug
  );

  const company = {
    ..._company,
    logo: `https://www.idx.co.id/${_company.logo}`,

    secretary: _company.managements.find(
      (item: any) => item.type === "SEKRETARIS PERUSAHAAN"
    ),
    ceo: _company.managements.find(
      (item: any) =>
        item.position === "PRESIDEN DIREKTUR" ||
        item.position === "DIREKTUR UTAMA"
    ),

    manajemen: sortManagement(
      _company.managements.filter(
        (item: any) => item.position != "SEKRETARIS PERUSAHAAN"
      )
    ),

    subsidiaries: _company.subsidiaries
      ?.slice() // optional: avoid mutating original
      .sort((a, b) => parseNumber(b.asset) - parseNumber(a.asset)),

    shareholders: _company.shareholders
      ?.slice() // optional: avoid mutating original
      .sort((a, b) => parseNumber(b.total) - parseNumber(a.total)),
  };

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}

      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />

      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />
      <div className="max-w-5xl mx-auto space-y-8">
        <GlassCard>
          <div className="flex gap-6 items-center">
            {/* LOGO */}

            <CompanyLogo company={company} />

            {/* COMPANY IDENTITY */}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {company.ticker}
                </h1>
              </div>

              <p className="text-base text-gray-700 font-medium">
                {company.name}
              </p>

              {/* SECTOR CLASSIFICATION */}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                <span className="font-medium text-gray-800">
                  {company?.sector?.name ?? ""}
                </span>

                <span className="text-gray-400">•</span>

                <span>{company?.subsector?.name ?? ""}</span>

                <span className="text-gray-400">•</span>

                <span>{company.industry?.name}</span>

                <span className="text-gray-400">•</span>

                <span>{company.subindustry?.name}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* INFORMASI PERUSAHAAN */}
        <GlassCard>
          <h3 className="text-[24px] font-semibold text-foreground mb-1 flex items-center gap-2">
            Tentang {company?.name}
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
                  {company.sector?.name}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Website
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {company.website}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  IPO date
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {format(company.listing_date, "d MMMM yyyy")}
                </p>
              </div>

              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Industry
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {company.sector?.name}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Identifiers
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {company.tin}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1 capitalize">
                  {company?.ceo?.position?.toLowerCase()}
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {company.ceo?.name}
                </p>
              </div>

              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Papan
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                  {company.listing_board}
                </p>

                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  Headquarters
                </h4>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {company.office_address}
                </p>
              </div>
            </div>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Main Business
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {company.main_business}
            </p>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Sekertaris Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-bold text-primary">
                    {company.secretary?.name
                      ?.split(" ")
                      ?.map((n) => n[0])
                      ?.join("")
                      ?.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-[14px] font-semibold text-foreground mb-0.5">
                      {company.secretary?.name}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      <Mail className="text-muted-foreground" size={13} />
                      <a
                        className="text-[13px] text-muted-foreground"
                        href="mailto:company.secretary?.email"
                      >
                        {company.secretary?.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Phone className="text-muted-foreground" size={13} />
                    <p className="text-[12px] text-muted-foreground">
                      {company.secretary?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Manajemen Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {company.manajemen.map((item, key) => (
                <Link
                  href={`/kepemilikan-saham/${item.name.toLowerCase()}`}
                  key={key}
                >
                  <div
                    className="bg-muted/40 rounded-xl p-4 flex items-start gap-3"
                    key={key}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-primary">
                        {item?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")
                          ?.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-foreground mb-0.5">
                          {item?.name}
                        </p>
                      </div>

                      <p className="text-[12px] text-muted-foreground">
                        {formatPosition(item.type, item.position)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Pemegang Saham
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {company?.shareholders.map((item, key) => (
                <Link
                  href={`/kepemilikan-saham/${item.name.toLowerCase()}`}
                  key={key}
                >
                  <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-primary">
                        {getShareholderIcon(item.type)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-foreground mb-0.5">
                          {item?.name}
                        </p>
                      </div>

                      <p className="text-[12px] text-muted-foreground">
                        <span className="font-medium">Jenis:</span> {item?.type}
                      </p>

                      <p className="text-[12px] text-muted-foreground">
                        <span className="font-medium">Jumlah:</span>{" "}
                        {item?.total} ({item?.percentage})
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="my-10">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Anak Perusahaan
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {company?.subsidiaries.map((item, key) => (
                <div
                  className="bg-muted/40 rounded-xl p-4 flex items-start gap-3"
                  key={key}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[14px] font-bold text-primary">
                      <Building2 className="w-5 h-5 text-primary" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-[14px] font-semibold text-foreground mb-0.5">
                        {item?.name}
                      </p>
                    </div>

                    <p className="text-[12px] text-muted-foreground">
                      <span className="font-medium">Jenis:</span> {item?.type}
                    </p>

                    <p className="text-[12px] text-muted-foreground">
                      <span className="font-medium">Asset Total:</span>{" "}
                      {item?.asset} ({item?.percentage})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}

export default Company_detail_view;
