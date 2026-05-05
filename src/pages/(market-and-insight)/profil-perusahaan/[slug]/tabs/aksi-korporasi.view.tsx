"use client";
import React, { useMemo } from "react";

import notation from "@/data/information/notations/notation.json";
import pemantauan_khusus from "@/data/information/pemantauan_khusus/pemantauan_khusus.json";
import calendar from "@/data/information/calendar/calendar.json";
import { Calendar_card, Notation_card } from "@/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view";

interface Props {
  slug: string;
}

function Aksi_korporasi_view(props: Props) {
  const { slug } = props;

  const filter_calendar = useMemo(() => {
    return calendar.data.filter((item) => item.kode === slug);
  }, [slug, calendar.data]);

  const filter_pemantauan_khusus = useMemo(() => {
    return pemantauan_khusus.data
      .filter((item) => item.Kode_Saham === slug)
      .map((item) => ({
        ...item,
        notasi: notation?.data?.find((_item) => _item.Kode === item.Kode_Saham),
      }));
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
    </>
  );
}

export default Aksi_korporasi_view;
