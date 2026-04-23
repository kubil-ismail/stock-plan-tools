"use client";
import { Wrench, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UnderDevelopmentProps {
  featureName?: string;
}

export default function Maintenance_View({
  featureName = "Fitur",
}: UnderDevelopmentProps) {
  const pathname = usePathname();
  const get_pathname = pathname?.replace("/", "")?.split("-").join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#FFF4ED] to-[#F8F9FA] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5E7EB] shadow-xl">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <Wrench className="w-16 h-16 text-white relative z-10 animate-[spin_3s_ease-in-out_infinite]" />
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-3 left-3">
                <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FED7AA] rounded-2xl opacity-50 animate-[bounce_2s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#FDBA74] rounded-xl opacity-40 animate-[bounce_2.5s_ease-in-out_infinite]"></div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-[36px] md:text-[42px] font-bold text-[#2A2826] mb-4 leading-tight">
              Sedang Kami Kembangkan
            </h1>
            <div className="inline-block bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-6 py-2 rounded-full mb-6">
              <span className="text-[16px] font-bold">
                {featureName} {get_pathname}
              </span>
            </div>
            <p className="text-[18px] text-[#8A8682] leading-relaxed mb-6">
              Kami sedang bekerja keras untuk menghadirkan fitur terbaik untuk
              Anda. Fitur ini akan segera hadir dengan pengalaman yang lebih
              baik dan lebih lengkap.
            </p>
          </div>

          {/* Back Button */}
          <Link href="/">
            <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-4 rounded-xl font-bold text-[16px] transition-colors flex items-center justify-center gap-2 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Beranda
            </button>
          </Link>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-[14px] text-[#8A8682]">
            Punya saran atau masukan?{" "}
            <a
              href="mailto:info@stockplan.id"
              className="text-[#F97316] font-bold hover:underline"
            >
              Hubungi Kami
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
