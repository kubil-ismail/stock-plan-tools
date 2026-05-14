/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type StrategyType = "EFFICIENT" | "BALANCE" | "AGGRESSIVE";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatRupiah(
  value: number | string | undefined,
  options?: {
    prefix?: boolean; // default true => pakai "Rp"
    minimumFractionDigits?: number; // default 0
    maximumFractionDigits?: number; // default 0
  },
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
  targetAvg?: number | string,
) => {
  if (!currentAvg || !targetAvg) return null;

  const avg = toNumber(currentAvg);
  const target = toNumber(targetAvg);

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
      .replace(/[^a-z0-9.,\-']/g, "")
      // rapihin dash dobel
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export function unslugify(slug: string) {
  return (
    decodeURIComponent(slug)
      .toLowerCase()
      .trim()

      // khusus handle gelar: -s.-ak → , S. Ak
      .replace(/-([a-z])\.-/g, ", $1. ")

      // sisa dash jadi spasi
      .replace(/-+/g, " ")

      // rapihin spasi
      .replace(/\s+/g, " ")

      // kapitalisasi tiap kata
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export const calculatePercentage = (
  from: number | string,
  to: number | string,
  options?: { percentage?: boolean },
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

export function parseNumber(value?: string | number) {
  if (value === null || value === undefined) return 0;

  if (typeof value === "number") return value;

  return Number(value.replace(/\./g, ""));
}

export function sortManagement(data: any[]) {
  const normalize = (value: string = "") => value.toUpperCase().trim();

  const TYPE_PRIORITY: Record<string, number> = {
    KOMISARIS: 1,
    DIREKSI: 2,
    DIREKTUR: 2,
    "SEKRETARIS PERUSAHAAN": 3,
    "KOMITE AUDIT": 4,
  };

  const getTypePriority = (type: string) => {
    return TYPE_PRIORITY[normalize(type)] ?? 999;
  };

  const getPositionPriority = (type: string, position: string) => {
    const normalizedType = normalize(type);
    const normalizedPosition = normalize(position);

    // =========================
    // KOMISARIS
    // =========================
    if (normalizedType === "KOMISARIS") {
      if (
        normalizedPosition.includes("PRESIDEN KOMISARIS") ||
        normalizedPosition.includes("KOMISARIS UTAMA")
      ) {
        return 1;
      }

      if (normalizedPosition.includes("WAKIL")) {
        return 2;
      }

      if (normalizedPosition.includes("KOMISARIS")) {
        return 3;
      }
    }

    // =========================
    // DIREKSI / DIREKTUR
    // =========================
    if (normalizedType === "DIREKSI" || normalizedType === "DIREKTUR") {
      if (
        normalizedPosition.includes("PRESIDEN DIREKTUR") ||
        normalizedPosition.includes("DIREKTUR UTAMA")
      ) {
        return 1;
      }

      if (normalizedPosition.includes("WAKIL")) {
        return 2;
      }

      if (normalizedPosition.includes("DIREKTUR")) {
        return 3;
      }
    }

    // =========================
    // SEKRETARIS
    // =========================
    if (normalizedType === "SEKRETARIS PERUSAHAAN") {
      return 1;
    }

    // =========================
    // KOMITE AUDIT
    // =========================
    if (normalizedType === "KOMITE AUDIT") {
      if (normalizedPosition.includes("KETUA")) {
        return 1;
      }

      if (normalizedPosition.includes("ANGGOTA")) {
        return 2;
      }
    }

    return 999;
  };

  return [...data].sort((a, b) => {
    const typeA = getTypePriority(a?.type);
    const typeB = getTypePriority(b?.type);

    // 1️⃣ sort by type
    if (typeA !== typeB) {
      return typeA - typeB;
    }

    // 2️⃣ sort by position
    const posA = getPositionPriority(a?.type, a?.position);
    const posB = getPositionPriority(b?.type, b?.position);

    if (posA !== posB) {
      return posA - posB;
    }

    // 3️⃣ fallback by name
    return (a?.name || "").localeCompare(b?.name || "");
  });
}

export const formatUrl = (url?: string) => {
  if (!url) return "#";

  // kalau sudah ada protocol, pakai langsung
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // kalau belum ada → tambahin https
  return `https://${url}`;
};

export const formatDecimal = (
  value: string | null | undefined,
  direction?: "+" | "-" | "=",
): number => {
  if (!value) return 0;

  // bersihin string
  let cleaned = value.replace(/[^\d,.-]/g, "");

  // format indo → number
  cleaned = cleaned.replace(/\./g, "").replace(",", ".");

  let result = Number(cleaned);

  if (isNaN(result)) return 0;

  // paksa jadi absolute dulu
  result = Math.abs(result);

  // apply direction
  if (direction === "-") return -result;
  if (direction === "=") return 0;

  return result; // default atau "+"
};

export const normalizeSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // hapus titik, koma, dll
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .join("-");

export const removeDuplicateCompanies = (
  data: {
    name: string;
    business_type: string;
    total_assets: number;
    ownership_percentage: number;
  }[],
): {
  name: string;
  business_type: string;
  total_assets: number;
  ownership_percentage: number;
}[] => {
  const seen = new Set<string>();

  return data.filter((item) => {
    const key = [
      item.name.trim().toLowerCase(),
      item.business_type.trim().toLowerCase(),
      item.total_assets,
      item.ownership_percentage,
    ].join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

export function formatBigNumber(value: number): string {
  if (!value && value !== 0) return "-";

  const abs = Math.abs(value);

  const format = (num: number, suffix: string) => {
    return `${parseFloat(num.toFixed(2))}${suffix}`;
  };

  if (abs >= 1_000_000_000_000) {
    return format(value / 1_000_000_000_000, " T");
  }

  if (abs >= 1_000_000_000) {
    return format(value / 1_000_000_000, " M");
  }

  if (abs >= 1_000_000) {
    return format(value / 1_000_000, " Jt");
  }

  if (abs >= 1_000) {
    return format(value / 1_000, " Rb");
  }

  return value.toString();
}

export function generateInsight(data: {
  sector?: string;
  subSector?: string;

  industry?: string;
  subIndustry?: string;

  listing_board?: string;

  marketCap?: number;
  revenue?: number;

  per?: number;
  pbv?: number;

  roe?: number;
  roa?: number;
  der?: number;
  npm?: number;

  ytd?: number;
  chg52w?: number;

  mtd?: number;
  chg4w?: number;

  chg13w?: number;
  chg26w?: number;
}): { summary: any; signal: any } {
  // =========================================================
  // HELPERS
  // =========================================================

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const avg = (values: number[]) => {
    const valid = values.filter(
      (v) => typeof v === "number" && !Number.isNaN(v),
    );

    if (!valid.length) return 0;

    return valid.reduce((a, b) => a + b, 0) / valid.length;
  };

  const contains = (keywords: string[]) => {
    return keywords.some((keyword) =>
      normalizedText.includes(keyword.toLowerCase()),
    );
  };

  // =========================================================
  // NORMALIZED TEXT
  // =========================================================

  const normalizedText = [
    data.sector,
    data.subSector,
    data.industry,
    data.subIndustry,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // =========================================================
  // INDUSTRY PROFILE DETECTION
  // =========================================================

  function getIndustryProfile() {
    // =====================================================
    // FINANCIAL
    // =====================================================

    if (
      contains([
        "keuangan",
        "bank",
        "asuransi",
        "reasuransi",
        "investasi",
        "holding keuangan",
        "pembiayaan",
        "manajemen investasi",
      ])
    ) {
      return "financial";
    }

    // =====================================================
    // TECHNOLOGY
    // =====================================================

    if (
      contains([
        "teknologi",
        "software",
        "perangkat lunak",
        "internet",
        "aplikasi",
        "jasa ti",
        "konsultan ti",
        "telekomunikasi",
        "perangkat jaringan",
        "perangkat komputer",
        "teknologi informasi",
      ])
    ) {
      return "technology";
    }

    // =====================================================
    // PROPERTY
    // =====================================================

    if (
      contains([
        "properti",
        "real estat",
        "pengembang",
        "konstruksi bangunan",
        "jasa real estat",
      ])
    ) {
      return "property";
    }

    // =====================================================
    // INFRASTRUCTURE
    // =====================================================

    if (
      contains([
        "infrastruktur",
        "utilitas",
        "kelistrikan",
        "jalan tol",
        "pelabuhan",
        "bandar udara",
        "transportasi",
        "operator",
      ])
    ) {
      return "infrastructure";
    }

    // =====================================================
    // ENERGY DISTRIBUTION
    // =====================================================

    if (
      contains([
        "distribusi batu bara",
        "penyimpanan",
        "distribusi minyak",
        "distribusi gas",
        "logistik",
        "pengantaran",
        "pendukung minyak",
        "jasa pengeboran",
        "jasa minyak",
      ])
    ) {
      return "energy_distribution";
    }

    // =====================================================
    // PURE COMMODITY
    // =====================================================

    if (
      contains([
        "batu bara",
        "minyak",
        "gas",
        "logam",
        "mineral",
        "emas",
        "tembaga",
        "nikel",
        "perhutanan",
        "kertas",
        "produk hutan",
        "perkebunan",
        "mining",
      ])
    ) {
      return "commodity";
    }

    // =====================================================
    // CONSUMER
    // =====================================================

    if (
      contains([
        "makanan",
        "minuman",
        "rokok",
        "ritel",
        "supermarket",
        "department store",
        "produk perawatan tubuh",
        "barang rumah tangga",
        "pakaian",
      ])
    ) {
      return "consumer";
    }

    // =====================================================
    // HEALTHCARE
    // =====================================================

    if (
      contains([
        "farmasi",
        "kesehatan",
        "rumah sakit",
        "penyedia jasa kesehatan",
        "peralatan kesehatan",
      ])
    ) {
      return "healthcare";
    }

    return "general";
  }

  const industryProfile = getIndustryProfile();

  // =========================================================
  // VALUES
  // =========================================================

  const marketCap = data.marketCap ?? 0;
  const revenue = data.revenue ?? 0;

  const per = data.per ?? 0;
  const pbv = data.pbv ?? 0;

  const roe = data.roe ?? 0;
  const roa = data.roa ?? 0;
  const der = data.der ?? 0;
  const npm = data.npm ?? 0;

  // const ytd = data.ytd ?? 0;
  // const chg52w = data.chg52w ?? 0;

  // const mtd = data.mtd ?? 0;
  // const chg4w = data.chg4w ?? 0;

  // const chg13w = data.chg13w ?? 0;
  // const chg26w = data.chg26w ?? 0;

  const listingBoard = (data.listing_board || "").toLowerCase();

  // =========================================================
  // VALUATION RULES
  // =========================================================

  const isCheapPER =
    industryProfile === "technology"
      ? per > 0 && per < 20
      : industryProfile === "commodity"
        ? per > 0 && per < 8
        : industryProfile === "consumer"
          ? per > 0 && per < 15
          : per > 0 && per < 10;

  const isFairPER =
    industryProfile === "technology"
      ? per >= 20 && per <= 40
      : industryProfile === "consumer"
        ? per >= 15 && per <= 25
        : per >= 10 && per <= 20;

  const isPremiumPER =
    industryProfile === "technology"
      ? per > 40
      : industryProfile === "consumer"
        ? per > 25
        : per > 20;

  const isCheapPBV =
    industryProfile === "financial"
      ? pbv > 0 && pbv < 1
      : industryProfile === "property"
        ? pbv > 0 && pbv < 0.8
        : pbv > 0 && pbv < 1;

  const isFairPBV =
    industryProfile === "financial"
      ? pbv >= 1 && pbv <= 2
      : industryProfile === "property"
        ? pbv >= 0.8 && pbv <= 1.8
        : pbv >= 1 && pbv <= 3;

  const isPremiumPBV = industryProfile === "financial" ? pbv > 2 : pbv > 3;

  // =========================================================
  // NARRATIVES
  // =========================================================

  const narratives: string[] = [];

  // =========================================================
  // INDUSTRY CONTEXT
  // =========================================================

  const industryNarratives: Record<string, string> = {
    financial:
      "Perusahaan sektor keuangan umumnya lebih dinilai dari efisiensi modal, kualitas aset, dan konsistensi profitabilitas.",

    technology:
      "Perusahaan teknologi biasanya memiliki valuasi lebih tinggi karena ekspektasi pertumbuhan jangka panjang.",

    commodity:
      "Kinerja perusahaan berbasis komoditas cukup dipengaruhi fluktuasi harga komoditas global dan kondisi siklus industri.",

    energy_distribution:
      "Bisnis distribusi energi cenderung lebih stabil dibanding perusahaan komoditas murni karena didukung aktivitas distribusi dan infrastruktur.",

    property:
      "Sektor properti cenderung sensitif terhadap suku bunga dan kondisi ekonomi makro.",

    infrastructure:
      "Bisnis infrastruktur umumnya memiliki karakter defensif dengan kebutuhan modal yang cukup besar.",

    consumer:
      "Sektor konsumer cenderung lebih defensif karena permintaan produk relatif stabil mengikuti konsumsi masyarakat.",

    healthcare:
      "Sektor kesehatan umumnya memiliki permintaan yang relatif stabil dan defensif dalam berbagai kondisi ekonomi.",
  };

  if (industryNarratives[industryProfile]) {
    narratives.push(industryNarratives[industryProfile]);
  }

  // =========================================================
  // SCALE
  // =========================================================

  let scale = "";

  if (marketCap >= 100_000_000_000_000) {
    scale =
      "Kapitalisasi pasar perusahaan berada di kategori sangat besar dengan bisnis yang cenderung lebih stabil";
  } else if (marketCap >= 25_000_000_000_000) {
    scale =
      "Perusahaan termasuk kategori kapitalisasi besar dengan skala bisnis yang solid";
  } else if (marketCap >= 5_000_000_000_000) {
    scale =
      "Perusahaan berada di kategori kapitalisasi menengah dengan potensi pertumbuhan yang masih menarik";
  } else if (marketCap > 0) {
    scale =
      "Perusahaan masih berada di kategori kapitalisasi kecil sehingga pergerakan saham cenderung lebih volatil";
  }

  if (revenue >= 100_000_000_000_000) {
    scale +=
      ", didukung pendapatan yang sangat besar dan bisnis yang sudah cukup matang";
  } else if (revenue >= 10_000_000_000_000) {
    scale +=
      ", dengan pendapatan yang menunjukkan skala bisnis yang cukup besar";
  }

  if (listingBoard.includes("pemantauan")) {
    scale +=
      ", serta berada dalam papan pemantauan khusus dengan tingkat risiko dan volatilitas yang relatif tinggi";
  } else if (listingBoard.includes("pengembangan")) {
    scale +=
      ", serta tercatat pada papan pengembangan yang umumnya dihuni emiten dengan skala bisnis yang masih berkembang";
  } else if (listingBoard.includes("utama")) {
    scale +=
      ", serta tercatat pada papan utama dengan profil bisnis yang relatif lebih matang";
  }

  if (scale) {
    narratives.push(`${capitalize(scale)}.`);
  }

  // =========================================================
  // FUNDAMENTAL
  // =========================================================

  let fundamental = "";

  const strongROE = industryProfile === "financial" ? roe >= 12 : roe >= 15;

  const strongROA = industryProfile === "financial" ? roa >= 2 : roa >= 8;

  const weakROE = roe < 5;
  const weakROA = roa < 2;

  const healthyDebt =
    industryProfile === "financial"
      ? der <= 10
      : industryProfile === "property"
        ? der <= 3
        : industryProfile === "infrastructure"
          ? der <= 2.5
          : der <= 1.5;

  const highDebt =
    industryProfile === "financial"
      ? der > 15
      : industryProfile === "property"
        ? der > 3
        : industryProfile === "infrastructure"
          ? der > 4
          : der > 2;

  if ((strongROE || strongROA) && healthyDebt) {
    fundamental =
      "Fundamental perusahaan terlihat cukup solid dengan profitabilitas dan efisiensi aset yang masih terjaga";
  } else if (highDebt && weakROE) {
    fundamental =
      "Fundamental perusahaan masih menghadapi tekanan akibat profitabilitas yang rendah serta tingkat utang yang cukup tinggi";
  } else if (highDebt) {
    fundamental =
      "Struktur utang perusahaan tergolong cukup tinggi sehingga meningkatkan risiko finansial";
  } else if (strongROA && weakROE) {
    fundamental =
      "Efisiensi aset perusahaan masih cukup baik, meski tingkat pengembalian terhadap modal masih relatif rendah";
  } else if (strongROE || strongROA) {
    fundamental =
      "Perusahaan masih menunjukkan profitabilitas yang cukup baik dibanding rata-rata pasar";
  } else if (weakROE && weakROA) {
    fundamental =
      "Profitabilitas perusahaan masih relatif lemah dibanding rata-rata pasar";
  }

  if (
    (industryProfile === "commodity" && npm >= 20) ||
    (industryProfile === "consumer" && npm >= 10) ||
    npm >= 25
  ) {
    fundamental += " dengan margin laba yang juga tergolong kuat";
  }

  if (fundamental) {
    narratives.push(`${fundamental}.`);
  }

  // =========================================================
  // VALUATION
  // =========================================================

  let valuation = "";

  if (isCheapPER && (isCheapPBV || isFairPBV)) {
    valuation =
      "Di sisi valuasi, saham masih terlihat relatif menarik berdasarkan PER dan PBV";
  } else if (isFairPER || isFairPBV) {
    valuation =
      "Di sisi valuasi, saham saat ini masih berada di area yang relatif wajar";
  } else if (isPremiumPER || isPremiumPBV) {
    valuation =
      "Di sisi valuasi, saham saat ini cenderung berada di level premium";
  }

  if (valuation) {
    narratives.push(`${valuation}.`);
  }

  // =========================================================
  // MOMENTUM
  // =========================================================

  // const shortTerm = avg([mtd, chg4w]);

  // const mediumTerm = avg([chg13w, chg26w]);

  // const longTerm = avg([ytd, chg52w]);

  // let momentum = "";

  // if (shortTerm <= -10 && longTerm >= 15) {
  //   momentum =
  //     "Meski saham mengalami koreksi cukup dalam dalam jangka pendek, tren jangka panjang masih menunjukkan momentum yang positif";
  // } else if (shortTerm >= 10 && mediumTerm >= 10 && longTerm >= 15) {
  //   momentum =
  //     "Pergerakan saham menunjukkan momentum bullish yang masih kuat di berbagai timeframe";
  // } else if (shortTerm < 0 && mediumTerm < 0 && longTerm < 0) {
  //   momentum =
  //     "Performa saham masih berada dalam tekanan di mayoritas timeframe perdagangan";
  // } else if (mediumTerm <= -15 || longTerm <= -20) {
  //   momentum =
  //     "Pergerakan saham dalam jangka menengah hingga panjang masih cenderung melemah";
  // } else if (mediumTerm > 5 && longTerm > 5) {
  //   momentum =
  //     "Pergerakan saham secara menengah hingga panjang masih menunjukkan momentum yang cukup baik";
  // } else {
  //   momentum = "Pergerakan saham cenderung berada dalam fase konsolidasi";
  // }

  // narratives.push(`${momentum}.`);

  // =========================================================
  // SIGNAL
  // =========================================================

 let signal = {
   label: "Netral",
   color: "bg-yellow-50 text-yellow-700 border-yellow-200",
   dot: "bg-yellow-500",
   iconBg: "bg-yellow-100",
   iconColor: "text-yellow-600",
 };

 const positiveScore = [
   strongROE,
   strongROA,
   healthyDebt,
   isCheapPER || isFairPER,
   isCheapPBV || isFairPBV,
  //  mediumTerm > 5,
  //  longTerm > 5,
 ].filter(Boolean).length;

 const riskScore = [
   weakROE,
   weakROA,
   highDebt,
   isPremiumPER,
   isPremiumPBV,
  //  mediumTerm < -10,
  //  longTerm < -10,
   listingBoard.includes("pemantauan"),
 ].filter(Boolean).length;

 // =========================================================
 // POSITIVE
 // =========================================================

 if (positiveScore >= 4 && riskScore <= 2) {
   signal = {
     label: "Positif",
     color: "bg-green-50 text-green-700 border-green-200",
     dot: "bg-green-500",
     iconBg: "bg-green-100",
     iconColor: "text-green-600",
   };
 }

 // =========================================================
 // HIGH RISK
 // =========================================================
 else if (riskScore >= 4) {
   signal = {
     label: "Risiko Tinggi",
     color: "bg-red-50 text-red-700 border-red-200",
     dot: "bg-red-500",
     iconBg: "bg-red-100",
     iconColor: "text-red-600",
   };
 }


  // =========================================================
  // FINAL
  // =========================================================

  if (!narratives.length) {
    return {
      summary:
        "Belum tersedia insight yang cukup untuk menggambarkan kondisi fundamental dan performa saham perusahaan.",
      signal,
    };
  }

  return {
    summary: narratives.join(" ").replace(/\s+/g, " ").trim(),
    signal,
  };
}
