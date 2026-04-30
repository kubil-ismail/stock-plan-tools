import {
  TrendingUp,
  Star,
  Zap,
  Shield,
  Clock,
  Mail,
  ArrowRight,
  Building2,
  UserRoundSearch,
  Megaphone,
} from "lucide-react";
import Link from "next/link";

export const marketFeatures = [
  {
    icon: Building2,
    title: "Profil Perusahaan",
    link: "profil-perusahaan",
    description:
      "Pelajari profil perusahaan, manajemen, dan hubungan perusahaan untuk memahami bisnis di balik saham.",
  },
  {
    icon: UserRoundSearch,
    title: "Kepemilikan Saham",
    link: "kepemilikan-saham",
    description:
      "Cari tahu siapa saja yang memiliki saham tertentu, termasuk investor besar, institusi, atau tokoh terkenal.",
  },
  {
    icon: Megaphone,
    title: "Informasi Perusahaan",
    link: "informasi-perusahaan",
    description:
      "Pantau berbagai informasi penting seperti aksi korporasi, jadwal perusahaan, notasi khusus, dan status pemantauan dalam satu tempat.",
  },
];

export const toolsFeatures = [
  {
    icon: TrendingUp,
    title: "Kalkulator Average",
    link: "kalkulator-avarage",
    description:
      "Hitung bagaimana harga rata-rata berubah saat Anda membeli saham secara bertahap di harga yang berbeda.",
  },
  {
    icon: Star,
    title: "Watchlist",
    link: "watchlist",
    description:
      "Simpan dan pantau saham favorit Anda dalam satu tempat untuk memudahkan memonitor daftar saham yang ingin Anda ikuti.",
  },
  // {
  //   icon: TrendingDown,
  //   title: "Kalkulator Drawdown",
  //   link: "kalkulator-drawdown",
  //   description:
  //     "Ketahui seberapa besar penurunan dari modal atau portofolio Anda untuk mengukur risiko kerugian.",
  // },
  // {
  //   icon: Calculator,
  //   title: "Kalkulator Resiko & Reward",
  //   link: "kalkulator-resiko-and-reward",
  //   description:
  //     "Bandingkan potensi keuntungan dan kerugian sebelum membeli saham untuk membantu pengambilan keputusan.",
  // },
  // {
  //   icon: PieChart,
  //   title: "Pembagian Portofolio",
  //   link: "pembagian-portofolio",
  //   description:
  //     "Lihat komposisi investasi Anda berdasarkan sektor, industri, atau perusahaan untuk menjaga keseimbangan portofolio.",
  // },
  // {
  //   icon: DollarSign,
  //   title: "Kalkulator Dividen",
  //   link: "kalkulator-dividen",
  //   description:
  //     "Hitung potensi pendapatan dari dividen dan proyeksi pertumbuhannya dalam jangka panjang.",
  // },
  // {
  //   icon: BarChart3,
  //   title: "Simulasi Strategi Investasi",
  //   link: "simulasi-strategi-investasi",
  //   description:
  //     "Simulasikan cara membeli saham secara bertahap dan lihat hasil akhir jika harga naik atau turun.",
  // },
];

export const highlights = [
  {
    icon: Zap,
    title: "Mudah Dipahami untuk Pemula",
    description:
      "Dirancang dengan bahasa yang sederhana dan tampilan yang mudah digunakan, bahkan jika Anda baru pertama kali belajar saham.",
  },
  {
    icon: Shield,
    title: "Bantu Rencanakan Sebelum Membeli",
    description:
      "Gunakan simulasi dan kalkulator untuk memahami risiko, potensi keuntungan, dan strategi sebelum mengambil keputusan.",
  },
  {
    icon: Clock,
    title: "Semua Tools dalam Satu Tempat",
    description:
      "Tidak perlu membuka banyak aplikasi atau menghitung manual. Semua kebutuhan perencanaan investasi tersedia dalam satu platform.",
  },
];

function Home_View() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-[28px] md:text-[48px] font-bold text-[#2A2826] mb-4 leading-tight">
            Tools & Insight untuk Investor Saham
          </h1>
          <p className="text-[18px] text-[#8A8682] max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk merencanakan dan mengelola investasi
            saham dalam satu platform
          </p>
        </div>
      </section>

      {/* Market & Insight */}
      <section id="market-insight" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#2A2826] mb-8">
          Market & Insight
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketFeatures.map((feature) => (
            <Link href={feature.link} key={feature.link}>
              <div className="bg-white shadow-md rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group">
                <div className="w-14 h-14 bg-[rgba(249,115,22,0.1)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F97316] transition-colors">
                  <feature.icon className="w-7 h-7 text-[#F97316] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[20px] font-bold text-[#2A2826] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#8A8682] leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-[#F97316] text-[14px] font-bold group-hover:gap-3 transition-all">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools & Simulator */}
      <section id="tools-simulator" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#2A2826] mb-8">
          Tools & Simulator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {toolsFeatures.map((feature) => (
            <Link href={feature.link} key={feature.link}>
              <div className="bg-white shadow-md rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group">
                <div className="w-14 h-14 bg-[rgba(249,115,22,0.1)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F97316] transition-colors">
                  <feature.icon className="w-7 h-7 text-[#F97316] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[20px] font-bold text-[#2A2826] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#8A8682] leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-[#F97316] text-[14px] font-bold group-hover:gap-3 transition-all">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#2A2826] mb-4 text-center">
            Kenapa Memilih Stockplan?
          </h2>
          <p className="text-[16px] text-[#8A8682] text-center mb-12 max-w-2xl mx-auto">
            Platform all-in-one yang dirancang khusus untuk membantu investor
            saham Indonesia membuat keputusan yang lebih cerdas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[rgba(249,115,22,0.1)] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <highlight.icon className="w-8 h-8 text-[#F97316]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#2A2826] mb-2">
                  {highlight.title}
                </h3>
                <p className="text-[14px] text-[#8A8682] leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-[#FFF4ED] to-[#FED7AA] rounded-3xl p-12 text-center border border-[#FDBA74]">
          <Mail className="w-16 h-16 mx-auto mb-6 text-[#F97316]" />
          <h2 className="text-[20px] md:text-[32px] font-bold mb-4 text-[#2A2826]">
            Ada Pertanyaan tentang Stockplan?
          </h2>
          <p className="text-[14px] md:text-[18px] mb-8 text-[#8A8682] md:max-w-2xl mx-auto">
            Kami siap membantu Anda memahami fitur dan merencanakan investasi
            dengan lebih mudah.
          </p>
          <a
            href="mailto:info@stockplan.id"
            className="bg-[#F97316] text-white px-8 py-3 rounded-xl font-bold text-[16px] hover:bg-[#EA580C] transition-colors inline-block"
          >
            Kirim Pesan
          </a>
        </div>
      </section>
    </>
  );
}

export default Home_View;
