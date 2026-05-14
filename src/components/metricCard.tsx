/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Info,
  Landmark,
  Wallet,
  TrendingUp,
  Scale,
  Building2,
  BarChart3,
} from "lucide-react";

const metricDescriptions: Record<string, string> = {
  PER: "Price to Earnings Ratio: harga saham dibanding laba per saham.",
  PBV: "Price to Book Value: harga saham dibanding nilai buku perusahaan.",
  "ROE %":
    "Return on Equity: kemampuan perusahaan menghasilkan laba dari modal sendiri.",
  "ROA %":
    "Return on Assets: efisiensi penggunaan aset untuk menghasilkan laba.",
  DER: "Debt to Equity Ratio: perbandingan utang terhadap modal.",
  "Market Cap": "Total nilai pasar perusahaan.",
  "Total Revenue": "Total pendapatan perusahaan.",
  "4W Change": "Performa harga saham dalam 4 minggu terakhir.",
  "13W Change": "Performa harga saham dalam 13 minggu terakhir.",
  "26W Change": "Performa harga saham dalam 26 minggu terakhir.",
  "52W Change": "Performa harga saham dalam 52 minggu terakhir.",
  "NPM %": "Persentase laba bersih dari pendapatan.",
  MTD: "Performa sejak awal bulan.",
  YTD: "Performa sejak awal tahun.",
};

const metricIcons: Record<string, any> = {
  "Market Cap": Building2,
  "Total Revenue": Wallet,
  PER: BarChart3,
  PBV: Landmark,
  "ROE %": TrendingUp,
  "ROA %": TrendingUp,
  DER: Scale,
};

const FINANCIAL_INDUSTRIES = [
  "Bank",
  "Asuransi",
  "Jasa Investasi",
  "Pembiayaan Konsumen",
];

const TECHNOLOGY_INDUSTRIES = [
  "Aplikasi & Jasa Internet",
  "Perangkat Lunak",
  "Jasa & Konsultan TI",
  "Perangkat Komputer",
  "Peralatan Jaringan",
];

const COMMODITY_INDUSTRIES = [
  "Batu Bara",
  "Minyak & Gas",
  "Logam & Mineral",
  "Perhutanan & Kertas",
];

const PROPERTY_INDUSTRIES = ["Pengelola & Pengembang Real Estat"];

const INFRASTRUCTURE_INDUSTRIES = [
  "Kelistrikan",
  "Utilitas Gas",
  "Utilitas Listrik",
  "Operator Infrastruktur Transportasi",
];

function getIndustryType(industry?: string) {
  if (!industry) return "general";

  if (FINANCIAL_INDUSTRIES.includes(industry)) return "financial";

  if (TECHNOLOGY_INDUSTRIES.includes(industry)) return "technology";

  if (COMMODITY_INDUSTRIES.includes(industry)) return "commodity";

  if (PROPERTY_INDUSTRIES.includes(industry)) return "property";

  if (INFRASTRUCTURE_INDUSTRIES.includes(industry)) return "infrastructure";

  return "general";
}

