/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyLogo from "@/components/companyLogo";
import { StockDetail } from "@/types/stocks";
import { useMemo, useRef, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { id } from "date-fns/locale";

import company from "@/data/company.json";
import notation from "@/data/information/notations/notation.json";
import pemantauan_khusus from "@/data/information/pemantauan_khusus/pemantauan_khusus.json";
import calendar from "@/data/information/calendar/calendar.json";

function Informasi_perusahaan_view() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [date, setDate] = useState(new Date());

  const filter_calendar = useMemo(() => {
    return calendar.data.filter(
      (item) =>
        item.tanggal ===
        format(date, "dd MMM yyyy", {
          locale: id,
        })
    );
  }, [date, calendar.data]);

  const filter_pemantauan_khusus = useMemo(() => {
    return pemantauan_khusus.data
      .filter(
        (item) =>
          item.Tanggal_Masuk ===
          format(date, "dd MMM yyyy", {
            locale: id,
          })
      )
      .map((item) => ({
        ...item,
        notasi: notation?.data?.find((_item) => _item.Kode === item.Kode_Saham),
      }));
  }, [date, pemantauan_khusus.data]);

  const handlePrevDate = () => {
    setDate((prev) => subDays(prev, 1));
  };

  const handleNextDate = () => {
    setDate((prev) => addDays(prev, 1));
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

    setDate(selected);
  };

  const isEmptyPemantauan =
    !filter_pemantauan_khusus || filter_pemantauan_khusus.length === 0;

  const isEmptyCalendar = !filter_calendar || filter_calendar.length === 0;

  const isAllEmpty = isEmptyPemantauan && isEmptyCalendar;

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-7xl mx-auto relative">
        <p className="text-2xl font-bold mb-4 text-[#2A2826]">
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

        <Tabs defaultValue="semua" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="semua">
              Semua ({filter_calendar.length + filter_pemantauan_khusus.length})
            </TabsTrigger>
            <TabsTrigger value="aksi_korporat">
              Aksi Korporat ({filter_calendar.length})
            </TabsTrigger>
            <TabsTrigger value="notasi_khusus">
              Notasi Khusus ({filter_pemantauan_khusus.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="semua" className="pt-4 grid md:grid-cols-2 gap-4">
            {isAllEmpty ? (
              <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
                Tidak ada data informasi perusahaan
              </div>
            ) : (
              <>
                {filter_pemantauan_khusus.map((item, key) => (
                  <Notation_card
                    key={key}
                    ticker={item.Kode_Saham}
                    variant={String(item.notasi?.Notasi)}
                    desc={String(item.notasi?.Keterangan_Notasi)}
                  />
                ))}

                {filter_calendar?.map((item, key) => (
                  <Calendar_card
                    key={key}
                    ticker={item.kode}
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
              filter_calendar.map((item, key) => (
                <Calendar_card
                  key={key}
                  ticker={item.kode}
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
              filter_pemantauan_khusus.map((item, key) => (
                <Notation_card
                  key={key}
                  ticker={item.Kode_Saham}
                  variant={String(item.notasi?.Notasi)}
                  desc={String(item.notasi?.Keterangan_Notasi)}
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

function Calendar_card(props: {
  ticker: string;
  variant: string;
  desc: string;
}) {
  const { ticker, variant, desc } = props;
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const selectedCompany = _company.find((item) => item.ticker === ticker);

  return (
    <Card>
      <CardContent className="text-sm flex  gap-3">
        <a href={`/profil-perusahaan/${ticker}`} target="_blank" className="hidden md:block">
          <CompanyLogo
            company={{
              logo: selectedCompany?.logo ?? "",
            }}
          />
        </a>

        <div className="space-y-0.5 w-full">
          <a href={`/profil-perusahaan/${ticker}`} target="_blank" className="block md:hidden mb-5">
            <CompanyLogo
              company={{
                logo: selectedCompany?.logo ?? "",
              }}
            />
          </a>

          <div className="flex justify-between items-center">
            <a
              className="text-[19px] font-semibold text-foreground"
              href={`/profil-perusahaan/${ticker}`}
              target="_blank"
            >
              {ticker}
            </a>

            <CategoryBadge type="AKSI_KORPORAT" />
          </div>

          <p className="text-muted-foreground mb-4">{selectedCompany?.name}</p>

          <div className="mb-1">
            <span className="font-medium">Perihal:</span> <br />
            <span className="text-neutral-600">{variant}</span>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
}

function Notation_card(props: {
  ticker: string;
  variant: string;
  desc: string;
}) {
  const { ticker, variant, desc } = props;
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;
  const selectedCompany = _company.find((item) => item.ticker === ticker);

  return (
    <Card>
      <CardContent className="text-sm flex gap-3">
        <a
          href={`/profil-perusahaan/${ticker}`}
          target="_blank"
          className="hidden md:block"
        >
          <CompanyLogo
            company={{
              logo: selectedCompany?.logo ?? "",
            }}
          />
        </a>

        <div className="space-y-0.5 w-full">
          <a
            href={`/profil-perusahaan/${ticker}`}
            target="_blank"
            className="block md:hidden mb-5"
          >
            <CompanyLogo
              company={{
                logo: selectedCompany?.logo ?? "",
              }}
            />
          </a>

          <div className="flex justify-between items-center">
            <a
              className="text-[19px] font-semibold text-foreground"
              href={`/profil-perusahaan/${ticker}`}
              target="_blank"
            >
              {ticker}
            </a>

            <CategoryBadge type="NOTASI_KHUSUS" />
          </div>

          <p className="text-muted-foreground mb-4">{selectedCompany?.name}</p>

          <div>
            <span className="font-medium">Notasi:</span>{" "}
            <span className="text-neutral-600">{variant}</span>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
}

export default Informasi_perusahaan_view;
