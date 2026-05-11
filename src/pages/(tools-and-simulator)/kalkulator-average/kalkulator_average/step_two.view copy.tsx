import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

import { ResultData } from "../kalkulator_avarage.view";

interface Props {
  result: ResultData;
  handlePrevStep: () => void;
}

function Step_two_view(props: Props) {
  const { result, handlePrevStep } = props;

  const isAverageDown = (result?.percentChange ?? 0) < 0;

  const avgDifference = (result?.oldAvg ?? 0) - (result?.newAvg ?? 0);

  return (
    <>
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E5E7EB] shadow-xl relative overflow-hidden">
        {/* glow */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 blur-3xl opacity-20 rounded-full pointer-events-none"
          style={{
            background: "#F97316",
          }}
        />

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">Average modal baru untuk</p>

            <h2 className="text-2xl font-bold text-neutral-900 tracking-wide">
              {result?.stockCode}
            </h2>
          </div>

          <div
            className="px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap"
            style={{
              borderColor: isAverageDown
                ? "rgba(34,197,94,0.25)"
                : "rgba(239,68,68,0.25)",
              background: isAverageDown
                ? "rgba(34,197,94,0.08)"
                : "rgba(239,68,68,0.08)",
              color: isAverageDown ? "#16A34A" : "#DC2626",
            }}
          >
            {isAverageDown ? "Average Down" : "Average Up"}
          </div>
        </div>

        {/* HERO */}
        <div className="mt-8">
          <p className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            {formatRupiah(result?.newAvg)}
          </p>

          <div
            className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(249,115,22,0.08)",
              color: "#F97316",
            }}
          >
            {(result?.percentChange ?? 0) > 0 ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            {Math.abs(result?.percentChange || 0)}% dari{" "}
            {formatRupiah(result?.oldAvg ?? 0)}
          </div>

          {/* AVG COMPARISON */}
          <div className="flex items-center gap-4 mt-6">
            <div>
              <p className="text-xs text-neutral-400">Average Lama</p>

              <p className="text-lg font-semibold text-neutral-400 line-through">
                {formatRupiah(result?.oldAvg ?? 0)}
              </p>
            </div>

            <ArrowRight size={18} className="text-neutral-300" />

            <div>
              <p className="text-xs text-neutral-400">Average Baru</p>

              <p className="text-2xl font-bold text-[#F97316]">
                {formatRupiah(result?.newAvg ?? 0)}
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <p className="text-[13px] leading-relaxed text-neutral-600 mt-6">
            {isAverageDown ? (
              <>
                Pembelian tambahan saham{" "}
                <span className="font-semibold text-neutral-900">
                  {result?.stockCode}
                </span>{" "}
                membantu menurunkan rata-rata modal kamu menjadi{" "}
                <span className="font-semibold text-[#F97316]">
                  {formatRupiah(result?.newAvg ?? 0)}
                </span>
                .
              </>
            ) : (
              <>
                Harga beli baru lebih tinggi dari rata-rata modal sebelumnya,
                sehingga average modal kamu naik menjadi{" "}
                <span className="font-semibold text-[#F97316]">
                  {formatRupiah(result?.newAvg ?? 0)}
                </span>
                .
              </>
            )}
          </p>

          {/* SAVING HIGHLIGHT */}
          {avgDifference > 0 && (
            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
              <p className="text-sm text-green-700 leading-relaxed">
                Average modal kamu turun sebesar{" "}
                <span className="font-bold">{formatRupiah(avgDifference)}</span>{" "}
                per saham setelah pembelian tambahan.
              </p>
            </div>
          )}
        </div>

        {/* DETAIL PANEL */}
        <div
          className="mt-8 rounded-2xl p-5 border backdrop-blur-sm"
          style={{
            background: "rgba(249,115,22,0.04)",
            borderColor: "rgba(249,115,22,0.12)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-xs text-neutral-500">Harga Beli</p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.buyPrice ?? 0)}
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-500">Jumlah Lot</p>

              <div className="flex md:items-center gap-x-1 flex-col md:flex-row">
                <p className="text-lg font-semibold text-neutral-900">
                  {formatRupiah(result?.buyLot ?? 0, {
                    prefix: false,
                  })}{" "}
                  Lot
                </p>

                <p className="text-xs text-neutral-400">
                  (
                  {formatRupiah((result?.buyLot ?? 0) * 100, {
                    prefix: false,
                  })}{" "}
                  Saham)
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Total Lot Setelah Pembelian
              </p>

              <div className="flex md:items-center gap-x-1 flex-col md:flex-row">
                <p className="text-lg font-semibold text-neutral-900">
                  {formatRupiah(result?.totalLot ?? 0, {
                    prefix: false,
                  })}{" "}
                  Lot
                </p>

                <p className="text-xs text-neutral-400">
                  (
                  {formatRupiah(result?.totalShare ?? 0, {
                    prefix: false,
                  })}{" "}
                  Saham)
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-500">Harga BEP</p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.bep)}
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-500">Biaya Broker</p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.brokerFee)}
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Estimasi Dana Pembelian
              </p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.buyCost)}
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="my-6 border-t border-neutral-200" />

          {/* TOTAL */}
          <div>
            <p className="text-sm text-neutral-600">Total Modal Net</p>

            <p
              className="text-2xl font-bold"
              style={{
                color: "#F97316",
              }}
            >
              {formatRupiah(result?.totalNet)}
            </p>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-[11px] text-neutral-400 text-center mt-6 leading-relaxed">
          Simulasi ini bukan rekomendasi investasi. Pastikan tetap melakukan
          riset sebelum membeli saham.
        </p>

        {/* ACTION */}
        <div className="flex items-center justify-center mt-5">
          <Button
            size="lg"
            className="rounded-lg"
            variant="link"
            onClick={() => handlePrevStep()}
          >
            <ArrowLeft />
            Sebelumnya
          </Button>
        </div>
      </div>
    </>
  );
}

export default Step_two_view;
