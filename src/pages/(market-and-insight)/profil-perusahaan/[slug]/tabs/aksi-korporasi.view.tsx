/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useMemo } from "react";

import pemantauan_khusus from "@/data/information/special_board.json";
import calendar from "@/data/information/calendar.json";
import {
  Calendar_card,
  Notation_card,
} from "@/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view";

interface Props {
  slug: string;
}


interface CalendarResponse {
  tanggal: string;
  ticker: string;
  perihal: string;
  lokasi: string;
}

function Aksi_korporasi_view(props: Props) {
  const { slug } = props;

  const filter_calendar = useMemo(() => {
    return calendar.data.filter(
      (item: CalendarResponse) => item.ticker === slug,
    );
  }, [slug, calendar.data]);

  const filter_pemantauan_khusus = useMemo(() => {
    return pemantauan_khusus.data.filter((item) => item.ticker === slug);
  }, [slug, pemantauan_khusus.data]);

  const isEmptyPemantauan =
    !filter_pemantauan_khusus || filter_pemantauan_khusus.length === 0;

  const isEmptyCalendar = !filter_calendar || filter_calendar.length === 0;

  const isAllEmpty = isEmptyPemantauan && isEmptyCalendar;

  return (
    <>
      {isAllEmpty ? (
        <div className="col-span-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
          Tidak ada data informasi perusahaan
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filter_pemantauan_khusus.map((item, key) => (
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
              simplify
              date={item?.entry_date}
            />
          ))}

          {filter_calendar?.map((item: CalendarResponse, key) => (
            <Calendar_card
              key={key}
              ticker={item.ticker}
              variant={item.perihal}
              desc={item.lokasi}
              date={item?.tanggal}
              simplify
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Aksi_korporasi_view;
