"use client";

import shareholder from "@/data/shareholders.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { Building2, Flag, User } from "lucide-react";
import { useParams } from "next/navigation";
import { formatRupiah, unslugify } from "@/lib/utils";

function ShareholderTitle({ name }: { name: string }) {
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
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={searchUrl}
      className="inline-flex items-center gap-2 text-gray-800 font-bold capitalize hover:underline underline-offset-4 transition-all duration-150"
    >
      <h1 className="font-bold flex items-center gap-2 text-gray-800 capitalize">
        {type === "government" && <Flag size={20} />}

        {type === "company" && (
          <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
        )}

        {type === "individual" && (
          <User className="w-5 h-5 text-gray-500 shrink-0" />
        )}

        <span>{name}</span>
      </h1>
    </a>
  );
}

const INITIAL_LOAD = 102;
const LOAD_MORE_STEP = 102;

function Kepemilikan_saham() {
  const params = useParams<{ slug: string }>();
  const slug = unslugify(decodeURIComponent(params?.slug ?? "")).toLowerCase();
  const data = shareholder.data;

  const [search, setSearch] = useState(slug);
  const [sector, setSector] = useState("ALL");

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const previousCountRef = useRef(visibleCount);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data
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
  }, [data, search]);

  const visibleData = useMemo(() => {
    return filteredData.slice(0, visibleCount);
  }, [filteredData, visibleCount]);

  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(INITIAL_LOAD);
  }, [search, sector]);

  useEffect(() => {
    if (visibleCount > previousCountRef.current) {
      lastItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [visibleCount]);

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
              placeholder="Cari kode saham / perusahaan..."
              className="flex-1 min-w-[180px] px-4 py-2 rounded-xl border border-white/40 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center justify-between mb-6 mt-3 px-2">
            <p className="text-[14px] text-right text-gray-500">
              Data: 24 Agustus 2027
            </p>

            <p className="text-[14px] text-right text-gray-500">
              Menampilkan {formatRupiah(filteredData.length, { prefix: false })}{" "}
              data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {visibleData.map((item) => (
            <div
              className="w-full relative col-span-3 md:col-span-1"
              key={item.shareholder_name}
            >
              <div className="bg-white/60 border border-white/30 shadow-sm rounded-3xl p-8 transition">
                {/* HEADER */}

                <div className="flex items-center justify-between mb-4">
                  <ShareholderTitle name={item.shareholder_name} />
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/50 border border-white/40 rounded-2xl p-5 shadow-sm">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.total_companies}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">Total Holdings</p>
                  </div>

                  <div className="bg-orange-100/50 border border-orange-200/40 rounded-2xl p-4 shadow-sm">
                    <p className="text-2xl font-bold text-orange-600">
                      {item.avg_percentage_owned}%
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Total Ownership
                    </p>
                  </div>
                </div>

                {/* HOLDINGS */}
                <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 pb-3 tracking-wide">
                  <p>Kode</p>
                  <p className="text-center">Persentase</p>
                  <p className="text-right pr-5">Tipe</p>
                </div>

                <div className="space-y-4 max-h-[210px] h-[210px] overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                  {item.companies
                    .sort((prev, next) => next.percentage - prev.percentage)
                    .map((_item, index) => (
                      <div
                        key={`${item.shareholder_name}_${index}`}
                        className="shadow-xs bg-white/50 border border-white/40 rounded-xl px-4 py-3 grid grid-cols-3 items-center hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-200"
                      >
                        <p className="font-semibold text-gray-700 text-[16px]">
                          {_item.ticker}
                        </p>

                        <p className="text-center font-medium text-gray-700 text-[14px]">
                          {_item.percentage.toFixed(2)}%
                        </p>

                        <p className="text-right font-medium  text-gray-700 text-[14px]">
                          {_item.type}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

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

export default Kepemilikan_saham;