function getMetricRule({
  label,
  value,
  industry,
}: {
  label: string;
  value: number;
  sector?: string;
  industry?: string;
}) {
  const industryType = getIndustryType(industry);

  switch (label) {
    case "PER": {
      if (value <= 0)
        return {
          label: "Rugi",
          color: "danger",
        };

      // TECHNOLOGY
      if (industryType === "technology") {
        if (value < 20)
          return {
            label: "Murah",
            color: "success",
          };

        if (value <= 40)
          return {
            label: "Growth Wajar",
            color: "warning",
          };

        return {
          label: "Tinggi",
          color: "danger",
        };
      }

      // COMMODITY
      if (industryType === "commodity") {
        if (value < 5)
          return {
            label: "Murah",
            color: "success",
          };

        if (value <= 10)
          return {
            label: "Wajar",
            color: "warning",
          };

        return {
          label: "Mahal",
          color: "danger",
        };
      }

      // DEFAULT
      if (value < 10)
        return {
          label: "Murah",
          color: "success",
        };

      if (value <= 20)
        return {
          label: "Wajar",
          color: "warning",
        };

      return {
        label: "Mahal",
        color: "danger",
      };
    }

    case "PBV": {
      // FINANCIAL
      if (industryType === "financial") {
        if (value < 1)
          return {
            label: "Undervalued",
            color: "success",
          };

        if (value <= 2)
          return {
            label: "Wajar",
            color: "warning",
          };

        return {
          label: "Premium",
          color: "danger",
        };
      }

      // PROPERTY
      if (industryType === "property") {
        if (value < 0.8)
          return {
            label: "Murah",
            color: "success",
          };

        if (value <= 1.5)
          return {
            label: "Wajar",
            color: "warning",
          };

        return {
          label: "Premium",
          color: "danger",
        };
      }

      // DEFAULT
      if (value < 1)
        return {
          label: "Murah",
          color: "success",
        };

      if (value <= 3)
        return {
          label: "Wajar",
          color: "warning",
        };

      return {
        label: "Premium",
        color: "danger",
      };
    }

    case "ROE %": {
      // FINANCIAL
      if (industryType === "financial") {
        if (value >= 18)
          return {
            label: "Sangat Bagus",
            color: "success",
          };

        if (value >= 12)
          return {
            label: "Bagus",
            color: "success",
          };

        if (value >= 8)
          return {
            label: "Cukup",
            color: "warning",
          };

        return {
          label: "Rendah",
          color: "danger",
        };
      }

      // TECHNOLOGY
      if (industryType === "technology") {
        if (value >= 15)
          return {
            label: "Bagus",
            color: "success",
          };

        if (value >= 5)
          return {
            label: "Cukup",
            color: "warning",
          };

        return {
          label: "Rendah",
          color: "danger",
        };
      }

      // DEFAULT
      if (value >= 20)
        return {
          label: "Sangat Bagus",
          color: "success",
        };

      if (value >= 10)
        return {
          label: "Bagus",
          color: "success",
        };

      if (value >= 5)
        return {
          label: "Cukup",
          color: "warning",
        };

      return {
        label: "Rendah",
        color: "danger",
      };
    }

    case "ROA %": {
      // FINANCIAL
      if (industryType === "financial") {
        if (value >= 3)
          return {
            label: "Sangat Efisien",
            color: "success",
          };

        if (value >= 1.5)
          return {
            label: "Bagus",
            color: "success",
          };

        if (value >= 1)
          return {
            label: "Cukup",
            color: "warning",
          };

        return {
          label: "Rendah",
          color: "danger",
        };
      }

      // DEFAULT
      if (value >= 10)
        return {
          label: "Sangat Efisien",
          color: "success",
        };

      if (value >= 5)
        return {
          label: "Bagus",
          color: "success",
        };

      if (value >= 2)
        return {
          label: "Cukup",
          color: "warning",
        };

      return {
        label: "Rendah",
        color: "danger",
      };
    }

    case "DER": {
      // FINANCIAL
      if (industryType === "financial") {
        return {
          label: "Kurang Relevan",
          color: "neutral",
        };
      }

      // PROPERTY
      if (industryType === "property") {
        if (value < 1)
          return {
            label: "Sehat",
            color: "success",
          };

        if (value <= 3)
          return {
            label: "Normal Sektor",
            color: "warning",
          };

        return {
          label: "Tinggi",
          color: "danger",
        };
      }

      // INFRASTRUCTURE
      if (industryType === "infrastructure") {
        if (value < 1.5)
          return {
            label: "Sehat",
            color: "success",
          };

        if (value <= 3)
          return {
            label: "Wajar",
            color: "warning",
          };

        return {
          label: "Tinggi",
          color: "danger",
        };
      }

      // DEFAULT
      if (value < 0.5)
        return {
          label: "Sangat Sehat",
          color: "success",
        };

      if (value < 1.5)
        return {
          label: "Sehat",
          color: "success",
        };

      if (value <= 2)
        return {
          label: "Wajar",
          color: "warning",
        };

      return {
        label: "Tinggi",
        color: "danger",
      };
    }

    case "NPM %": {
      // COMMODITY
      if (industryType === "commodity") {
        if (value >= 20)
          return {
            label: "Tinggi",
            color: "success",
          };

        if (value >= 10)
          return {
            label: "Normal",
            color: "warning",
          };

        return {
          label: "Tipis",
          color: "danger",
        };
      }

      // RETAIL / CONSUMER
      if (industry === "Department Store" || industry === "Ritel Khusus") {
        if (value >= 8)
          return {
            label: "Bagus",
            color: "success",
          };

        if (value >= 3)
          return {
            label: "Normal",
            color: "warning",
          };

        return {
          label: "Tipis",
          color: "danger",
        };
      }

      // DEFAULT
      if (value >= 15)
        return {
          label: "Tinggi",
          color: "success",
        };

      if (value >= 5)
        return {
          label: "Normal",
          color: "warning",
        };

      return {
        label: "Tipis",
        color: "danger",
      };
    }

    default:
      return null;
  }
}

