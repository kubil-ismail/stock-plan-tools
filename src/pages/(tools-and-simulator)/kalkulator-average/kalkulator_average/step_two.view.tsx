"use client";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Sparkles,
} from "lucide-react";

import { ResultData } from "../kalkulator_avarage.view";
import { InfoButton } from "@/components/tooltip";
import { useEffect } from "react";

interface Props {
  result: ResultData;
  handlePrevStep: () => void;
}

function Step_two_view(props: Props) {
  const { result, handlePrevStep } = props;

  const isAverageDown = (result?.percentChange ?? 0) < 0;
  const averageDiff = Math.abs((result?.oldAvg ?? 0) - (result?.newAvg ?? 0));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* BACKGROUND GLOW */}
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-5 md:p-6">
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[12px] font-medium text-orange-600">
                <Sparkles size={14} />
                Hasil Simulasi
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-neutral-900">
                {result?.stockCode}
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Average setelah pembelian tambahan
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold border whitespace-nowrap ${
                isAverageDown
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {isAverageDown ? "Average Down" : "Average Up"}
            </div>
          </div>

          {/* ================= HERO ================= */}
          <div className="mt-8 rounded-[28px] border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5">
            {/* BEFORE AFTER */}
            <div className="flex items-end justify-between gap-4">
              {/* BEFORE */}
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                  Sebelum
                </p>

                <p className="mt-2 text-xl font-bold text-neutral-400 line-through">
                  {formatRupiah(result?.oldAvg ?? 0)}
                </p>

                <p className="mt-1 text-xs text-neutral-400">Average lama</p>
              </div>

              {/* ARROW */}
              <div className="pb-2">
                <div className="rounded-full border border-neutral-200 bg-white p-2 shadow-sm">
                  <ArrowRight size={16} className="text-neutral-400" />
                </div>
              </div>

              {/* AFTER */}
              <div className="flex-1 text-right">
                <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                  Sesudah
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-orange-500">
                  {formatRupiah(result?.newAvg ?? 0)}
                </p>

                <p className="mt-1 text-xs text-neutral-400">Average baru</p>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mt-5 border-t border-orange-100 pt-5">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    isAverageDown
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isAverageDown ? (
                    <ArrowDown size={16} />
                  ) : (
                    <ArrowUp size={16} />
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className={`inline-flex flex-wrap items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                      isAverageDown
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span>
                      {Math.abs(result?.percentChange || 0)}%
                      {isAverageDown ? " lebih rendah" : " lebih tinggi"}
                    </span>

                    <span className="opacity-50">•</span>

                    <span>Selisih {formatRupiah(averageDiff)}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {isAverageDown ? (
                      <>
                        Kamu membeli saham{" "}
                        <span className="font-bold text-neutral-900">
                          {result?.stockCode}
                        </span>{" "}
                        di harga lebih murah sehingga average modal turun
                        menjadi{" "}
                        <span className="font-bold text-orange-500">
                          {formatRupiah(result?.newAvg ?? 0)}
                        </span>
                        .
                      </>
                    ) : (
                      <>
                        Harga beli baru lebih tinggi dari average sebelumnya,
                        sehingga average modal naik menjadi{" "}
                        <span className="font-bold text-orange-500">
                          {formatRupiah(result?.newAvg ?? 0)}
                        </span>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= DETAIL ================= */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-neutral-500">Harga Beli</p>

                <InfoButton text="Harga saham yang kamu gunakan untuk pembelian tambahan." />
              </div>

              <p className="mt-2 text-xl font-bold text-neutral-900">
                {formatRupiah(result?.buyPrice ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-neutral-500">Jumlah Lot</p>

                <InfoButton text="Jumlah lot yang dibeli pada simulasi ini." />
              </div>

              <p className="mt-2 text-xl font-bold text-neutral-900">
                {formatRupiah(result?.buyLot ?? 0, {
                  prefix: false,
                })}{" "}
                Lot
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {formatRupiah((result?.buyLot ?? 0) * 100, {
                  prefix: false,
                })}{" "}
                saham
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-neutral-500">
                  Total Lot Setelah Pembelian
                </p>

                <InfoButton text="Total seluruh lot yang kamu miliki setelah pembelian tambahan." />
              </div>

              <p className="mt-2 text-xl font-bold text-neutral-900">
                {formatRupiah(result?.totalLot ?? 0, {
                  prefix: false,
                })}{" "}
                Lot
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {formatRupiah(result?.totalShare ?? 0, {
                  prefix: false,
                })}{" "}
                saham
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-neutral-500">Harga BEP</p>

                <InfoButton text="Harga minimal agar posisi kamu impas setelah biaya broker." />
              </div>

              <p className="mt-2 text-xl font-bold text-neutral-900">
                {formatRupiah(result?.bep ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-neutral-500">Biaya Broker</p>

                <InfoButton text="Estimasi biaya transaksi berdasarkan fee broker yang dipilih." />
              </div>

              <p className="mt-2 text-xl font-bold text-neutral-900">
                {formatRupiah(result?.brokerFee ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-1.5">
                <p className="text-xs  text-neutral-500">
                  Estimasi Dana Pembelian
                </p>

                <InfoButton text="Perkiraan total dana yang perlu disiapkan untuk pembelian ini." />
              </div>

              <p className="mt-2 text-xl font-black text-neutral-900">
                {formatRupiah(result?.buyCost ?? 0)}
              </p>
            </div>
          </div>

          {/* ================= TOTAL ================= */}
          <div className="mt-8 rounded-[28px] border border-orange-100 bg-orange-50/60 p-5">
            <p className="text-sm font-medium text-neutral-500">
              Total Modal Net
            </p>

            <p className="mt-2 text-3xl font-black tracking-tight text-orange-500">
              {formatRupiah(result?.totalNet ?? 0)}
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Total modal setelah ditambah pembelian baru dan biaya broker.
            </p>
          </div>

          {/* DISCLAIMER */}
          <p className="mt-6 text-center text-[11px] leading-relaxed text-neutral-400">
            Simulasi ini bukan rekomendasi investasi. Pastikan tetap melakukan
            riset sebelum membeli saham.
          </p>

          {/* ACTION */}
          <div className="mt-6 flex items-center justify-center">
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-6"
              onClick={() => handlePrevStep()}
            >
              <ArrowLeft size={18} />
              Kembali Edit Simulasi
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step_two_view;
