import React, { useMemo, useState } from "react";
import { Building2, ExternalLink, Flag, User } from "lucide-react";
import { ShareholderResponse } from "@/types/stocks";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { motion } from "framer-motion";

const ROLE_LABEL: Record<string, string> = {
  SH: "Shareholder",
  DIR: "Director",
  COM: "Commissioner",
  AUD: "Audit Committee",
};

interface Props {
  item: ShareholderResponse;
}

export default function ShareholderGrid(props: Props) {
  const { item } = props;

  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const sortedCompanies = useMemo(() => {
    return [...item.companies].sort(
      (a, b) =>
        (b.shareholder?.percentage ?? 0) - (a.shareholder?.percentage ?? 0),
    );
  }, [item.companies]);

  const displayedCompanies = useMemo(() => {
    if (showAllCompanies) return sortedCompanies;

    return sortedCompanies.slice(0, 6);
  }, [showAllCompanies, sortedCompanies]);

  console.log("displayedCompanies", displayedCompanies);

  return (
    <div className="w-full relative col-span-3 md:col-span-1">
      <div className="bg-white/60 border border-white/30 shadow-sm rounded-3xl p-5 md:p-8 transition">
        {/* HEADER */}
        <div className="flex gap-4 mb-6">
          <ShareholderTitle name={item.name} category={item.category} />
        </div>

        {/* SUMMARY */}
        <div className="mb-6 space-y-3">
          {/* ROLES */}
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              label="Pemegang Saham"
              value={item.summary.shareholder}
            />

            <SummaryCard label="Direktur" value={item.summary.director} />

            <SummaryCard label="Komisaris" value={item.summary.commissioner} />

            <SummaryCard
              label="Komite Audit"
              value={item.summary.audit_committee}
            />
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 gap-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-1 pb-2">
          <p className="col-span-6">Perusahaan</p>

          <p className="col-span-3">Posisi</p>

          <p className="col-span-3 text-center">Detail</p>
        </div>

        {/* LIST */}
        <div className="space-y-2">
          <motion.div
            layout
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="space-y-2"
          >
            {displayedCompanies.map((company, index) => {
              const detail = company.shareholder?.percentage
                ? `${company.shareholder.percentage}%`
                : company.director?.title ||
                  company.commissioner?.title ||
                  company.audit_committee?.title ||
                  "-";

              return (
                <motion.div
                  key={`${item.slug}_${company.ticker}_${index}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.18,
                    delay: index * 0.015,
                  }}
                >
                  <Link
                    href={`/profil-perusahaan/${company.ticker}`}
                    className="block"
                  >
                    <div className="group bg-background border border-border/60 rounded-xl px-3 py-2.5 grid grid-cols-12 gap-2 items-center transition-colors duration-200 hover:border-border hover:bg-muted/20 active:bg-muted/30 cursor-pointer">
                      {/* COMPANY */}
                      <div className="col-span-6 min-w-0">
                        <p className="font-bold text-foreground text-[13px] leading-none">
                          {company.ticker}
                        </p>

                        <p className="text-[11px] text-muted-foreground truncate mt-1">
                          {company.name}
                        </p>
                      </div>

                      {/* ROLE */}
                      <div className="col-span-3">
                        <RoleBadge roles={company.roles} />
                      </div>

                      {/* DETAIL */}
                      <div className="col-span-3 min-w-0">
                        <DetailInfo
                          detail={detail}
                          type={company.shareholder?.type}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {sortedCompanies.length > 6 && (
          <button
            onClick={() => setShowAllCompanies((prev) => !prev)}
            className="mt-4 w-full rounded-xl border border-border/60 bg-background/70 hover:bg-muted/40 transition-all duration-300 px-4 py-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground"
          >
            {showAllCompanies
              ? "Tampilkan Lebih Sedikit"
              : `Tampilkan Semua (${sortedCompanies.length})`}
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5">
      <p className="text-[18px] leading-none font-bold text-foreground">
        {value}
      </p>

      <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
        {label}
      </p>
    </div>
  );
}
function DetailInfo({ detail, type }: { detail: string; type?: string }) {
  if (!type) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-[12px] font-semibold text-gray-800 truncate">
            {detail}
          </p>
        </TooltipTrigger>

        <TooltipContent>
          <div className="text-xs">
            <p className="font-semibold">{detail}</p>

            <p className="text-gray-400 mt-1">{type}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
              <p className="text-[12px] font-semibold text-gray-800 truncate">
                {detail}
              </p>

              <p className="text-[9px] text-gray-400 truncate mt-0.5">{type}</p>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <div className="text-xs">
              <p className="font-semibold">{detail}</p>

              <p className="text-gray-400 mt-1">{type}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-right">
              <p className="text-[12px] font-semibold text-gray-800 truncate">
                {detail}
              </p>

              <p className="text-[9px] text-gray-400 truncate mt-0.5">{type}</p>
            </button>
          </PopoverTrigger>

          <PopoverContent side="top" className="w-auto min-w-[140px] p-3">
            <div className="text-xs">
              <p className="font-semibold">{detail}</p>

              <p className="text-gray-400 mt-1">{type}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function RoleBadge({ roles }: { roles: string[] }) {
  const mappedRoles = roles.map((role) => {
    if (role === "shareholder") return "SH";

    if (role === "director") return "DIR";

    if (role === "commissioner") return "COM";

    if (role === "audit_committee") return "AUD";

    return role.toUpperCase();
  });

  const visibleRoles = mappedRoles.slice(0, 2);

  const remaining = mappedRoles.length - visibleRoles.length;

  const displayText =
    remaining > 0
      ? `${visibleRoles.join(" • ")} +${remaining}`
      : visibleRoles.join(" • ");

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-[9px] font-medium bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-full text-center whitespace-nowrap cursor-default">
              {displayText}
            </span>
          </TooltipTrigger>

          <TooltipContent>
            <div className="flex flex-col gap-1 text-xs">
              {mappedRoles.map((role) => (
                <p key={role}>
                  <span className="font-semibold">{role}</span> ={" "}
                  {ROLE_LABEL[role]}
                </p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-[9px] font-medium bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-full text-center whitespace-nowrap">
              {displayText}
            </button>
          </PopoverTrigger>

          <PopoverContent side="top" className="w-auto min-w-[140px] p-3">
            <div className="flex flex-col gap-1 text-xs">
              {mappedRoles.map((role) => (
                <p key={role}>
                  <span className="font-semibold">{role}</span> ={" "}
                  {ROLE_LABEL[role]}
                </p>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function ShareholderTitle({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  const type = useMemo(() => {
    const governmentRegex =
      /\b(republik indonesia|pemerintah|negara|kementerian|pemda|provinsi|kabupaten|kota|ri)\b/i;

    if (governmentRegex.test(name)) {
      return "government";
    }

    const companyRegex =
      /\b(pt|tbk|persero|corp|inc|ltd|group|holding|bank|asuransi|capital|fund)\b/i;

    if (companyRegex.test(name)) {
      return "company";
    }

    return "individual";
  }, [name]);

  const searchUrl = useMemo(() => {
    const encodedName = encodeURIComponent(name);

    if (type === "government") {
      return `https://www.google.com/search?q=${encodedName}+instansi+pemerintah+profil`;
    }

    if (type === "company") {
      return `https://www.google.com/search?q=${encodedName}+company+profile+investor+relations`;
    }

    return `https://www.google.com/search?q=${encodedName}+profil+orang`;
  }, [name, type]);

  return (
    <div className="flex gap-2">
      {type === "government" && (
        <Flag className="w-5 h-5 text-gray-500 shrink-0" />
      )}

      {type === "company" && (
        <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
      )}

      {type === "individual" && (
        <User className="w-5 h-5 text-gray-500 shrink-0" />
      )}

      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={searchUrl}
          className="inline-flex items-center gap-2 text-gray-800 hover:underline underline-offset-4"
        >
          <h2 className="font-bold text-lg leading-snug capitalize">{name}</h2>
          <ExternalLink
            onClick={() => window.open(searchUrl, "_blank")}
            className="cursor-pointer block w-[14px] h-[14px] text-gray-500"
          />
        </a>
        <p className="text-[13px] capitalize text-neutral-500">{category}</p>
      </div>
    </div>
  );
}
