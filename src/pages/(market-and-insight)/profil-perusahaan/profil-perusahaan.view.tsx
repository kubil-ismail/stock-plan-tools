/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import company from "@/data/company.json";
import CompanyLogo from "@/components/companyLogo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const INITIAL_LOAD = 120;
const LOAD_MORE_STEP = 120;

function Company_list_view(props) {

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [searchTerm, setSearchTerm] = useState(props?.search ?? "");

  // MAP DATA
  const companies = useMemo(
    () =>
      company.data.map((_, i) => ({
        logo: `https://www.idx.co.id/${_.logo}`,
        Nama: _.name,
        Kode: _.ticker,
        Sektor: _.sector.name,
        Subsektor: _.subsector.name,
        Industri: _.industry.name,
        Subindustri: _.subindustry.name,
        "Tanggal Pencatatan": _.listing_date,
        "Bidang Usaha Utama": _.main_business,
        "Papan Pencatatan": _.listing_board,
        Direktur: [{}, {}, {}, {}],
        Komisaris: [{}, {}],
        "Anak Perusahaan": [],
      })),
    []
  );

  // SEARCH FILTER
  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return companies;

    const keyword = searchTerm.toLowerCase();

    return companies.filter((c) => {
      return (
        c.Kode?.toLowerCase().includes(keyword) ||
        c.Nama?.toLowerCase().includes(keyword) ||
        c.Sektor?.toLowerCase().includes(keyword) ||
        c.Subsektor?.toLowerCase().includes(keyword) ||
        c.Industri?.toLowerCase().includes(keyword) ||
        c.Subindustri?.toLowerCase().includes(keyword) ||
        c["Bidang Usaha Utama"]?.toLowerCase().includes(keyword) ||
        c["Papan Pencatatan"]?.toLowerCase().includes(keyword)
      );
    });
  }, [companies, searchTerm]);

  // PAGINATION
  const visibleData = filteredCompanies.slice(0, visibleCount);

  const hasMore = visibleCount < filteredCompanies.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  // SEARCH HANDLER
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);

    // reset pagination saat search
    setVisibleCount(INITIAL_LOAD);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}

      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />

      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* SEARCH */}

        <div className="mb-6">
          <div className="bg-white/60 border border-white/30 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Cari kode saham / nama perusahaan..."
              className="flex-1 min-w-[180px] px-4 py-2 rounded-xl border border-white/40 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center justify-between mb-6 mt-3 px-2">
            <p className="text-[14px] text-left text-gray-500">
              Data: 23 April 2026
            </p>

            <p className="text-[14px] text-right text-gray-500">
              Menampilkan {filteredCompanies.length} perusahaan
            </p>
          </div>
        </div>

        {/* GRID */}

        {filteredCompanies.length === 0 ? (
          <EmptySearchState keyword={searchTerm} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleData.map((company: any) => (
              <CompanyCard key={company.Kode} company={company} />
            ))}
          </div>
        )}

        {/* LOAD MORE */}

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:opacity-90"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Company_list_view;

function EmptySearchState({ keyword }: { keyword: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-2xl">🔍</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        Tidak ada hasil ditemukan
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1 max-w-sm">
        Tidak ada perusahaan yang cocok dengan pencarian{" "}
        <span className="font-medium text-gray-700">
          &quot;{keyword}&ldquo;
        </span>
      </p>

      {/* Hint */}
      <p className="text-xs text-gray-400 mt-3">Coba gunakan kata kunci lain</p>
    </div>
  );
}

function CompanyCard({ company }: any) {
  return (
    <Link href={`/profil-perusahaan/${company.Kode}`}>
      <div className="flex flex-col h-full bg-white/70 border border-gray-200 shadow-sm rounded-3xl p-6 transition hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
        {/* HEADER */}

        <div className="flex items-start gap-4">
          {/* LOGO */}

          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gray-200 bg-white shrink-0">
            <CompanyLogo company={company} />
          </div>

          {/* TEXT BLOCK */}

          <div className="min-w-0">
            {/* CODE */}

            <h2 className="font-bold text-gray-900 text-[18px] leading-tight">
              {company.Kode}
            </h2>

            {/* NAME */}

            <p
              className="text-sm text-gray-600 mt-1 line-clamp-2"
              title={company.Nama}
            >
              {company.Nama}
            </p>

            {/* BOARD */}

            <div className="mt-2">
              <BoardBadge board={company["Papan Pencatatan"]} />
            </div>
          </div>
        </div>

        {/* MAIN BUSINESS */}

        {company["Bidang Usaha Utama"] && (
          <div className="mt-5 pt-4 border-t border-gray-100 min-h-18">
            <p className="text-xs text-gray-500 mb-1">Main Business</p>

            <p
              className="text-sm text-gray-700 line-clamp-2"
              title={company["Bidang Usaha Utama"]}
            >
              {company["Bidang Usaha Utama"]}
            </p>
          </div>
        )}

        {/* CLASSIFICATION */}
        <div className="my-5 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Sector & Industry</p>

          <IndustryHierarchy company={company} />
        </div>

        <div className="mt-auto mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[#F97316] text-[14px] font-bold group-hover:gap-3 transition-all">
            <span>Lihat Selengkapnya</span>

            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function IndustryHierarchy({ company }: any) {
  const rawItems = [
    company.Sektor,
    company.Subsektor,
    company.Industri,
    company.Subindustri,
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
            <span
              className={
                index === 0 ? "font-semibold text-gray-800" : "text-gray-600"
              }
            >
              {item}
            </span>

            {index !== items.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

function BoardBadge({ board }: { board?: string }) {
  if (!board) return null;

  const styles: Record<string, string> = {
    Utama: "bg-orange-100 text-orange-700 border-orange-200",

    Pengembangan: "bg-blue-100 text-blue-700 border-blue-200",

    Akselerasi: "bg-purple-100 text-purple-700 border-purple-200",

    "Pemantauan Khusus": "bg-red-100 text-red-700 border-red-200",
  };

  return (
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
  );
}
