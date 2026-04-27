import React, { useMemo } from "react";
import { Building2, Flag, User } from "lucide-react";

interface Props {
  item: {
    shareholder_name: string;
    total_companies: string;
    avg_percentage_owned: string;
    companies: {
      id: number;
      name: string;
      type: string;
      ticker: string;
      percentage: number;
    }[];
  };
}

export default function ShareholderGrid(props: Props) {
  const { item } = props;

  return (
    <div className="w-full relative col-span-3 md:col-span-1">
      <div className="bg-white/60 border border-white/30 shadow-sm rounded-3xl p-5 md:p-8 transition">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">
          <ShareholderTitle name={item.shareholder_name} />
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/50 border border-white/40 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">
              {item.total_companies}
            </p>

            <p className="text-xs text-gray-500 mt-1">Total Holdings</p>
          </div>

          <div className="bg-orange-100/50 border border-orange-200/40 rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-orange-600">
              {item.avg_percentage_owned}%
            </p>

            <p className="text-xs text-gray-500 mt-1">Total Ownership</p>
          </div>
        </div>

        {/* HOLDINGS */}
        <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 pb-3 tracking-wide">
          <p>Kode</p>
          <p className="text-center">Persentase</p>
          <p className="text-right pr-5">Tipe</p>
        </div>

        <div className="space-y-4 max-h-[400px] md:max-h-[210px] md:h-[210px] overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {item.companies
            .sort((prev, next) => next.percentage - prev.percentage)
            .map((_item, index) => (
              <a
                target="_blank"
                href={`/profil-perusahaan?search=${_item.ticker}`}
                key={`${item.shareholder_name}_${index}`}
              >
                <div className="shadow-xs bg-white/50 border border-white/40 rounded-xl px-4 py-3 grid grid-cols-3 items-center hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-200">
                  <p className="font-semibold text-gray-700 text-[16px]">
                    {_item.ticker}
                  </p>

                  <p className="text-center font-medium text-gray-700 text-[14px]">
                    {_item.percentage.toFixed(2)}%
                  </p>

                  <p className="text-right font-medium  text-gray-700 text-[14px]">
                    {_item.type}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

function ShareholderTitle({ name }: { name: string }) {
  const type = useMemo(() => {
    const governmentRegex =
      /\b(republik indonesia|pemerintah|negara|kementerian|pemda|provinsi|kabupaten|kota|ri)\b/i;

    if (governmentRegex.test(name)) {
      return "government";
    }

    const companyRegex =
      /\b(pt|tbk|persero|corp|inc|ltd|group|holding|bank|asuransi|capital|fund)\b/i;

    if (companyRegex.test(name)) {
      return "company";
    }

    return "individual";
  }, [name]);

  const searchUrl = useMemo(() => {
    const encodedName = encodeURIComponent(name);

    if (type === "government") {
      return `https://www.google.com/search?q=${encodedName}+instansi+pemerintah+profil`;
    }

    if (type === "company") {
      return `https://www.google.com/search?q=${encodedName}+company+profile+investor+relations`;
    }

    return `https://www.google.com/search?q=${encodedName}+profil+orang`;
  }, [name, type]);

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={searchUrl}
      className="inline-flex items-center gap-2 text-gray-800 font-bold capitalize hover:underline underline-offset-4 transition-all duration-150"
    >
      <h1 className="font-bold flex items-center gap-2 text-gray-800 capitalize">
        {type === "government" && <Flag size={20} />}

        {type === "company" && (
          <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
        )}

        {type === "individual" && (
          <User className="w-5 h-5 text-gray-500 shrink-0" />
        )}

        <span>{name}</span>
      </h1>
    </a>
  );
}
