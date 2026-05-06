/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlassCard } from "@/components/glassCard";
import { StockDetail } from "@/types/stocks";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import technical_summary from "@/data/technical_summary.json";
import { StockTechnical } from "@/types/stocks";

interface Props {
  selectedCompany: StockDetail;
}

const metricDescriptions: Record<string, string> = {
  Index: "Indeks tempat saham ini terdaftar (misalnya IDX30, LQ45).",
  PER: "Price to Earnings Ratio: harga saham dibanding laba per saham.",
  PBV: "Price to Book Value: harga saham dibanding nilai buku perusahaan.",
  "ROE %": "Return on Equity: kemampuan menghasilkan laba dari modal sendiri.",
  "ROA %":
    "Return on Assets: efisiensi penggunaan aset untuk menghasilkan laba.",
  DER: "Debt to Equity Ratio: perbandingan utang terhadap modal.",
  "Market Cap": "Total nilai pasar perusahaan (harga saham × jumlah saham).",
  "Total Revenue": "Total pendapatan perusahaan dalam periode tertentu.",
  "4W Change": "Perubahan harga saham dalam 4 minggu terakhir.",
  "13W Change": "Perubahan harga saham dalam 13 minggu terakhir.",
  "26W Change": "Perubahan harga saham dalam 26 minggu terakhir.",
  "52W Change": "Perubahan harga saham dalam 52 minggu terakhir.",
  "NPM %": "Net Profit Margin: persentase laba bersih dari pendapatan.",
  MTD: "Month to Date: performa sejak awal bulan ini.",
  YTD: "Year to Date: performa sejak awal tahun ini.",
};

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import clsx from "clsx";
import { formatDecimal } from "@/lib/utils";

const metricRules: Record<
  string,
  (value: number) => { label: string; color: string }
> = {
  PER: (v) => {
    if (v < 10) return { label: "Murah", color: "text-green-500" };
    if (v <= 20) return { label: "Wajar", color: "text-yellow-500" };
    return { label: "Mahal", color: "text-red-500" };
  },

  "ROE %": (v) => {
    if (v >= 15) return { label: "Bagus", color: "text-green-500" };
    if (v >= 8) return { label: "Cukup", color: "text-yellow-500" };
    return { label: "Rendah", color: "text-red-500" };
  },

  DER: (v) => {
    if (v < 1) return { label: "Sehat", color: "text-green-500" };
    if (v <= 2) return { label: "Wajar", color: "text-yellow-500" };
    return { label: "Tinggi", color: "text-red-500" };
  },

  "NPM %": (v) => {
    if (v >= 20) return { label: "Tinggi", color: "text-green-500" };
    if (v >= 10) return { label: "Normal", color: "text-yellow-500" };
    return { label: "Tipis", color: "text-red-500" };
  },
};

