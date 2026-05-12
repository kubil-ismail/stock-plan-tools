"use client";

import ShareholderGrid from "@/components/shareholderGrid";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatRupiah, unslugify } from "@/lib/utils";
import posthog from "posthog-js";
import Breadcrumbs from "@/components/breadcrumbs";
import { JSONResponse, ShareholderResponse } from "@/types/stocks";
import { ArrowUp, Loader2, Search } from "lucide-react";

const INITIAL_LOAD = 36;
const LOAD_MORE_STEP = 24;

interface Props {
  shareholder: JSONResponse<ShareholderResponse[]>;
}

function Kepemilikan_saham_view(props: Props) {
  const { shareholder: _shareholder } = props;

  const params = useParams<{ slug: string }>();
  const slug = unslugify(params?.slug ?? "");

  const [search, setSearch] = useState(slug);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const filteredData = useMemo(() => {
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const keyword = normalize(search);

    return _shareholder?.data
      ?.filter((item) => {
        if (!keyword) return true;

        const matchName = normalize(item.name).includes(keyword);

        const matchSlug = normalize(item.slug).includes(keyword);

        const matchTicker = item.companies.some((company) =>
          normalize(company.ticker).includes(keyword),
        );

        const matchCompany = item.companies.some((company) =>
          normalize(company.name).includes(keyword),
        );

        const matchKeywords = item.keywords?.some((kw) =>
          normalize(kw).includes(keyword),
        );

        return (
          matchName || matchSlug || matchTicker || matchCompany || matchKeywords
        );
      })
      .sort((a, b) => b.total_company - a.total_company);
  }, [search, _shareholder?.data]);

  const visibleData = useMemo(() => {
    return filteredData?.slice(0, visibleCount);
  }, [filteredData, visibleCount]);

  const hasMore = visibleCount < filteredData?.length;

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);

    requestAnimationFrame(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_STEP);

      posthog.capture("shareholder_infinite_load", {
        search_term: search,
        visible_count: visibleCount,
        total_results: filteredData?.length,
      });

      setTimeout(() => {
        setIsFetching(false);
      }, 300);
    });
  }, [filteredData?.length, hasMore, isFetching, search, visibleCount]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchBlur = () => {
    if (search) {
      posthog.capture("shareholder_searched", {
        search_term: search,
        result_count: filteredData?.length,
      });
    }
  };

  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(INITIAL_LOAD);
  }, [search]);

 useEffect(() => {
   const handleScroll = () => {
     setShowScrollTop(window.scrollY > 300);
   };

   handleScroll();

   window.addEventListener("scroll", handleScroll, { passive: true });

   return () => {
     window.removeEventListener("scroll", handleScroll);
   };
 }, []);


  return (
    <div className="relative min-h-screen py-6 md:py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="hidden md:absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />

      <div className="hidden md:absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Breadcrumbs */}
        <Breadcrumbs
          nav={[
            { name: "Home", link: "/" },
            { name: "Market & Insight", link: "/#market-insight" },
            {
              name: "Kepemilikan Saham",
              link: "/kepemilikan-saham",
              active: true,
            },
          ]}
        />

        {/* SEARCH */}
        <div className="my-6">
          <div className="bg-white/60 border border-white/30 rounded-2xl p-3 md:p-4 shadow-sm flex flex-wrap gap-3 items-center backdrop-blur">
            <input
              type="search"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={handleSearchBlur}
              placeholder="Cari kode saham / perusahaan..."
              className="flex-1 min-w-[180px] px-4 py-2.5 rounded-xl border border-white/40 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center mb-6 mt-3 px-2">
            <p className="text-[13px] text-right text-muted-foreground">
              Menampilkan{" "}
              {formatRupiah(filteredData?.length, { prefix: false })} data
              kepemilikan
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {visibleData?.map((item) => (
            <ShareholderGrid item={item} key={item.name} />
          ))}
        </div>

        {/* EMPTY */}
        {Boolean(visibleData?.length === 0) && (
          <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground mt-6">
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>

              <p className="text-[16px] font-medium text-foreground mb-1">
                Informasi perusahaan tidak ditemukan
              </p>

              <p className="text-[14px] text-muted-foreground">
                Coba cari menggunakan kode saham atau nama perusahaan lain
              </p>
            </div>
          </div>
        )}

        {/* OBSERVER */}
        {hasMore && (
          <div
            ref={observerRef}
            className="h-20 flex items-center justify-center"
          >
            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />

                <span>Memuat data berikutnya...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING SCROLL TO TOP */}
      <div
        className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-out ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
      >
        <button
          onClick={handleScrollTop}
          className="
      group relative overflow-hidden
      flex items-center justify-center
      w-14 h-14 rounded-full

      bg-black/80
      backdrop-blur-2xl

      border border-white/10
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]

      transition-all duration-300
      hover:scale-110
      hover:bg-black
      active:scale-95
    "
        >
          {/* ambient glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute -top-10 left-0 w-full h-20 bg-orange-400/20 blur-2xl" />

            <div className="absolute bottom-0 right-0 w-full h-20 bg-blue-400/20 blur-2xl" />
          </div>

          <ArrowUp className="w-5 h-5 text-white relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

export default Kepemilikan_saham_view;
