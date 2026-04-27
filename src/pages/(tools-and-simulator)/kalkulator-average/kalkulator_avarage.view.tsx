"use client";
import { Broker } from "@/types/brokers";
import { StockList } from "@/types/stocks";
import { useState, useEffect } from "react";
import { FormValues } from "./kalkulator_average/step_one.view";
import Step_one_view from "./kalkulator_average/step_one.view";
import Step_two_view from "./kalkulator_average/step_two.view";

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
          <Step_two_view
            result={result!}
            handlePrevStep={() => handlePrevStep("step-1")}
          />
        )}
      </div>
    </div>
  );
}

export default Kalkulator_avarage_view;
