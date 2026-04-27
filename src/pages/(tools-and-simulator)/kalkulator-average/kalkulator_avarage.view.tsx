"use client";
import { useState, Fragment, useEffect } from "react";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { FormValues } from "./kalkulator_average/step_one.view";
import Step_one_view from "./kalkulator_average/step_one.view";
import { Broker } from "@/types/brokers";
import { StockList } from "@/types/stocks";

export type ResultData = {
  stockCode: string;
  broker: Broker;
  stock: StockList;

  price: number;
  lot: number;
  newAvg: number;
  oldAvg: number;
  percentChange: number;

  totalLot: number;
  totalShare: number;
  totalCost: number;

  buyCost: number;
  buyLot: number;
  brokerFee: number;
  totalNet: number;

  bep: number;

  requiredLot?: number;
  buyPrice?: number;
};

function Kalkulator_avarage_view() {
  const [currentStep, setCurrentStep] = useState<"step-1" | "step-2">("step-1");
  const [result, setResult] = useState<ResultData | null>(null);

  const handleProcessData = (value: FormValues) => {
    if (!value) return;

    if (
      !value.broker ||
      !value.lot ||
      !value.price ||
      !value.buy_price ||
      !value.buy_lot
    )
      return;

    const BUY_FEE = value.broker.buyFee! / 100;
    const SELL_FEE = value.broker.sellFee! / 100;

    const to2Decimal = (n: number) => Math.floor(n * 100) / 100;

    const SHARES_PER_LOT = 100;

    const oldShare = value.lot * SHARES_PER_LOT;

    /**
     * IMPORTANT:
     * pakai totalAmount asli kalau ada
     * jangan reverse dari avgPrice
     */
    const oldCost = oldShare * value.price;

    const newShare = value.buy_lot * SHARES_PER_LOT;

    /**
     * BUY COST
     */
    const buyCost = newShare * value.buy_price;

    /**
     * FEE
     */
    const brokerFee = buyCost * BUY_FEE;

    /**
     * NET BUY
     */
    const totalBuyCost = buyCost + brokerFee;

    /**
     * TOTAL
     */
    const totalShare = oldShare + newShare;

    const totalCost = oldCost + totalBuyCost;

    /**
     * NEW AVG
     */
    const newAvg = totalCost / totalShare;

    /**
     * PERCENT CHANGE
     */
    const percentChange = ((newAvg - value.price) / value.price) * 100;

    /**
     * BEP (kalau jual kena fee)
     */

    const bep = newAvg / (1 - SELL_FEE);

    setResult({
      stockCode: value.stock?.code ?? "",
      stock: value.stock!,
      broker: value.broker!,

      price: value.price,
      lot: value.lot,
      newAvg: to2Decimal(newAvg),
      oldAvg: to2Decimal(value.price),

      percentChange: to2Decimal(percentChange),
      totalLot: totalShare / SHARES_PER_LOT,
      totalShare,

      buyPrice: value.buy_price,
      buyCost: to2Decimal(buyCost),
      buyLot: value.buy_lot,
      brokerFee: to2Decimal(brokerFee),

      totalNet: to2Decimal(totalBuyCost),
      totalCost: to2Decimal(totalCost),
      bep: bep,
    });

    setCurrentStep("step-2");
  };

  const handlePrevStep = (prev: "step-1" | "step-2") => {
    setCurrentStep(prev);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9] flex items-center justify-center">
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />

      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-xl w-full relative">
        {currentStep === "step-1" && (
          <Step_one_view
            defaultValue={result}
            handleProcessData={(value) => handleProcessData(value)}
          />
        )}

        {/* Main Card - STEP 2 */}
        {currentStep === "step-2" && (
          <Fragment>
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
                  <p className="text-sm text-neutral-500">
                    Average Baru Saya di
                  </p>

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
                onClick={() => handlePrevStep("step-1")}
              >
                <ArrowLeft />
                Sebelumnya
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default Kalkulator_avarage_view;
