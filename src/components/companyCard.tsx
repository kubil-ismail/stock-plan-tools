import Link from "next/link";
import CompanyLogo from "./companyLogo";
import { ArrowRight } from "lucide-react";
import {
  StockIndustry,
  StockListResponse,
  StockSector,
  StockSubIndustry,
  StockSubSector,
} from "@/types/stocks";

interface Props {
  company: StockListResponse;
}

export default function CompanyCard(props: Props) {
  const { company } = props;

  return (
    <>
      <Link href={`/profil-perusahaan/${company.ticker}`}>
        <div className="flex flex-col h-full bg-white/70 border border-gray-200 shadow-sm rounded-3xl p-6 transition hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
          {/* HEADER */}

          <div className="flex flex-col md:flex-row items-start gap-4">
            {/* LOGO */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gray-200 bg-white shrink-0 mb-1">
              <CompanyLogo company={company} />
            </div>

            <div className="min-w-0">
              {/* CODE */}
              <h2 className="font-bold text-gray-900 text-[18px] leading-tight">
                {company.ticker}
              </h2>

              {/* NAME */}
              <p
                className="text-sm text-gray-600 mt-1 line-clamp-2"
                title={company.company_name}
              >
                {company.company_name}
              </p>

              {/* BOARD */}
              <div className="mt-2">
                <BoardBadge disableLink board={company.listing_board} />
              </div>
            </div>
          </div>

          {/* MAIN BUSINESS */}

          <div className="mt-5 pt-4 border-t border-gray-100 min-h-18">
            <p className="text-xs text-gray-500 mb-1">Bisnis Utama</p>

            <p
              className="text-sm text-gray-700 line-clamp-2"
              title={company.business_field?.raw_business}
            >
              {company.business_field?.raw_business}
            </p>
          </div>

          {/* CLASSIFICATION */}
          <div className="my-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Sektor & Industri</p>

            <IndustryHierarchy company={company} disableLink />
          </div>

          <div className="mt-auto mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[#F97316] text-[14px] font-bold group-hover:gap-3 transition-all">
              <span>Lihat Selengkapnya</span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export function IndustryHierarchy({
  company,
  disableLink,
}: {
  company: {
    sector: StockSector;
    sub_sector: StockSubSector;
    industry: StockIndustry;
    sub_industry: StockSubIndustry;
  };
  disableLink?: boolean;
}) {
  const rawItems = [
    company?.sector?.name,
    company?.sub_sector?.name,
    company?.industry?.name,
    company?.sub_industry?.name,
  ].filter(Boolean);

  // remove consecutive duplicates
  const items = rawItems.filter(
    (item: string, index: number) => index === 0 || item !== rawItems[index - 1]
  );

  if (items.length === 0) return null;

  return (
    <div
      className="text-sm text-gray-700 leading-relaxed"
      title={items.join(" › ")}
    >
      <span className="">
        {items.map((item: string, index: number) => (
          <span key={index}>
            {disableLink ? (
              <span
                className={
                  index === 0 ? "font-semibold text-gray-800" : "text-gray-600"
                }
              >
                {item}
              </span>
            ) : (
              <a
                className={
                  index === 0 ? "font-semibold text-gray-800" : "text-gray-600"
                }
                href={`/profil-perusahaan?search=${item}`}
              >
                {item}
              </a>
            )}

            {index !== items.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

function BoardBadge({
  board,
  disableLink,
}: {
  board?: string;
  disableLink?: boolean;
}) {
  if (!board) return null;

  const styles: Record<string, string> = {
    Utama: "bg-orange-100 text-orange-700 border-orange-200",

    Pengembangan: "bg-blue-100 text-blue-700 border-blue-200",

    Akselerasi: "bg-purple-100 text-purple-700 border-purple-200",

    "Pemantauan Khusus": "bg-red-100 text-red-700 border-red-200",
  };

  return disableLink ? (
    <span
      className={`
        inline-block
        px-3 py-1
        rounded-xl
        text-xs
        font-semibold
        border
        whitespace-nowrap
        ${styles[board] || "bg-gray-100 text-gray-700 border-gray-200"}
      `}
    >
      {board}
    </span>
  ) : (
    <a
      href={`/profil-perusahaan?search=${board}`}
      className={`
        inline-block
        px-3 py-1
        rounded-xl
        text-xs
        font-semibold
        border
        whitespace-nowrap
        ${styles[board] || "bg-gray-100 text-gray-700 border-gray-200"}
      `}
    >
      {board}
    </a>
  );
}
