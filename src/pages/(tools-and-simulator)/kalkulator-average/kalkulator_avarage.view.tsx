"use client";
import { Autocomplete, BrokerOption } from "@/components/autocomplete";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BanknoteArrowDown,
  BanknoteArrowUp,
  PiggyBank,
  Scale,
  Zap,
} from "lucide-react";

import { useState, useRef, Fragment, useMemo } from "react";
import {
  cn,
  formatRupiah,
  getAvgChangePercent,
  getRecommendedTargetAvg,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RupiahInput } from "@/components/numberinput";

import { brokers } from "@/data/brokers";
import companyList from "@/data/company.json";

type SimulationType = "BUY" | "LOWER";
type StrategyType = "EFFICIENT" | "BALANCE" | "AGGRESSIVE";

const simulation = {
  BUY: {
    title: "Beli Saham Baru",
  },
  LOWER: {
    title: "Turunkan Average",
  },
};

const strategyOptions = [
  {
    key: "EFFICIENT",
    title: "Efficient",
    description: "Modal paling hemat, beli di harga lebih rendah.",
    icon: PiggyBank,
  },
  {
    key: "BALANCE",
    title: "Balance",
    description: "Strategi seimbang antara modal dan peluang tercapai.",
    icon: Scale,
  },
  {
    key: "AGGRESSIVE",
    title: "Aggressive",
    description: "Turunkan average lebih cepat dengan modal lebih besar.",
    icon: Zap,
  },
] as const;

type StockOption = {
  code: string;
  name: string;
};

type ResultData = {
  stockCode: string;

  newAvg: number;
  oldAvg: number;
  percentChange: number;

  totalLot: number;
  totalShare: number;
  totalCost: number;

  buyCost: number;
  brokerFee: number;
  totalNet: number;

  bep: number;

  requiredLot?: number;
  buyPrice?: number;
};

