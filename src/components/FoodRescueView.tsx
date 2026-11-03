import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Plus,
  CheckCircle,
  AlertTriangle,
  Search,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { FoodRescueListing, VerifiedPartner } from '../types';

interface FoodRescueViewProps {
  listings: FoodRescueListing[];
  partners: VerifiedPartner[];
  onAddListing: (listing: Omit<FoodRescueListing, 'id' | 'status'>) => void;
  onClaimListing: (listingId: string, partnerName: string) => void;
}

export const FoodRescueView: React.FC<FoodRescueViewProps> = ({
  listings,
  partners,
  onAddListing,
  onClaimListing,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSafetyGuide, setShowSafetyGuide] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<VerifiedPartner | null>(null);

  // Form states
  const [foodTitle, setFoodTitle] = useState('');
  const [portions, setPortions] = useState(4);
  const [preparedAt, setPreparedAt] = useState('Hari ini, 10:00 WIB');
  const [storageCond, setStorageCond] = useState<'Suhu Ruang' | 'Dingin (Kulkas)' | 'Beku (Freezer)'>('Suhu Ruang');
  const [pickupLoc, setPickupLoc] = useState('Jl. Kenanga Timur No. 12, Sukamaju');
  const [pickupWindow, setPickupWindow] = useState('Sebelum pukul 18:00 WIB');
  const [safetyChecklist, setSafetyChecklist] = useState({
    smellNormal: true,
    textureGood: true,
    cleanPackaging: true,
    withinHoursLimit: true,
  });

  const allSafetyPassed =
    safetyChecklist.smellNormal &&
    safetyChecklist.textureGood &&
    safetyChecklist.cleanPackaging &&
    safetyChecklist.withinHoursLimit;

  const handleCreateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodTitle.trim() || !allSafetyPassed) return;

    onAddListing({
      title: foodTitle.trim(),
      portions: Number(portions) || 1,
      preparedAt,
      storageCondition: storageCond,
      pickupLocation: pickupLoc,
      pickupTimeWindow: pickupWindow,
      safetyVerified: true,
    });

    setFoodTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* 1. Hero Card (Matching Figma Mockup) */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 text-center shadow-xs space-y-3">
        {/* Cute Illustration Badge */}
        <div className="w-24 h-24 mx-auto rounded-full bg-[#FFF8E9] flex items-center justify-center relative">
          <span className="text-4xl">🍱</span>
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow-xs">
            ❤️
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#26372D] font-heading">
            Food Rescue PANGANOVA
          </h2>
          <p className="text-xs text-[#657D6F] max-w-[280px] mx-auto mt-1 leading-relaxed">
            Bagikan makanan berlebih yang masih layak konsumsi kepada yang membutuhkan.
          </p>
        </div>

        {/* Buttons (Cari Mitra & Jadi Donatur) */}
        <div className="space-y-2 pt-1 max-w-[320px] mx-auto">
          <button
            onClick={() => {
              const el = document.getElementById('mitra-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Cari Mitra Terdekat
          </button>

          <span className="text-[11px] text-slate-400 font-medium block">atau</span>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 bg-white border border-[#236B46] text-[#236B46] font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Jadi Donatur (Bagi Makanan)
          </button>
        </div>
      </div>

      {/* Safety Notice & Quality Assurance */}
      <div className="bg-[#E6F3E9] border border-[#69B786]/30 rounded-2xl p-3.5 flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#236B46] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#236B46]">
              Standar Keamanan Pangan Ketat
            </h4>
            <p className="text-[11px] text-[#26372D] mt-0.5 leading-snug">
              Semua donasi wajib melewati verifikasi kelayakan konsumsi untuk menjaga kesehatan penerima.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSafetyGuide(true)}
          className="text-[10px] text-[#236B46] font-bold underline whitespace-nowrap ml-2"
        >
          Panduan
        </button>
      </div>

      {/* Active Listings in Household */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#26372D] font-heading">
            Daftar Makanan yang Dibagikan
          </h3>
          <span className="text-[10px] text-slate-400">
            {listings.length} donasi
          </span>
        </div>

        <div className="space-y-2">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#26372D]">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 block">
                    {item.portions} porsi • {item.storageCondition}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Tersedia'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Dipesan Mitra'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Ambil: {item.pickupTimeWindow}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{item.pickupLocation}</span>
                </div>
              </div>

              {item.status === 'Tersedia' && (
                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onClaimListing(item.id, 'Komunitas Pangan Berbagi')}
                    className="text-[10px] bg-[#236B46] text-white font-bold px-3 py-1.5 rounded-lg shadow-xs hover:bg-[#194F33]"
                  >
                    Salurkan ke Mitra Terdekat
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Section "Mitra Terpercaya" (Matches Figma screen) */}
      <div id="mitra-section" className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#26372D] font-heading">
            Mitra Terpercaya Sekitar
          </h3>
          <span className="text-[10px] text-[#236B46] font-semibold">
            Terverifikasi Panganova
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {partners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="bg-white border border-slate-100 rounded-2xl p-3 text-left shadow-xs hover:border-[#69B786] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl block mb-1">{partner.icon}</span>
                <h4 className="text-xs font-bold text-[#26372D] line-clamp-1">
                  {partner.name}
                </h4>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  📍 {partner.distance} • {partner.type}
                </span>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-50 flex items-center justify-between text-[10px]">
                <span className="text-amber-500 font-bold">★ {partner.rating}</span>
                <span className="text-[#236B46] font-semibold">Hubungi →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Donation Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-[#26372D] font-heading">
                  Formulir Berbagi Makanan
                </h3>
                <p className="text-[11px] text-[#657D6F]">
                  Pastikan makanan layak & aman dikonsumsi
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDonation} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nama Makanan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Roti Gandum / Nasi Kotak Bersih"
                  value={foodTitle}
                  onChange={(e) => setFoodTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Jumlah / Porsi
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={portions}
                    onChange={(e) => setPortions(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kondisi Simpan
                  </label>
                  <select
                    value={storageCond}
                    onChange={(e) => setStorageCond(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Suhu Ruang">Suhu Ruang</option>
                    <option value="Dingin (Kulkas)">Dingin (Kulkas)</option>
                    <option value="Beku (Freezer)">Beku (Freezer)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Lokasi Pengambilan
                </label>
                <input
                  type="text"
                  required
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Batas Waktu Pengambilan
                </label>
                <input
                  type="text"
                  required
                  value={pickupWindow}
                  onChange={(e) => setPickupWindow(e.target.value)}
                  placeholder="Contoh: Sebelum jam 18:00 WIB"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Mandatory Food Safety Checklist */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 space-y-2">
                <span className="text-[11px] font-bold text-amber-900 block">
                  Pemeriksaan Kelayakan Pangan (Wajib Diceklis):
                </span>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.smellNormal}
                    onChange={(e) =>
                      setSafetyChecklist({
                        ...safetyChecklist,
                        smellNormal: e.target.checked,
                      })
                    }
                    className="rounded text-[#236B46]"
                  />
                  <span>Aroma makanan segar dan normal (tidak bau asam/tengik)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.textureGood}
                    onChange={(e) =>
                      setSafetyChecklist({
                        ...safetyChecklist,
                        textureGood: e.target.checked,
                      })
                    }
                    className="rounded text-[#236B46]"
                  />
                  <span>Tekstur makanan baik, tidak berlendir atau berjamur</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.cleanPackaging}
                    onChange={(e) =>
                      setSafetyChecklist({
                        ...safetyChecklist,
                        cleanPackaging: e.target.checked,
                      })
                    }
                    className="rounded text-[#236B46]"
                  />
                  <span>Dikemas dalam wadah bersih dan tertutup rapat</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.withinHoursLimit}
                    onChange={(e) =>
                      setSafetyChecklist({
                        ...safetyChecklist,
                        withinHoursLimit: e.target.checked,
                      })
                    }
                    className="rounded text-[#236B46]"
                  />
                  <span>Makanan belum kedaluwarsa & disimpan sesuai kaidah suhu</span>
                </label>
              </div>

              {!allSafetyPassed && (
                <p className="text-[11px] text-rose-600 font-medium">
                  ⚠️ Seluruh syarat kelayakan harus dicentang untuk mempublikasikan donasi.
                </p>
              )}

              <button
                type="submit"
                disabled={!allSafetyPassed}
                className="w-full py-3 bg-[#236B46] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Kirim Penawaran ke Ekosistem Rescue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Safety Guide Modal */}
      {showSafetyGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[380px] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">
                Panduan Keamanan Pangan
              </h3>
              <button
                onClick={() => setShowSafetyGuide(false)}
                className="text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              PANGANOVA berkomitmen melindungi penerima makanan. Makanan sisa yang
              tidak memenuhi syarat keamanan <strong>TIDAK BOLEH</strong> didonasikan,
              melainkan diarahkan ke <strong>Organic Cycle</strong> (kompos/biopori).
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>Makanan berkuah/santan tidak boleh lewat 4 jam di suhu ruang.</li>
              <li>Pastikan wadah baru atau food-grade steril.</li>
              <li>Jangan gabungkan bahan mentah dengan masakan matang.</li>
            </ul>
            <button
              onClick={() => setShowSafetyGuide(false)}
              className="w-full py-2 bg-[#236B46] text-white text-xs font-bold rounded-xl mt-2"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Partner Detail Dialog */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedPartner.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {selectedPartner.name}
                </h3>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  ✓ Mitra Resmi Terverifikasi
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
              <p>📍 {selectedPartner.address} ({selectedPartner.distance})</p>
              <p>📞 {selectedPartner.phone}</p>
              <p>Status: {selectedPartner.capacityStatus}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Menghubungi ${selectedPartner.name} di ${selectedPartner.phone}`);
                  setSelectedPartner(null);
                }}
                className="flex-1 py-2.5 bg-[#236B46] text-white text-xs font-bold rounded-xl"
              >
                Telepon Mitra
              </button>
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
