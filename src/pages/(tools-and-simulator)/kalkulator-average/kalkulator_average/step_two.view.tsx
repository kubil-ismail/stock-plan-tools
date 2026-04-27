import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { ResultData } from "../kalkulator_avarage.view";

interface Props {
  result: ResultData;
  handlePrevStep: () => void;
}

function Step_two_view(props: Props) {
  const { result, handlePrevStep } = props;

  return (
    <>
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl relative overflow-hidden">
        {/* subtle glass glow */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 blur-3xl opacity-20 rounded-full pointer-events-none"
          style={{
            background: "#F97316",
          }}
        />

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-neutral-500">Average Baru Saya di</p>

            <h2 className="text-2xl font-bold text-neutral-900 tracking-wide underline underline-[#F97316">
              {result?.stockCode}
            </h2>
          </div>

          <div
            className="px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              borderColor: "rgba(249,115,22,0.25)",
              background: "rgba(249,115,22,0.08)",
              color: "#F97316",
            }}
          >
            Average Down
          </div>
        </div>

        {/* HERO */}
        <div className="mt-8">
          <p className="text-5xl font-bold text-neutral-900 tracking-tight">
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
            )}{" "}
            {Math.abs(result?.percentChange || 0)}% dari Rp{" "}
            {result?.oldAvg?.toLocaleString("id-ID")}
          </div>
        </div>

        {/* GLASS PANEL DETAIL */}
        <div
          className="mt-8 rounded-2xl p-5 border backdrop-blur-sm"
          style={{
            background: "rgba(249,115,22,0.04)",
            borderColor: "rgba(249,115,22,0.12)",
          }}
        >
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-xs text-neutral-500">Harga Beli</p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.buyPrice ?? 0)}
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-500">Lot Beli</p>

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
                  Lembar)
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Total Lot Setelah pembelian
              </p>

              <div className="flex md:items-center gap-x-1 flex-col md:flex-row">
                <p className="text-lg font-semibold text-neutral-900">
                  {formatRupiah(result?.totalLot ?? 0, {
                    prefix: false,
                  })}{" "}
                  Lot
                </p>

                <p className="text-xs text-neutral-400">
                  ({" "}
                  {formatRupiah(result?.totalShare ?? 0, {
                    prefix: false,
                  })}{" "}
                  Lembar)
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-500">BEP</p>

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
              <p className="text-xs text-neutral-500">Dana Dibutuhkan</p>

              <p className="text-lg font-semibold text-neutral-900">
                {formatRupiah(result?.buyCost)}
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="my-6 border-t border-neutral-200" />

          {/* TOTAL */}
          <div className="">
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
      </div>

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
    </>
  );
}

export default Step_two_view;
