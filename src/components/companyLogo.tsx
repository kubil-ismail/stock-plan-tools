import { useState, memo } from "react";

function CompanyLogo({ company }: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center relative">
      {/* Skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-100" />
      )}

      {/* Image */}
      {!error && company.logo && (
        <img
          src={company.logo}
          alt={company.Nama}
          className={`
            object-contain p-2 w-full h-full
            transition-opacity duration-200
            ${loading ? "opacity-0" : "opacity-100"}
          `}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      {/* Fallback */}
      {error && <FallbackLogo code={company.Kode} />}
    </div>
  );
}

export default memo(CompanyLogo);

function FallbackLogo({ code }: { code?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <span className="text-sm font-semibold text-gray-500">
        {code?.slice(0, 2) || "NA"}
      </span>
    </div>
  );
}
