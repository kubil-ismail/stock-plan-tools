/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockListResponse } from "@/types/stocks";
import { useMemo, useRef, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";

import posthog from "posthog-js";
import CompanyLogo from "@/components/companyLogo";
import Breadcrumbs from "@/components/breadcrumbs";

import company from "@/data/company/company.json";
import pemantauan_khusus from "@/data/information/special_board.json";
import calendar from "@/data/information/calendar.json";

interface CalendarResponse {
  tanggal: string;
  ticker: string;
  perihal: string;
  lokasi: string;
}

function Informasi_perusahaan_view() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [date, setDate] = useState(new Date());

  const filter_calendar = useMemo(() => {
    return calendar?.data?.length
      ? calendar.data.filter(
          (item: CalendarResponse) =>
            item?.tanggal ===
            format(date, "dd MMM yyyy", {
              locale: id,
            }),
        )
      : [];
  }, [date, calendar?.data]);

  const filter_pemantauan_khusus = useMemo(() => {
    return pemantauan_khusus.data.filter(
      (item) =>
        item.entry_date ===
        format(date, "dd MMM yyyy", {
          locale: id,
        }),
    );
  }, [date, pemantauan_khusus.data]);

  const handlePrevDate = () => {
    setDate((prev) => {
      const newDate = subDays(prev, 1);
      posthog.capture("informasi_perusahaan_date_changed", {
        date: format(newDate, "yyyy-MM-dd"),
        direction: "prev",
      });
      return newDate;
    });
  };

  const handleNextDate = () => {
    setDate((prev) => {
      const newDate = addDays(prev, 1);
      posthog.capture("informasi_perusahaan_date_changed", {
        date: format(newDate, "yyyy-MM-dd"),
        direction: "next",
      });
      return newDate;
    });
  };

  const handleOpenCalendar = () => {
    const input = inputRef.current;

    if (!(input instanceof HTMLInputElement)) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.click();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = new Date(e.target.value);

    if (isNaN(selected.getTime())) return;

    posthog.capture("informasi_perusahaan_date_changed", {
      date: e.target.value,
      direction: "calendar",
    });

    setDate(selected);
  };

  const isEmptyPemantauan =
    !filter_pemantauan_khusus || filter_pemantauan_khusus.length === 0;

  const isEmptyCalendar = !filter_calendar || filter_calendar.length === 0;

  const isAllEmpty = isEmptyPemantauan && isEmptyCalendar;

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
              name: "Informasi Perusahaan",
              link: "/informasi-perusahaan",
              active: true,
            },
          ]}
        />

        <p className="text-2xl font-bold mb-4 mt-6 text-[#2A2826]">
          Informasi Perusahaan
        </p>
        <div className="flex items-center gap-2 mb-6">
          {/* HIDDEN INPUT */}
          <input
            ref={inputRef}
            type="date"
            value={format(date, "yyyy-MM-dd")}
            max={format(new Date(), "yyyy-MM-dd")}
            onChange={handleDateChange}
            className="absolute opacity-0 pointer-events-none"
          />

          {/* CALENDAR BUTTON */}
          <Button
            variant="outline"
            onClick={handleOpenCalendar}
            className="border rounded-md h-9 w-9 flex items-center justify-center"
          >
            <Calendar size={18} />
          </Button>

          <Button variant="outline" size="icon-sm" onClick={handlePrevDate}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={handleNextDate}>
            <ChevronRight />
          </Button>
          <p className="text-xl font-bold text-[#2A2826] ml-2">
            {format(date, "dd MMM yyyy", { locale: id })}
          </p>
        </div>

        <Tabs
          defaultValue="semua"
          className="w-full"
          onValueChange={(tab) => {
            posthog.capture("informasi_perusahaan_tab_viewed", {
              tab,
              date: format(date, "yyyy-MM-dd"),
              total_items:
                filter_calendar.length + filter_pemantauan_khusus.length,
            });
          }}
        >
          <div className="flex items-center overflow-x-auto overflow-y-hidden">
            <TabsList variant="line">
              <TabsTrigger value="semua">
                Semua (
                {filter_calendar.length + filter_pemantauan_khusus.length})
              </TabsTrigger>
              <TabsTrigger value="aksi_korporat">
                Aksi Korporat ({filter_calendar.length})
              </TabsTrigger>
              <TabsTrigger value="notasi_khusus">
                Notasi Khusus ({filter_pemantauan_khusus.length})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="semua" className="pt-4 grid md:grid-cols-2 gap-4">
            {isAllEmpty ? (
              <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
                Tidak ada data informasi perusahaan
              </div>
            ) : (
              <>
                {filter_pemantauan_khusus?.map((item, key) => (
                  <Notation_card
                    key={key}
                    ticker={item.ticker}
                    variant={String(
                      item.notation
                        ?.slice()
                        ?.map((item) => item.code)
                        .join(","),
                    )}
                    desc={String(
                      item.notation
                        ?.map((item) => `${item.code} : ${item.description}\n`)
                        .join(""),
                    )}
                    company_name={item.company_name}
                  />
                ))}

                {filter_calendar?.map((item: CalendarResponse, key) => (
                  <Calendar_card
                    key={key}
                    ticker={item.ticker}
                    variant={item.perihal}
                    desc={item.lokasi}
                  />
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent
            value="aksi_korporat"
            className="pt-4 grid md:grid-cols-2 gap-4"
          >
            {isEmptyCalendar ? (
              <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
                Tidak ada data aksi korporasi
              </div>
            ) : (
              filter_calendar?.map((item: CalendarResponse, key) => (
                <Calendar_card
                  key={key}
                  ticker={item.ticker}
                  variant={item.perihal}
                  desc={item.lokasi}
                />
              ))
            )}
          </TabsContent>

          <TabsContent
            value="notasi_khusus"
            className="pt-4 grid md:grid-cols-2 gap-4"
          >
            {isEmptyPemantauan ? (
              <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
                Tidak ada data notasi khusus
              </div>
            ) : (
              filter_pemantauan_khusus?.map((item, key) => (
                <Notation_card
                  key={key}
                  ticker={item.ticker}
                  variant={String(
                    item.notation
                      ?.slice()
                      ?.map((item) => item.code)
                      .join(","),
                  )}
                  desc={String(
                    item.notation
                      ?.map((item) => `${item.code} : ${item.description}\n`)
                      .join(""),
                  )}
                  company_name={item.company_name}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function getCategoryBadge(type: "NOTASI_KHUSUS" | "AKSI_KORPORAT"): {
  label: string;
  className: string;
} {
  const map = {
    NOTASI_KHUSUS: {
      label: "Notasi Khusus",
      className: "bg-red-100 text-red-700 border-red-200",
    },

    AKSI_KORPORAT: {
      label: "Aksi Korporat",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
  };

  return map[type];
}

export function CategoryBadge({
  type,
}: {
  type: "NOTASI_KHUSUS" | "AKSI_KORPORAT";
}) {
  const badge = getCategoryBadge(type);

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2
        py-0.5
        rounded-full
        text-[11px]
        font-semibold
        border
        ${badge.className}
      `}
    >
      {badge.label}
    </span>
  );
}

export function Calendar_card(props: {
  ticker: string;
  variant: string;
  desc: string;
  simplify?: boolean;
  date?: string;
}) {
  const { ticker, variant, desc, simplify, date } = props;
  const _company: StockListResponse[] = (
    company as { data: StockListResponse[] }
  ).data;
  const selectedCompany = _company.find((item) => item.ticker === ticker);

  return (
    <Card>
      <CardContent className="text-sm flex  gap-3">
        <Link href={`/profil-perusahaan/${ticker}`} className="hidden md:block">
          <CompanyLogo
            company={{
              ticker: ticker,
            }}
          />
        </Link>

        <div className="space-y-0.5 w-full">
          <Link
            href={`/profil-perusahaan/${ticker}`}
            className={cn(simplify ? "hidden" : "block md:hidden mb-5")}
          >
            <CompanyLogo
              company={{
                ticker: ticker,
              }}
            />
          </Link>

          <div className="flex justify-between items-center">
            {!simplify && (
              <Link
                className="text-[19px] font-semibold text-foreground"
                href={`/profil-perusahaan/${ticker}`}
              >
                {ticker}
              </Link>
            )}

            <CategoryBadge type="AKSI_KORPORAT" />
          </div>

          {!simplify && (
            <p className="text-muted-foreground mb-4">
              {selectedCompany?.company_name}
            </p>
          )}

          {date && (
            <div className="mb-1 mt-4 md:mt-2">
              <span className="font-medium">Tanggal:</span> <br />
              <span className="text-neutral-600">{date}</span>
            </div>
          )}

          <div className="mb-1">
            <span className="font-medium">Perihal:</span> <br />
            <span className="text-neutral-600">{variant}</span>
          </div>

          {desc && (
            <div>
              <span className="font-semibold">Keterangan:</span>
              <br />
              <div>
                <span
                  className="text-neutral-600"
                  dangerouslySetInnerHTML={{
                    __html: desc.split("\n").join("<br />"),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function Notation_card(props: {
  ticker: string;
  variant: string;
  desc: string;
  simplify?: boolean;
  date?: string;
  company_name?: string;
}) {
  const { ticker, variant, desc, simplify, date, company_name } = props;

  return (
    <Card>
      <CardContent className="text-sm flex gap-3">
        <Link href={`/profil-perusahaan/${ticker}`} className="hidden md:block">
          <CompanyLogo
            company={{
              ticker: ticker ?? "",
            }}
          />
        </Link>

        <div className="space-y-0.5 w-full">
          <Link
            href={`/profil-perusahaan/${ticker}`}
            className={cn(simplify ? "hidden" : "block md:hidden mb-5")}
          >
            <CompanyLogo
              company={{
                ticker: ticker ?? "",
              }}
            />
          </Link>

          {!simplify && (
            <div className="flex justify-between items-center">
              <Link
                className="text-[19px] font-semibold text-foreground"
                href={`/profil-perusahaan/${ticker}`}
              >
                {ticker}
              </Link>
              <CategoryBadge type="NOTASI_KHUSUS" />
            </div>
          )}

          {!simplify && (
            <p className="text-muted-foreground mb-4">{company_name}</p>
          )}

          {date && (
            <div className="flex justify-between">
              <div className={cn(simplify ? "" : "mt-4")}>
                <span className="font-medium">Tanggal:</span>{" "}
                <span className="text-neutral-600">{date}</span>
              </div>

              {simplify && <CategoryBadge type="NOTASI_KHUSUS" />}
            </div>
          )}

          <div>
            <span className="font-medium">Notasi:</span>{" "}
            <span className="text-neutral-600">{variant}</span>
          </div>

          {desc && (
            <div>
              <span className="font-semibold">Keterangan:</span>
              <br />
              <div className="md:pl-2 mt-1">
                <span
                  className="text-neutral-600"
                  dangerouslySetInnerHTML={{
                    __html: desc.split("\n").join("<br />"),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Informasi_perusahaan_view;
