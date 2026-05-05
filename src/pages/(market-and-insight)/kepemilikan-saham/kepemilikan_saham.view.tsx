"use client";
import shareholder from "@/data/shareholders.json";
import ShareholderGrid from "@/components/shareholderGrid";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { formatRupiah, unslugify } from "@/lib/utils";
import posthog from "posthog-js";

const INITIAL_LOAD = 102;
const LOAD_MORE_STEP = 102;

function Kepemilikan_saham_view() {
  const params = useParams<{ slug: string }>();
  const slug = unslugify(params?.slug ?? "");

  const [search, setSearch] = useState(slug);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return shareholder.data
      .filter((item) => {
        if (!search) return true;

        const matchShareholder = item.shareholder_name
          .toLowerCase()
          .includes(keyword);

        const matchTicker = item.companies?.some((c) =>
          c.ticker.toLowerCase().includes(keyword)
        );

        const matchCompany = item.companies?.some((c) =>
          c.name.toLowerCase().includes(keyword)
        );

        return matchShareholder || matchTicker || matchCompany;
      })
      .sort((a, b) => Number(b.total_companies) - Number(a.total_companies));
  }, [search]);

  const visibleData = useMemo(() => {
    return filteredData.slice(0, visibleCount);
  }, [filteredData, visibleCount]);

  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    posthog.capture("shareholder_load_more_clicked", {
      search_term: search,
      visible_count: visibleCount,
      total_results: filteredData.length,
    });
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const handleSearchBlur = () => {
    if (search) {
      posthog.capture("shareholder_searched", {
        search_term: search,
        result_count: filteredData.length,
      });
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background Glass Ornaments */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-6">
          <div className="bg-white/60 border border-white/30 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3 items-center">
            <input
              type="text"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={handleSearchBlur}
              placeholder="Cari kode saham / perusahaan..."
              className="flex-1 min-w-[180px] px-4 py-2 rounded-xl border border-white/40 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center mb-6 mt-3 px-2">
            <p className="text-[14px] text-right text-gray-500">
              Menampilkan {formatRupiah(filteredData.length, { prefix: false })}{" "}
              data kepemilikan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {visibleData.map((item) => (
            <ShareholderGrid item={item} key={item.shareholder_name} />
          ))}
        </div>

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

export default Kepemilikan_saham_view;
