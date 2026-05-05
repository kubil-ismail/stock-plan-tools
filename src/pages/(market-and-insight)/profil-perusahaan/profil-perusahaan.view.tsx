"use client";
import React, { useMemo, useState } from "react";
import company from "@/data/company.json";
import CompanyCard from "@/components/companyCard";
import { StockDetail } from "@/types/stocks";
import posthog from "posthog-js";

const INITIAL_LOAD = 120;
const LOAD_MORE_STEP = 120;

function Profil_perusahaan_view({ search }: { search: string }) {
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;

  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  // SEARCH FILTER
  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return _company;

    const keyword = searchTerm.toLowerCase();

    return _company.filter((c) => {
      return (
        c.ticker?.toLowerCase().includes(keyword) ||
        c.name?.toLowerCase().includes(keyword) ||
        c.sector.name?.toLowerCase().includes(keyword) ||
        c.subsector.name?.toLowerCase().includes(keyword) ||
        c.industry.name?.toLowerCase().includes(keyword) ||
        c.subindustry.name?.toLowerCase().includes(keyword) ||
        c.main_business?.toLowerCase().includes(keyword) ||
        c.listing_board?.toLowerCase().includes(keyword)
      );
    });
  }, [_company, searchTerm]);

  // PAGINATION
  const visibleData = filteredCompanies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCompanies.length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);

    // reset pagination saat search
    setVisibleCount(INITIAL_LOAD);
  };

  const handleLoadMore = () => {
    posthog.capture("company_profile_load_more_clicked", {
      search_term: searchTerm,
      visible_count: visibleCount,
      total_results: filteredCompanies.length,
    });
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const handleSearchBlur = () => {
    if (searchTerm) {
      posthog.capture("company_profile_searched", {
        search_term: searchTerm,
        result_count: filteredCompanies.length,
      });
    }
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
              onBlur={handleSearchBlur}
              placeholder="Cari kode saham / nama perusahaan..."
              className="flex-1 min-w-[180px] px-4 py-2 rounded-xl border border-white/40 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center mb-6 mt-3 px-2">
            <p className="text-[14px] text-right text-gray-500">
              Menampilkan {filteredCompanies.length} perusahaan
            </p>
          </div>
        </div>

        {/* Data Grid */}
        {filteredCompanies.length === 0 ? (
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
                &quot;{searchTerm}&ldquo;
              </span>
            </p>

            {/* Hint */}
            <p className="text-xs text-gray-400 mt-3">
              Coba gunakan kata kunci lain
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleData.map((company: StockDetail) => (
              <CompanyCard key={company.ticker} company={company} />
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
              Tampilkan Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil_perusahaan_view;
