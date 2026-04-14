import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

interface Broker {
  name: string;
  buyFee: number;
  sellFee: number;
}

export function StockAverageSimulator() {
  const brokers: Broker[] = [
    { name: 'Stockbit', buyFee: 0.15, sellFee: 0.25 },
    { name: 'Mirae Asset Sekuritas Indonesia', buyFee: 0.18, sellFee: 0.28 },
    { name: 'Mandiri Sekuritas', buyFee: 0.17, sellFee: 0.27 },
    { name: 'Ajaib Sekuritas Asia', buyFee: 0.15, sellFee: 0.25 },
    { name: 'KB Valbury Sekuritas', buyFee: 0.19, sellFee: 0.29 }
  ];

  const [selectedBroker, setSelectedBroker] = useState<Broker>(brokers[0]);
  const [currentAverage, setCurrentAverage] = useState<string>('');
  const [currentLots, setCurrentLots] = useState<string>('');
  const [simulationType, setSimulationType] = useState<'buy' | 'target'>('buy');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [buyLots, setBuyLots] = useState<string>('');
  const [targetAverage, setTargetAverage] = useState<string>('');
  const [result, setResult] = useState<{
    lotsNeeded: number;
    totalCost: number;
    newAverage: number;
  } | null>(null);

  const handleBrokerChange = (brokerName: string) => {
    const broker = brokers.find(b => b.name === brokerName);
    if (broker) {
      setSelectedBroker(broker);
    }
  };

  const calculateSimulation = () => {
    const avgPrice = parseFloat(currentAverage);
    const lots = parseFloat(currentLots);

    if (!avgPrice || !lots) {
      alert('Mohon isi posisi saat ini terlebih dahulu');
      return;
    }

    const currentShares = lots * 100;
    const currentValue = avgPrice * currentShares;

    if (simulationType === 'buy') {
      const price = parseFloat(buyPrice);
      const newLots = parseFloat(buyLots);

      if (!price || !newLots) {
        alert('Mohon isi harga beli dan jumlah lot');
        return;
      }

      const newShares = newLots * 100;
      const newValue = price * newShares;
      const feeAmount = (newValue * selectedBroker.buyFee) / 100;
      const totalCost = newValue + feeAmount;

      const totalShares = currentShares + newShares;
      const totalValue = currentValue + newValue;
      const newAvg = totalValue / totalShares;

      setResult({
        lotsNeeded: newLots,
        totalCost: totalCost,
        newAverage: newAvg
      });
    } else {
      const targetAvg = parseFloat(targetAverage);

      if (!targetAvg) {
        alert('Mohon isi target average');
        return;
      }

      if (targetAvg >= avgPrice) {
        alert('Target average harus lebih rendah dari average saat ini');
        return;
      }

      // Formula: (currentValue + newValue) / (currentShares + newShares) = targetAvg
      // newValue = newShares * buyPrice
      // Assume buyPrice = targetAvg (simplified)
      const assumedBuyPrice = targetAvg * 0.95; // Buy 5% below target
      const newShares = (targetAvg * currentShares - currentValue) / (assumedBuyPrice - targetAvg);

      if (newShares <= 0) {
        alert('Target average tidak dapat dicapai dengan membeli saham');
        return;
      }

      const newLots = Math.ceil(newShares / 100);
      const actualNewShares = newLots * 100;
      const newValue = assumedBuyPrice * actualNewShares;
      const feeAmount = (newValue * selectedBroker.buyFee) / 100;
      const totalCost = newValue + feeAmount;

      const totalShares = currentShares + actualNewShares;
      const totalValue = currentValue + newValue;
      const actualNewAvg = totalValue / totalShares;

      setResult({
        lotsNeeded: newLots,
        totalCost: totalCost,
        newAverage: actualNewAvg
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[rgba(249,115,22,0.1)] rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#F97316]" />
            </div>
            <h1 className="text-[36px] font-bold text-[#2A2826]">Simulasi Rata-Rata Saham</h1>
          </div>
          <p className="text-[16px] text-[#8A8682]">
            Hitung bagaimana harga rata-rata berubah saat Anda membeli saham secara bertahap di harga yang berbeda
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Section 1 - Broker Selection */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <h2 className="text-[20px] font-bold text-[#2A2826] mb-4">1. Pilih Broker</h2>

          <select
            value={selectedBroker.name}
            onChange={(e) => handleBrokerChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors mb-4"
          >
            {brokers.map((broker) => (
              <option key={broker.name} value={broker.name}>
                {broker.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-[#8A8682]" />
                <p className="text-[12px] text-[#8A8682]">Fee Beli</p>
              </div>
              <p className="text-[24px] font-bold text-[#2A2826]">{selectedBroker.buyFee}%</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-[#8A8682]" />
                <p className="text-[12px] text-[#8A8682]">Fee Jual</p>
              </div>
              <p className="text-[24px] font-bold text-[#2A2826]">{selectedBroker.sellFee}%</p>
            </div>
          </div>
        </div>

        {/* Section 2 - Current Position */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <h2 className="text-[20px] font-bold text-[#2A2826] mb-4">2. Posisi Saat Ini</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-bold text-[#2A2826] mb-2">
                Average Saat Ini
              </label>
              <input
                type="number"
                placeholder="Contoh: 945"
                value={currentAverage}
                onChange={(e) => setCurrentAverage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#2A2826] mb-2">
                Jumlah Lot Saat Ini
              </label>
              <input
                type="number"
                placeholder="Contoh: 10"
                value={currentLots}
                onChange={(e) => setCurrentLots(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3 - Simulation Type */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <h2 className="text-[20px] font-bold text-[#2A2826] mb-4">3. Pilih Simulasi</h2>

          <div className="space-y-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-[#E5E7EB] hover:border-[#F97316] transition-colors">
              <input
                type="radio"
                name="simulationType"
                checked={simulationType === 'buy'}
                onChange={() => setSimulationType('buy')}
                className="mt-1 w-5 h-5 text-[#F97316] accent-[#F97316]"
              />
              <div className="flex-1">
                <span className="text-[14px] font-bold text-[#2A2826]">
                  Beli saham baru (hitung average baru)
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-[#E5E7EB] hover:border-[#F97316] transition-colors">
              <input
                type="radio"
                name="simulationType"
                checked={simulationType === 'target'}
                onChange={() => setSimulationType('target')}
                className="mt-1 w-5 h-5 text-[#F97316] accent-[#F97316]"
              />
              <div className="flex-1">
                <span className="text-[14px] font-bold text-[#2A2826]">
                  Target turunkan average ke harga tertentu
                </span>
              </div>
            </label>
          </div>

          {simulationType === 'buy' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-[#2A2826] mb-2">
                  Harga Beli
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 900"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-bold text-[#2A2826] mb-2">
                  Jumlah Lot Dibeli
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 5"
                  value={buyLots}
                  onChange={(e) => setBuyLots(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[14px] font-bold text-[#2A2826] mb-2">
                Target Average
              </label>
              <input
                type="number"
                placeholder="Contoh: 900"
                value={targetAverage}
                onChange={(e) => setTargetAverage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#2A2826] text-[14px] focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Section 4 - Result */}
        {result && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#8A8682] uppercase tracking-wide mb-1">Plan Avg Down</p>
                <p className="text-[16px] font-bold text-[#2A2826]">{selectedBroker.name}</p>
              </div>
              <p className="text-[12px] text-[#8A8682]">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            {/* Main Result Card - Blue */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white shadow-xl">
              <p className="text-[12px] opacity-90 mb-2 uppercase tracking-wide">Average Baru</p>
              <div className="flex items-end gap-3 mb-2">
                <p className="text-[48px] font-bold leading-none">
                  Rp {Math.round(result.newAverage).toLocaleString('id-ID')}
                </p>
                {currentAverage && (
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg mb-2">
                    <p className="text-[16px] font-bold">
                      {((result.newAverage - parseFloat(currentAverage)) / parseFloat(currentAverage) * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
              <p className="text-[14px] opacity-80 mb-6">
                Total: {(parseFloat(currentLots) + result.lotsNeeded).toFixed(2)} Lot ({((parseFloat(currentLots) + result.lotsNeeded) * 100).toLocaleString('id-ID')} Lbr)
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-[11px] opacity-80 mb-1 uppercase">Total Modal Net</p>
                  <p className="text-[18px] font-bold">
                    Rp {((parseFloat(currentAverage) * parseFloat(currentLots) * 100) + result.totalCost).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] opacity-80 mb-1 uppercase">BEP (Break Even)</p>
                  <p className="text-[18px] font-bold">
                    Rp {Math.round(result.newAverage * 1.003).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
              <h3 className="text-[12px] text-[#8A8682] uppercase tracking-wide mb-4">Rincian Transaksi Baru</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#2A2826]">Modal Pembelian</p>
                  <p className="text-[16px] font-bold text-[#2A2826]">
                    Rp {(result.totalCost - (result.totalCost * selectedBroker.buyFee / (100 + selectedBroker.buyFee))).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#2A2826]">Fee Broker</p>
                  <p className="text-[14px] font-bold text-[#EF4444]">
                    -Rp {(result.totalCost * selectedBroker.buyFee / (100 + selectedBroker.buyFee)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <p className="text-[16px] font-bold text-[#2A2826]">Total Keluar</p>
                  <p className="text-[20px] font-bold text-[#2563EB]">
                    Rp {result.totalCost.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Section 5 - Action Button */}
        <div className="flex justify-center">
          <button
            onClick={calculateSimulation}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white px-12 py-4 rounded-xl font-bold text-[16px] transition-colors shadow-lg hover:shadow-xl"
          >
            Hitung Simulasi
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-[#F0F9FF] rounded-2xl p-6 border border-[#BAE6FD]">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#0EA5E9] mt-1 shrink-0" />
            <div>
              <h3 className="text-[14px] font-bold text-[#2A2826] mb-2">Catatan Penting</h3>
              <ul className="text-[12px] text-[#8A8682] space-y-1 list-disc list-inside">
                <li>1 lot = 100 saham</li>
                <li>Fee sudah termasuk dalam perhitungan total biaya</li>
                <li>Hasil adalah simulasi dan bisa berbeda dengan kondisi aktual</li>
                <li>Pastikan Anda memahami risiko investasi saham</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
