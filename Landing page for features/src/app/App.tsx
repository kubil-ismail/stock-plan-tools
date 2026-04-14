import { useState } from 'react';
import { Calendar, Users, Building, TrendingUp, TrendingDown, Calculator, PieChart, DollarSign, BarChart3, Zap, Shield, Clock, Mail, ArrowRight } from 'lucide-react';
import { StockCalendar } from './components/StockCalendar';
import { UnderDevelopment } from './components/UnderDevelopment';
import { StockAverageSimulator } from './components/StockAverageSimulator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'calendar' | 'under-dev' | 'stock-average'>('home');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const marketFeatures = [
    {
      icon: Calendar,
      title: "Kalender Saham",
      description: "Pantau jadwal penting seperti dividen, laporan keuangan, dan aksi korporasi agar tidak ketinggalan momen pasar."
    },
    {
      icon: Users,
      title: "Aktivitas Insider",
      description: "Lihat pergerakan jual dan beli saham oleh direksi dan manajemen perusahaan untuk memahami sinyal dari dalam perusahaan."
    },
    {
      icon: Building,
      title: "Kepemilikan Saham",
      description: "Cari tahu siapa saja yang memiliki saham tertentu, termasuk investor besar, institusi, atau tokoh terkenal."
    }
  ];

  const toolsFeatures = [
    {
      icon: TrendingUp,
      title: "Simulasi Rata-Rata Saham",
      description: "Hitung bagaimana harga rata-rata berubah saat Anda membeli saham secara bertahap di harga yang berbeda."
    },
    {
      icon: TrendingDown,
      title: "Kalkulator Drawdown",
      description: "Ketahui seberapa besar penurunan dari modal atau portofolio Anda untuk mengukur risiko kerugian."
    },
    {
      icon: Calculator,
      title: "Kalkulator Risiko & Reward",
      description: "Bandingkan potensi keuntungan dan kerugian sebelum membeli saham untuk membantu pengambilan keputusan."
    },
    {
      icon: PieChart,
      title: "Pembagian Portofolio",
      description: "Lihat komposisi investasi Anda berdasarkan sektor, industri, atau perusahaan untuk menjaga keseimbangan portofolio."
    },
    {
      icon: DollarSign,
      title: "Kalkulator Dividen",
      description: "Hitung potensi pendapatan dari dividen dan proyeksi pertumbuhannya dalam jangka panjang."
    },
    {
      icon: BarChart3,
      title: "Simulasi Strategi Investasi",
      description: "Simulasikan cara membeli saham secara bertahap dan lihat hasil akhir jika harga naik atau turun."
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Mudah Dipahami untuk Pemula",
      description: "Dirancang dengan bahasa yang sederhana dan tampilan yang mudah digunakan, bahkan jika Anda baru pertama kali belajar saham."
    },
    {
      icon: Shield,
      title: "Bantu Rencanakan Sebelum Membeli",
      description: "Gunakan simulasi dan kalkulator untuk memahami risiko, potensi keuntungan, dan strategi sebelum mengambil keputusan."
    },
    {
      icon: Clock,
      title: "Semua Tools dalam Satu Tempat",
      description: "Tidak perlu membuka banyak aplikasi atau menghitung manual. Semua kebutuhan perencanaan investasi tersedia dalam satu platform."
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToCalendar = () => {
    setCurrentPage('calendar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedFeature('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToFeature = (featureName: string) => {
    if (featureName === "Simulasi Rata-Rata Saham") {
      setCurrentPage('stock-average');
    } else {
      setSelectedFeature(featureName);
      setCurrentPage('under-dev');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'stock-average') {
    return (
      <>
        <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={navigateToHome} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="10" width="3" height="6" rx="1" fill="white"/>
                  <rect x="8.5" y="6" width="3" height="10" rx="1" fill="white"/>
                  <rect x="13" y="8" width="3" height="8" rx="1" fill="white"/>
                </svg>
              </div>
              <span className="text-[20px] font-bold text-[#2A2826]">Stockplan</span>
            </button>
            <nav className="flex items-center gap-8">
              <button
                onClick={navigateToHome}
                className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
              >
                Beranda
              </button>
            </nav>
          </div>
        </header>
        <StockAverageSimulator />
      </>
    );
  }

  if (currentPage === 'under-dev') {
    return (
      <>
        <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={navigateToHome} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="10" width="3" height="6" rx="1" fill="white"/>
                  <rect x="8.5" y="6" width="3" height="10" rx="1" fill="white"/>
                  <rect x="13" y="8" width="3" height="8" rx="1" fill="white"/>
                </svg>
              </div>
              <span className="text-[20px] font-bold text-[#2A2826]">Stockplan</span>
            </button>
          </div>
        </header>
        <UnderDevelopment featureName={selectedFeature} onBack={navigateToHome} />
      </>
    );
  }

  if (currentPage === 'calendar') {
    return (
      <>
        <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={navigateToHome} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="10" width="3" height="6" rx="1" fill="white"/>
                  <rect x="8.5" y="6" width="3" height="10" rx="1" fill="white"/>
                  <rect x="13" y="8" width="3" height="8" rx="1" fill="white"/>
                </svg>
              </div>
              <span className="text-[20px] font-bold text-[#2A2826]">Stockplan</span>
            </button>
            <nav className="flex items-center gap-8">
              <button
                onClick={navigateToHome}
                className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
              >
                Beranda
              </button>
              <button
                onClick={navigateToCalendar}
                className="text-[14px] text-[#F97316] font-bold transition-colors"
              >
                Kalender Saham
              </button>
            </nav>
          </div>
        </header>
        <StockCalendar />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={navigateToHome} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="10" width="3" height="6" rx="1" fill="white"/>
                <rect x="8.5" y="6" width="3" height="10" rx="1" fill="white"/>
                <rect x="13" y="8" width="3" height="8" rx="1" fill="white"/>
              </svg>
            </div>
            <span className="text-[20px] font-bold text-[#2A2826]">Stockplan</span>
          </button>
          <nav className="flex items-center gap-8">
            <button
              onClick={navigateToCalendar}
              className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
            >
              Kalender Saham
            </button>
            <button
              onClick={() => scrollToSection('market-insight')}
              className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
            >
              Market & Insight
            </button>
            <button
              onClick={() => scrollToSection('tools-simulator')}
              className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
            >
              Tools & Simulator
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[14px] text-[#8A8682] hover:text-[#F97316] transition-colors"
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="financial-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 50 L20 40 L30 45 L40 35 L50 40 L60 30 L70 35 L80 25 L90 30" stroke="#F97316" strokeWidth="2" fill="none"/>
                <circle cx="20" cy="40" r="3" fill="#F97316"/>
                <circle cx="40" cy="35" r="3" fill="#F97316"/>
                <circle cx="60" cy="30" r="3" fill="#F97316"/>
                <circle cx="80" cy="25" r="3" fill="#F97316"/>
                <text x="15" y="75" fontSize="12" fill="#2A2826" opacity="0.5">$</text>
                <text x="45" y="75" fontSize="12" fill="#2A2826" opacity="0.5">%</text>
                <text x="75" y="75" fontSize="12" fill="#2A2826" opacity="0.5">↗</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#financial-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-[48px] font-bold text-[#2A2826] mb-4 leading-tight">
            Tools & Insight untuk Investor Saham
          </h1>
          <p className="text-[18px] text-[#8A8682] max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk merencanakan dan mengelola investasi saham dalam satu platform
          </p>
        </div>

        {/* Gradient Transition */}
        <div className="h-24 bg-gradient-to-b from-white to-[#F8F9FA]"></div>
      </section>

      {/* Market & Insight */}
      <section id="market-insight" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[32px] font-bold text-[#2A2826] mb-8">Market & Insight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={() => {
                if (feature.title === "Kalender Saham") {
                  navigateToCalendar();
                } else {
                  navigateToFeature(feature.title);
                }
              }}
              className="bg-white rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group"
            >
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
          ))}
        </div>
      </section>

      {/* Tools & Simulator */}
      <section id="tools-simulator" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[32px] font-bold text-[#2A2826] mb-8">Tools & Simulator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {toolsFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigateToFeature(feature.title)}
              className="bg-white rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group"
            >
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
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-[#2A2826] mb-4 text-center">
            Kenapa Memilih Stockplan?
          </h2>
          <p className="text-[16px] text-[#8A8682] text-center mb-12 max-w-2xl mx-auto">
            Platform all-in-one yang dirancang khusus untuk membantu investor saham Indonesia membuat keputusan yang lebih cerdas
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
          <h2 className="text-[36px] font-bold mb-4 text-[#2A2826]">
            Ada Pertanyaan tentang Stockplan?
          </h2>
          <p className="text-[18px] mb-8 text-[#8A8682] max-w-2xl mx-auto">
            Kami siap membantu Anda memahami fitur dan merencanakan investasi dengan lebih mudah.
          </p>
          <a
            href="mailto:contact@stockplan.id"
            className="bg-[#F97316] text-white px-8 py-3 rounded-xl font-bold text-[16px] hover:bg-[#EA580C] transition-colors inline-block"
          >
            Kirim Pesan
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-[14px] text-[#8A8682]">
            © 2026 Stockplan. Platform analisis dan tools investasi saham.
          </p>
        </div>
      </footer>
    </div>
  );
}