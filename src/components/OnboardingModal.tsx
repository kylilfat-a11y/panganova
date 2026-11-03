import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Utensils, Heart, Shield, Users, ShoppingBag } from 'lucide-react';
import { UserProfile, FoodCategory } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onFinish: (profile: Partial<UserProfile>) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onFinish,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [familyMembers, setFamilyMembers] = useState(3);
  const [shoppingFreq, setShoppingFreq] = useState('1x seminggu');
  const [wasteTendency, setWasteTendency] = useState('Kadang-kadang');
  const [weeklyBudget, setWeeklyBudget] = useState(450000);
  const [selectedCats, setSelectedCats] = useState<FoodCategory[]>([
    'Sayuran',
    'Protein',
    'Buah',
  ]);

  if (!isOpen) return null;

  const toggleCategory = (cat: FoodCategory) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleComplete = () => {
    onFinish({
      familyMembers,
      shoppingFrequency: shoppingFreq,
      foodWasteTendency: wasteTendency,
      weeklyBudget,
      favoriteCategories: selectedCats,
      hasCompletedOnboarding: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col justify-between p-6 overflow-y-auto no-scrollbar animate-in fade-in">
      {/* Step 1: Welcome Screen (Matches Figma Frame 01) */}
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-[340px] mx-auto my-auto">
          {/* Brand Logo & Mark */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-[#E6F3E9] text-[#236B46] flex items-center justify-center mx-auto shadow-sm border border-[#69B786]/30">
              <span className="text-3xl">🏡</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#236B46] tracking-tight font-heading">
                PANGANOVA
              </h1>
              <p className="text-xs font-semibold text-[#657D6F] tracking-wide">
                Kelola Pangan, Selamatkan Bumi
              </p>
            </div>
          </div>

          {/* Graphic Illustration Container */}
          <div className="w-48 h-48 rounded-full bg-[#FFF8E9] flex items-center justify-center relative shadow-inner">
            <div className="text-6xl animate-bounce">🥗</div>
            <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-2xl shadow-md border border-slate-100 text-2xl">
              🌱
            </div>
          </div>

          {/* Lead Copy */}
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#26372D]">
              Rumah Tangga Lebih Berkelanjutan
            </h2>
            <p className="text-xs text-[#657D6F] leading-relaxed">
              Cegah pemborosan makanan, pantau masa simpan bahan pangan, dan dapatkan
              resep pintar berbasis stok di dapurmu.
            </p>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-6 h-2 bg-[#236B46] rounded-full" />
            <div className="w-2 h-2 bg-slate-200 rounded-full" />
            <div className="w-2 h-2 bg-slate-200 rounded-full" />
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2.5 pt-2">
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#236B46]/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              Mulai Sekarang <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleComplete}
              className="w-full py-2.5 text-xs text-slate-500 font-semibold hover:text-slate-800"
            >
              Lewati & Masuk Langsung
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Kenali Kebiasaan Pangan (Frame 02) */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-between max-w-[360px] mx-auto w-full my-auto space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
                Langkah 1 dari 2
              </span>
              <h2 className="text-lg font-bold text-[#26372D] font-heading">
                Kenali Kebiasaan Pangan
              </h2>
              <p className="text-xs text-[#657D6F] mt-0.5">
                Bantu Panganova menyesuaikan porsi resep dan rekomendasi belanja.
              </p>
            </div>

            {/* Q1: Anggota Keluarga */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Berapa jumlah anggota keluarga di rumah?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, '4+'].map((num) => (
                  <button
                    type="button"
                    key={String(num)}
                    onClick={() => setFamilyMembers(num === '4+' ? 5 : Number(num))}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      (num === '4+' && familyMembers >= 4) || familyMembers === num
                        ? 'bg-[#E6F3E9] text-[#236B46] border-[#69B786]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {num} Orang
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Seberapa sering berbelanja? */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Seberapa sering berbelanja bahan makanan?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Tiap 2-3 Hari', '1x Seminggu', '2 Minggu Sekali', 'Tak Tentu'].map((freq) => (
                  <button
                    type="button"
                    key={freq}
                    onClick={() => setShoppingFreq(freq)}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      shoppingFreq === freq
                        ? 'bg-[#E6F3E9] text-[#236B46] border-[#69B786]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Apakah sering menyisakan makanan? */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Apakah makanan sering tersisa atau sayuran layu?
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['Hampir Tidak', 'Kadang-kadang', 'Sering'].map((tend) => (
                  <button
                    type="button"
                    key={tend}
                    onClick={() => setWasteTendency(tend)}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      wasteTendency === tend
                        ? 'bg-[#E6F3E9] text-[#236B46] border-[#69B786]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {tend}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[#236B46] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              Lanjut ke Preferensi <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full py-2 text-xs text-slate-400 font-semibold"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Atur Preferensi (Frame 03) */}
      {step === 3 && (
        <div className="flex-1 flex flex-col justify-between max-w-[360px] mx-auto w-full my-auto space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
                Langkah 2 dari 2
              </span>
              <h2 className="text-lg font-bold text-[#26372D] font-heading">
                Atur Preferensi Pangan
              </h2>
              <p className="text-xs text-[#657D6F] mt-0.5">
                Fokuskan resep pada bahan yang paling disukai keluargamu.
              </p>
            </div>

            {/* Budget Estimasi */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Perkiraan Anggaran Belanja Mingguan
              </label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Rp</span>
                <input
                  type="number"
                  step="50000"
                  value={weeklyBudget}
                  onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                  className="w-36 text-right font-bold text-xs bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Preferensi Bahan Pangan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Bahan yang paling sering dibeli:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    'Sayuran',
                    'Protein',
                    'Buah',
                    'Minuman',
                    'Karbohidrat',
                    'Bumbu',
                  ] as FoodCategory[]
                ).map((cat) => {
                  const isChecked = selectedCats.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-2.5 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#E6F3E9] text-[#236B46] border-[#69B786]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>{cat}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#236B46]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pengingat Otomatis Banner */}
            <div className="bg-[#FFF8E9] border border-[#F7E6C4] p-3 rounded-xl flex items-center gap-2.5">
              <span className="text-xl">🔔</span>
              <div className="text-[11px] text-slate-700">
                <strong>Pengingat Kadaluwarsa Aktif:</strong> Panganova akan mengingatkan 5 hari sebelum bahan kedaluwarsa.
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={handleComplete}
              className="w-full py-3 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#236B46]/20 transition-all flex items-center justify-center gap-2"
            >
              Simpan Preferensi & Mulai
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full py-2 text-xs text-slate-400 font-semibold"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