function Kalkulator_avarage_view() {
  const simulationRef = useRef<HTMLDivElement | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<BrokerOption | null>(
    null
  );
  const [simulationType, setSimulationType] = useState<SimulationType | null>(
    "BUY"
  );
  const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [totalLot, setTotalLot] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [buyPrice, setBuyPrice] = useState<number | null>(null);
  const [buyLot, setBuyLot] = useState<number | null>(null);
  const [buyTarget, setBuyTarget] = useState<number | null>(null);

  const [selectedStrategy, setSelectedStrategy] =
    useState<StrategyType>("BALANCE");

  const [currentStep, setCurrentStep] = useState<"step-1" | "step-2">("step-1");
  const [result, setResult] = useState<ResultData | null>(null);

  const handleResetSimulation = () => {
    setBuyPrice(null);
    setBuyLot(null);
    setBuyTarget(null);
    setSelectedStrategy("BALANCE");
  };

  const scrollToSimulation = () => {
    setTimeout(() => {
      simulationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleStrategy = (strategy: StrategyType) => {
    setSelectedStrategy(strategy);

    if (avgPrice && currentPrice) {
      const recommended = getRecommendedTargetAvg({
        currentAvg: avgPrice,
        lastPrice: currentPrice,
        strategy: strategy,
      });

      if (recommended) {
        setBuyTarget(recommended);
      }
    }
  };

  const handleProcessData = () => {
    if (!selectedBroker) return;

    const BUY_FEE = selectedBroker.buyFee! / 100;
    const SELL_FEE = selectedBroker.sellFee! / 100;

    /*
  ======================
  BUY
  ======================
  */

    if (simulationType === "BUY") {
      if (!avgPrice || !totalLot || !buyPrice || !buyLot) return;

      const to2Decimal = (n: number) => Math.floor(n * 100) / 100; // sesuai preferensi lo: tidak dibulatkan ke atas

      const SHARES_PER_LOT = 100;

      const oldShare = totalLot * SHARES_PER_LOT;

      /**
       * IMPORTANT:
       * pakai totalAmount asli kalau ada
       * jangan reverse dari avgPrice
       */
      const oldCost = oldShare * avgPrice;

      const newShare = buyLot * SHARES_PER_LOT;

      /**
       * BUY COST
       */
      const buyCost = newShare * buyPrice;

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
      const percentChange = ((newAvg - avgPrice) / avgPrice) * 100;

      /**
       * BEP (kalau jual kena fee)
       */

      const bep = newAvg / (1 - SELL_FEE);

      setResult({
        stockCode: selectedStock?.code || "",

        newAvg: to2Decimal(newAvg),

        oldAvg: to2Decimal(avgPrice),

        percentChange: to2Decimal(percentChange),

        totalLot: totalShare / SHARES_PER_LOT,

        totalShare,

        buyCost: to2Decimal(buyCost),

        brokerFee: to2Decimal(brokerFee),

        totalNet: to2Decimal(totalBuyCost),

        totalCost: to2Decimal(totalCost),

        bep: bep,
      });

      setCurrentStep("step-2");
    }

    /*
  ======================
  LOWER
  ======================
  */

    if (simulationType === "LOWER") {
      if (
        !avgPrice ||
        !totalLot ||
        !buyTarget ||
        !selectedStrategy ||
        !currentPrice
      )
        return;
    }
  };

  const handlePrevStep = (prev: "step-1" | "step-2") => {
    setCurrentStep(prev);
  };

  const avgChangePercent = useMemo(() => {
    return getAvgChangePercent(avgPrice!, buyTarget!);
  }, [avgPrice, buyTarget]);

  return (
    <div className=" bg-gradient-to-br from-[#F8F9FA] via-[#FFF4ED] to-[#F8F9FA] flex items-center justify-center px-2 md:px-6 py-12">
      <div className="max-w-xl w-full">
        {currentStep === "step-1" && (
          <Fragment>
            <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl">
              {/* Main Card - STEP 1 */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                    1
                  </p>

                  <p className="font-bold text-neutral-600 text-[18px]">
                    Pilih Broker
                  </p>
                </div>

                <Autocomplete
                  label="Pilih Broker Anda"
                  options={brokers}
                  value={selectedBroker}
                  onChange={(e) => setSelectedBroker(e)}
                  placeholder="Pilih Broker Anda..."
                />

                {Boolean(selectedBroker) && (
                  <div className="mt-3 flex gap-2">
                    <span className="bg-neutral-100  text-neutral-600 flex items-center gap-1 px-2 p-1 font-[600] rounded-full text-[12px]">
                      <BanknoteArrowUp size={20} />
                      Fee Beli:{" "}
                      <span className="text-green-600">
                        {selectedBroker?.buyFee}%
                      </span>
                    </span>
                    <span className="bg-neutral-100  text-neutral-600 flex items-center gap-1 px-2 p-1 font-[600] rounded-full text-[12px]">
                      <BanknoteArrowDown size={20} />
                      Fee Jual:{" "}
                      <span className="text-red-600">
                        {selectedBroker?.sellFee}%
                      </span>
                    </span>
                  </div>
                )}
              </section>

              <div className="my-6">
                <Separator />
              </div>

              <section>
                <div className="flex items-center gap-2 mb-5">
                  <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                    2
                  </p>

                  <p className="font-bold text-neutral-600 text-[18px]">
                    Posisi saat ini
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <Autocomplete
                      label="Pilih Saham"
                      options={companyList.data}
                      value={selectedStock}
                      variant="stocks"
                      onChange={(e) => setSelectedStock(e)}
                      placeholder="Pilih saham anda..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block uppercase text-[12px]">
                      Harga Rata-Rata
                    </label>

                    <RupiahInput
                      placeholder="Masukan harga rata-rata"
                      value={avgPrice}
                      onChange={setAvgPrice}
                    />

                    <p className="text-[11px] text-neutral-400 mt-1">
                      Note: Masukan harga rata-rata saham anda saat ini
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block uppercase text-[12px]">
                      Total Lot Saat Ini
                    </label>

                    <RupiahInput
                      disablePrefix
                      placeholder="Masukan total lot saat ini"
                      value={totalLot}
                      onChange={setTotalLot}
                    />
                  </div>
                </div>
              </section>
              {/* 
              <div className="my-6">
                <Separator />
              </div> */}

              {/* HIDE FOR NOW */}
              <section className="hidden">
                <div className="flex items-center gap-2 mb-5">
                  <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                    3
                  </p>

                  <p className="font-bold text-neutral-600 text-[18px]">
                    Pilih Simulasi
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* OPTION 1 */}
                  <button
                    type="button"
                    onClick={() => {
                      setSimulationType("BUY");
                      handleResetSimulation();
                      scrollToSimulation();
                    }}
                    className={cn(
                      `group border rounded-2xl p-5 text-left transition-all cursor-pointer`,
                      simulationType === "BUY"
                        ? "border-[#F97316] bg-orange-50 shadow"
                        : "border-neutral-200 hover:border-[#F97316]"
                    )}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div
                        className={cn(
                          `p-3 rounded-xl transition`,
                          simulationType === "BUY"
                            ? "bg-[#F97316] text-white"
                            : "bg-neutral-100 text-neutral-600 group-hover:bg-orange-100"
                        )}
                      >
                        <BanknoteArrowUp size={26} />
                      </div>

                      <div>
                        <p className="font-bold text-[15px] text-neutral-800">
                          Beli Saham Baru
                        </p>

                        <p className="text-sm text-neutral-500 mt-1">
                          Hitung average baru setelah melakukan pembelian saham
                          tambahan.
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* OPTION 2 */}
                  <button
                    type="button"
                    onClick={() => {
                      setSimulationType("LOWER");
                      handleResetSimulation();
                      scrollToSimulation();
                    }}
                    className={cn(
                      `group border rounded-2xl p-5 text-left transition-all cursor-pointer`,
                      simulationType === "LOWER"
                        ? "border-[#F97316] bg-orange-50 shadow"
                        : "border-neutral-200 hover:border-[#F97316]"
                    )}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div
                        className={cn(
                          `p-3 rounded-xl transition`,
                          simulationType === "LOWER"
                            ? "bg-[#F97316] text-white"
                            : "bg-neutral-100 text-neutral-600 group-hover:bg-orange-100"
                        )}
                      >
                        <BanknoteArrowDown size={26} />
                      </div>

                      <div>
                        <p className="font-bold text-[15px] text-neutral-800">
                          Turunkan Average
                        </p>

                        <p className="text-sm text-neutral-500 mt-1">
                          Tentukan target average dan hitung berapa lot serta
                          biaya yang dibutuhkan.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </section>

              {Boolean(simulationType) && (
                <>
                  <div className="my-6">
                    <Separator />
                  </div>

                  <section ref={simulationRef}>
                    <div className="flex items-center gap-2 mb-5">
                      <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                        3
                      </p>

                      <p className="font-bold text-neutral-600 text-[18px]">
                        {simulation?.[simulationType!].title}
                      </p>
                    </div>

                    {simulationType === "BUY" && (
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2 md:col-span-1">
                          <label className="mb-2 block uppercase text-[12px]">
                            Harga Beli
                          </label>

                          <RupiahInput
                            placeholder="Masukan harga beli"
                            value={buyPrice}
                            onChange={setBuyPrice}
                          />

                          <p className="text-[11px] text-neutral-400 mt-1">
                            Note: Masukan harga saham yang akan anda beli
                          </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="mb-2 block uppercase text-[12px]">
                            Total Lot
                          </label>

                          <RupiahInput
                            disablePrefix
                            placeholder="Masukan total lot"
                            value={buyLot}
                            onChange={setBuyLot}
                          />
                        </div>
                      </div>
                    )}

                    {simulationType === "LOWER" && (
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                          <label className="mb-2 block uppercase text-[12px]">
                            Harga Market Saat Ini
                          </label>

                          <RupiahInput
                            value={currentPrice}
                            onChange={setCurrentPrice}
                            placeholder="Masukan harga market saat ini"
                          />

                          <p className="text-[11px] text-neutral-400 mt-1">
                            Note: Masukan harga market saat ini
                          </p>
                        </div>

                        <label className="block uppercase text-[12px]">
                          Strategi
                        </label>
                        <div className="col-span-2 grid grid-cols-3 gap-4 mb-2">
                          {strategyOptions.map((strategy) => {
                            const Icon = strategy.icon;
                            const isActive = selectedStrategy === strategy.key;

                            return (
                              <button
                                key={strategy.key}
                                type="button"
                                onClick={() => handleStrategy(strategy.key)}
                                className={cn(
                                  `group border rounded-2xl p-3 text-left transition-all cursor-pointer`,
                                  isActive
                                    ? "border-[#F97316] bg-orange-50 shadow"
                                    : "border-neutral-200 hover:border-[#F97316]"
                                )}
                              >
                                <div className="flex flex-col items-center gap-3">
                                  <div
                                    className={cn(
                                      `p-3 rounded-xl transition`,
                                      isActive
                                        ? "bg-[#F97316] text-white"
                                        : "bg-neutral-100 text-neutral-600 group-hover:bg-orange-100"
                                    )}
                                  >
                                    <Icon size={26} />
                                  </div>

                                  <div>
                                    <p className="font-bold text-[15px] text-center text-neutral-800">
                                      {strategy.title}
                                    </p>

                                    <p className="text-sm text-neutral-500 text-center mt-1">
                                      {strategy.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="col-span-2">
                          <label className="mb-2 block uppercase text-[12px]">
                            Target Penurunan Harga Rata-Rata
                          </label>

                          <RupiahInput
                            value={buyTarget}
                            onChange={setBuyTarget}
                            placeholder="Masukan target harga rata-rata"
                          />

                          {avgChangePercent !== null && (
                            <p
                              className={cn(
                                "text-[12px] mt-1 font-medium",
                                avgChangePercent < 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              )}
                            >
                              {avgChangePercent < 0
                                ? `Turun ${Math.abs(
                                    avgChangePercent
                                  )}% dari average saat ini`
                                : `Naik ${avgChangePercent}% dari average saat ini`}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      size="lg"
                      className="w-full font-bold mt-6"
                      onClick={() => handleProcessData()}
                    >
                      Hitung Simulasi
                    </Button>
                  </section>
                </>
              )}
            </div>
          </Fragment>
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
              {simulationType === "BUY" && (
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
              )}

              {simulationType === "LOWER" && (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Strategi Pembelian Optimal di
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
                    Recommended Buy Zone
                  </div>
                </div>
              )}

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
                  ↓ {Math.abs(result?.percentChange || 0)}% dari Rp{" "}
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
                {/* Simulation - BUY */}
                {simulationType === "BUY" && (
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <p className="text-xs text-neutral-500">Total Buy Lot</p>

                      <p className="text-lg font-semibold text-neutral-900">
                        {formatRupiah((result?.totalLot ?? 0) - (buyLot ?? 0), { prefix: false })} Lot
                      </p>

                      <p className="text-xs text-neutral-400">
                        {formatRupiah(result?.totalShare, { prefix: false })}{" "}
                        Lembar
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-500">
                        Dana Dibutuhkan
                      </p>

                      <p className="text-lg font-semibold text-neutral-900">
                        {formatRupiah(result?.buyCost)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-500">Biaya Broker</p>

                      <p className="text-lg font-semibold text-neutral-900">
                        {formatRupiah(result?.brokerFee)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-500">Harga BEP</p>

                      <p className="text-lg font-semibold text-neutral-900">
                        {formatRupiah(result?.bep)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Simulation - LOWER */}
                {simulationType === "LOWER" && (
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    {/* REQUIRED LOT */}

                    <div>
                      <p className="text-xs text-neutral-500">
                        Estimasi Lot Pembelian
                      </p>

                      <p className="text-lg font-semibold text-neutral-900">
                        9 - 10 Lot
                      </p>
                    </div>

                    {/* BUY PRICE */}

                    <div>
                      <p className="text-xs text-neutral-500">
                        Harga Beli Ideal
                      </p>

                      <p className="text-lg font-semibold text-neutral-900">
                        Rp 1.000 – 1.100
                      </p>
                    </div>

                    {/* BUY COST */}

                    <div>
                      <p className="text-xs text-neutral-500">
                        Dana Dibutuhkan
                      </p>

                      <p className="text-lg font-semibold text-neutral-900">
                        Rp 1.5 jt – 3.3 jt
                      </p>
                    </div>

                    {/* BROKER FEE */}

                    <div>
                      <p className="text-xs text-neutral-500">
                        Estimasi Biaya Broker
                      </p>

                      <p className="text-lg font-semibold text-neutral-900">
                        Rp 2000 - 3000
                      </p>
                    </div>
                  </div>
                )}

                {/* divider */}
                <div className="my-6 border-t border-neutral-200" />

                {/* TOTAL */}
                <div className="">
                  <p className="text-sm text-neutral-600">
                    {simulationType === "BUY"
                      ? "Total Modal Net"
                      : "Estimasi Total Modal"}
                  </p>

                  <p
                    className="text-2xl font-bold"
                    style={{
                      color: "#F97316",
                    }}
                  >
                    {simulationType === "BUY"
                      ? formatRupiah(result?.totalNet)
                      : "-"}
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