export default function Kinerja_saham_view(props: Props) {
  const { selectedCompany } = props;

  const _technical_summary: StockTechnical[] = (
    technical_summary as { data: StockTechnical[] }
  ).data;

  const selectedTechnicalSummary = _technical_summary.find(
    (item) => item.Kode_Saham === selectedCompany?.ticker
  )!;

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          Kinerja Saham
        </h3>
        <p className="text-sm text-muted-foreground">{selectedCompany?.name}</p>
      </div>

      {/* FUNDAMENTAL */}
      {/* <Section title="Fundamental">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric
            label="Index"
            value={dummyMetrics.fundamental.index}
            disableIcon
          />
          <Metric
            label="PER"
            value={dummyMetrics.fundamental.per}
            disableIcon
          />
          <Metric
            label="PBV"
            value={dummyMetrics.fundamental.pbv}
            disableIcon
          />
          <Metric
            label="ROE %"
            value={dummyMetrics.fundamental.roe}
            disableIcon
          />
          <Metric
            label="ROA %"
            value={dummyMetrics.fundamental.roa}
            disableIcon
          />
          <Metric
            label="DER"
            value={dummyMetrics.fundamental.der}
            disableIcon
          />
          <Metric
            label="Market Cap"
            value={formatNumber(dummyMetrics.fundamental.marketCap)}
            disableIcon
          />
          <Metric
            label="Total Revenue"
            value={formatNumber(dummyMetrics.fundamental.totalRevenue)}
            disableIcon
          />
        </div>
      </Section> */}

      {/* PERFORMANCE */}
      <Section title="Performance">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Metric
            label="4W Change"
            value={formatDecimal(
              selectedTechnicalSummary?._4_wk_chg?.value,
              selectedTechnicalSummary?._4_wk_chg?.direction
            )}
            percentage
          />
          <Metric
            label="13W Change"
            value={formatDecimal(
              selectedTechnicalSummary?._13_wk_chg?.value,
              selectedTechnicalSummary?._13_wk_chg?.direction
            )}
            percentage
          />
          <Metric
            label="26W Change"
            value={formatDecimal(
              selectedTechnicalSummary?._26_wk_chg?.value,
              selectedTechnicalSummary?._26_wk_chg?.direction
            )}
            percentage
          />
          <Metric
            label="52W Change"
            value={formatDecimal(
              selectedTechnicalSummary?._52_wk_chg?.value,
              selectedTechnicalSummary?._52_wk_chg?.direction
            )}
            percentage
          />
          {/* <Metric
            label="NPM %"
            value={formatDecimal(selectedTechnicalSummary?.npm)}
          /> */}
          <Metric
            label="MTD"
            value={formatDecimal(
              selectedTechnicalSummary?.mtd?.value,
              selectedTechnicalSummary?.mtd?.direction
            )}
            percentage
          />
          <Metric
            label="YTD"
            value={formatDecimal(
              selectedTechnicalSummary?.ytd?.value,
              selectedTechnicalSummary?.ytd?.direction
            )}
            percentage
          />
        </div>
      </Section>
    </GlassCard>
  );
}

function Metric({
  label,
  value,
  disableIcon,
  percentage,
}: {
  label: string;
  value?: string | number;
  disableIcon?: boolean;
  percentage?: boolean;
}) {
  const isNumber = typeof value === "number";

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  let colorClass = "text-foreground";
  let Icon: any = null;

  if (isNumber && !disableIcon) {
    if (value > 0) {
      colorClass = "text-green-500";
      Icon = ArrowUpRight;
    } else if (value < 0) {
      colorClass = "text-red-500";
      Icon = ArrowDownRight;
    } else {
      colorClass = "text-yellow-500";
      Icon = Minus;
    }
  }

  // 👉 dynamic hint
  let hint: { label: string; color: string } | null = null;

  if (isNumber && metricRules[label]) {
    hint = metricRules?.[label]?.(value);
  }

  return (
    <div className="rounded-xl border border-border/50 p-4 bg-background/40 backdrop-blur-sm">
      <div className="flex items-center gap-1 mb-1">
        <p className="text-xs text-muted-foreground">{label}</p>

        {metricDescriptions[label] &&
          (isMobile ? (
            <Popover>
              <PopoverTrigger asChild>
                <Info
                  size={12}
                  className="text-muted-foreground cursor-pointer active:scale-95 transition"
                />
              </PopoverTrigger>

              <PopoverContent
                side="top"
                className="max-w-[220px] text-xs leading-relaxed bg-white text-black border border-gray-200 shadow-md rounded-lg px-3 py-2"
              >
                {metricDescriptions[label]}
              </PopoverContent>
            </Popover>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={12}
                    className="text-muted-foreground cursor-pointer"
                  />
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="max-w-[220px] text-xs leading-relaxed bg-white text-black border border-gray-200 shadow-md rounded-lg px-3 py-2"
                >
                  {metricDescriptions[label]}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>

      <div className="flex items-center gap-1.5">
        <p className={clsx("text-lg font-semibold", colorClass)}>
          {value ?? "-"}
          {percentage ? "%" : ""}
        </p>
        {Icon && <Icon size={16} className={colorClass} />}
      </div>

      {/* 👇 HINT */}
      {hint && (
        <p className={clsx("text-xs mt-1 font-medium", hint.color)}>
          {hint.label}
        </p>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
        {title}
      </h4>
      {children}
    </section>
  );
}
