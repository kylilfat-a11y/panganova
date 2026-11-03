import React, { useState } from 'react';
import {
  TrendingUp,
  Leaf,
  TreePine,
  Lightbulb,
  Wallet,
  Scale,
  Calendar,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';
import { formatRupiah } from '../utils/helpers';

interface WasteTrackerViewProps {
  totalSavings: number;
  totalFoodWasteAvoidedKg: number;
  totalOrganicCompostedKg: number;
}

export const WasteTrackerView: React.FC<WasteTrackerViewProps> = ({
  totalSavings = 85000,
  totalFoodWasteAvoidedKg = 1.8,
  totalOrganicCompostedKg = 2.5,
}) => {
  const [timeframe, setTimeframe] = useState<'Minggu' | 'Bulan' | 'Tahun'>('Minggu');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(4); // default Jum

  // Weekly bar chart data matching Figma screen
  const weeklyData = [
    { day: 'Sen', savedKg: 0.2, barPercent: 35 },
    { day: 'Sel', savedKg: 0.3, barPercent: 50 },
    { day: 'Rab', savedKg: 0.15, barPercent: 25 },
    { day: 'Kam', savedKg: 0.4, barPercent: 65 },
    { day: 'Jum', savedKg: 0.55, barPercent: 90 },
    { day: 'Sab', savedKg: 0.3, barPercent: 50 },
    { day: 'Min', savedKg: 0.2, barPercent: 35 },
  ];

  const co2AvoidedTotal = Number(
    ((totalFoodWasteAvoidedKg + totalOrganicCompostedKg) * 1.9).toFixed(1)
  );

  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* 1. Timeframe Switcher (Minggu | Bulan | Tahun) */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl">
        {(['Minggu', 'Bulan', 'Tahun'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              timeframe === t
                ? 'bg-white text-[#236B46] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 2. Hero Metric Card (Matches Figma Screen) */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-[#E6F3E9] text-[#236B46] flex items-center justify-center mx-auto">
          <Leaf className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs text-[#657D6F] font-medium block">
            Sampah Makanan yang Terselamatkan
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-3xl font-extrabold text-[#236B46] font-heading tracking-tight">
              {timeframe === 'Minggu' ? '1.8 kg' : timeframe === 'Bulan' ? '7.4 kg' : '88.5 kg'}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              ↑ 60%
            </span>
          </div>
        </div>

        {/* 3. Bar Chart Graphic (Sen - Min) */}
        <div className="pt-4 pb-2">
          <div className="h-28 flex items-end justify-between gap-2 px-3 border-b border-slate-100 pb-2">
            {weeklyData.map((d, index) => {
              const isSelected = selectedDayIndex === index;

              return (
                <div
                  key={d.day}
                  onClick={() => setSelectedDayIndex(index)}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <span
                    className={`text-[9px] font-mono transition-opacity ${
                      isSelected ? 'opacity-100 font-bold text-[#236B46]' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {d.savedKg}kg
                  </span>
                  <div className="w-full max-w-[20px] bg-slate-100 rounded-t-lg h-20 flex items-end">
                    <div
                      style={{ height: `${d.barPercent}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        isSelected
                          ? 'bg-[#236B46]'
                          : 'bg-[#69B786] group-hover:bg-[#236B46]'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] mt-1 ${
                      isSelected ? 'font-bold text-[#236B46]' : 'text-slate-400'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[10px] text-slate-400">
          Klik batang untuk melihat detail penghematan harian
        </p>
      </div>

      {/* 4. Equivalent Environmental Impact Card (Tree Icon) */}
      <div className="bg-[#E6F3E9] border border-[#69B786]/30 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-xs text-2xl">
          🌳
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#236B46] uppercase block tracking-wider">
            Dampak Iklim Positif
          </span>
          <p className="text-xs font-bold text-[#26372D] mt-0.5 leading-snug">
            Setara dengan 0.9 kg CO₂ yang berhasil dikurangi minggu ini!
          </p>
          <span className="text-[10px] text-[#657D6F] block mt-0.5">
            Metode: Faktor emisi IPCC ~1.9 kg CO₂e per 1 kg pangan dialihkan
          </span>
        </div>
      </div>

      {/* 5. Personal Encouraging Tip (Matches image) */}
      <div className="bg-[#FFF8E9] border border-[#F7E6C4] rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-[#26372D] block">
            Tips untukmu:
          </span>
          <p className="text-xs text-[#26372D] mt-0.5 leading-relaxed">
            Kamu sudah mengurangi food waste sebesar <strong>60%</strong> minggu ini!
            Terus pertahankan, ya! 👏
          </p>
        </div>
      </div>

      {/* 6. Comprehensive KPI Matrix */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-[#26372D] font-heading">
          Ringkasan Efisiensi Pangan Keluarga
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Penghematan Biaya</span>
            <span className="font-bold text-[#236B46] text-sm">
              {formatRupiah(totalSavings)}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Daur Organik Rumah</span>
            <span className="font-bold text-slate-800 text-sm">
              {totalOrganicCompostedKg.toFixed(1)} kg
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Makanan Diselamatkan</span>
            <span className="font-bold text-slate-800 text-sm">
              {totalFoodWasteAvoidedKg.toFixed(1)} kg
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Total Emisi Dihindari</span>
            <span className="font-bold text-emerald-700 text-sm">
              {co2AvoidedTotal} kg CO₂e
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