export default function Metric({
  label,
  value,
  disableArrow,
  percentage,
  featured,
  sector,
  industry,
}: {
  label: string;
  value?: string | number;
  disableArrow?: boolean;
  percentage?: boolean;
  featured?: boolean;
  sector?: string;
  industry?: string;
}) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const MetricIcon = metricIcons[label];

  const numericValue =
    typeof value === "string" ? Number(String(value).replace(/,/g, "")) : value;

  const isNumber =
    typeof numericValue === "number" && !Number.isNaN(numericValue);

  let colorClass = "text-zinc-900";
  let ArrowIcon: any = null;

  if (isNumber && !disableArrow) {
    if (numericValue > 0) {
      colorClass = "text-emerald-600";
      ArrowIcon = ArrowUpRight;
    } else if (numericValue < 0) {
      colorClass = "text-red-600";
      ArrowIcon = ArrowDownRight;
    } else {
      colorClass = "text-yellow-600";
      ArrowIcon = Minus;
    }
  }

  const hint =
    isNumber && !disableArrow
      ? null
      : isNumber
        ? getMetricRule({
            label,
            value: numericValue,
            sector,
            industry,
          })
        : null;

  return (
    <div
      className={clsx(
        "relative rounded-2xl border",
        featured ? "col-span-2 min-h-[130px]" : "min-h-[120px]",
      )}
    >
      {/* gradient background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent" />

      {/* content */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {MetricIcon && (
              <div className="flex h-8 w-8 items-center justify-center rounded bg-neutral-100 border border-white/10">
                <MetricIcon size={15} className="text-zinc-400" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-zinc-500">{label}</p>

                {metricDescriptions[label] &&
                  (isMobile ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Info
                          size={12}
                          className="cursor-pointer text-zinc-500"
                        />
                      </PopoverTrigger>

                      <PopoverContent className="max-w-[220px] border-white/10 bg-zinc-900 text-zinc-200 text-xs leading-relaxed">
                        {metricDescriptions[label]}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            size={12}
                            className="cursor-pointer text-zinc-500"
                          />
                        </TooltipTrigger>

                        <TooltipContent className="max-w-[220px] border-white/10 bg-zinc-900 text-zinc-200 text-xs leading-relaxed">
                          {metricDescriptions[label]}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
              </div>
            </div>
          </div>

          {ArrowIcon && (
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full",
                isNumber && numericValue > 0 && "bg-emerald-500/10",

                isNumber && numericValue < 0 && "bg-red-500/10",

                isNumber && numericValue === 0 && "bg-yellow-500/10",
              )}
            >
              <ArrowIcon size={16} className={colorClass} />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-end gap-1.5 mt-5">
            <p
              className={clsx(
                featured ? "text-3xl" : "text-2xl",
                "font-bold tracking-tight",
                colorClass,
              )}
            >
              {value ?? "-"}

              {percentage && (
                <span>%</span>
              )}
            </p>
          </div>

          {hint && (
            <div
              className={clsx(
                "mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold",
                hint.color === "success" &&
                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10",
                hint.color === "warning" &&
                  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/10",
                hint.color === "danger" &&
                  "bg-red-500/10 text-red-400 border border-red-500/10",
                hint.color === "neutral" &&
                  "bg-zinc-500/10 text-zinc-400 border border-zinc-500/10",
              )}
            >
              {hint.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
