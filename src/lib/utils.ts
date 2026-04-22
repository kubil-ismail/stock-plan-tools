import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type StrategyType = "EFFICIENT" | "BALANCE" | "AGGRESSIVE";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(
  value: number | string | undefined,
  options?: {
    prefix?: boolean; // default true => pakai "Rp"
    minimumFractionDigits?: number; // default 0
    maximumFractionDigits?: number; // default 0
  }
): string {
  const number =
    typeof value === "string" ? Number(value.replace(/[^0-9.-]+/g, "")) : value;

  if (number && isNaN(number)) return "Rp 0";

  const {
    prefix = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {};

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number!);

  if (!prefix) {
    return formatted.replace("Rp", "").trim();
  }

  return formatted;
}

const toNumber = (v: any): number => {
  if (v === null || v === undefined) return 0;

  const str = String(v).trim();

  // handle format Indonesia: 1.471,74
  if (str.includes(",") && str.includes(".")) {
    return Number(str.replace(/\./g, "").replace(",", "."));
  }

  // handle decimal: 1471.74
  if (str.includes(".")) {
    return Number(str);
  }

  // handle integer: 1471
  return Number(str.replace(/\./g, ""));
};

export function getRecommendedTargetAvg({
  currentAvg,
  lastPrice,
  strategy,
}: {
  currentAvg: number | string;
  lastPrice: number | string;
  strategy: StrategyType;
}) {
  const avg = toNumber(currentAvg);
  const price = toNumber(lastPrice);

  if (!avg || !price) return null;

  if (price >= avg) return null;

  const diff = avg - price;

  let factor = 0.5;

  switch (strategy) {
    case "EFFICIENT":
      factor = 0.3;
      break;

    case "BALANCE":
      factor = 0.5;
      break;

    case "AGGRESSIVE":
      factor = 0.7;
      break;
  }

  const recommended = avg - diff * factor;

  if (recommended <= price) {
    return Math.round(price + 10);
  }

  return Math.round(recommended);
}

export const getAvgChangePercent = (
  currentAvg?: number | string,
  targetAvg?: number | string
) => {
  if (!currentAvg || !targetAvg) return null;

  const avg = toNumber(currentAvg);
  const target = toNumber(targetAvg);

  console.log(avg);

  if (!avg || !target) return null;

  const percent = ((target - avg) / avg) * 100;

  return Number(percent.toFixed(2));
};

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      // ganti spasi jadi dash
      .replace(/\s+/g, "-")
      // hapus karakter selain huruf, angka, titik, dash, apostrophe
      .replace(/[^a-z0-9.\-']/g, "")
      // rapihin dash dobel
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export function unslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const calculatePercentage = (
  from: number | string,
  to: number | string,
  options?: { percentage?: boolean }
): number | string => {
  const fromNum = Number(from);
  const toNum = Number(to);

  if (!fromNum || !toNum) return 0;

  const percentage = ((toNum - fromNum) / fromNum) * 100;

  if (options?.percentage) {
    return `${percentage > 0 ? "+" : ""}${Number(percentage.toFixed(2))}%`;
  }

  return Number(percentage.toFixed(2));
};
