import React, { useState } from 'react';
import {
  Recycle,
  Sprout,
  Plus,
  Scale,
  CheckCircle2,
  BookOpen,
  TrendingDown,
  Info,
} from 'lucide-react';
import { OrganicCycleEntry } from '../types';
import { calculateCO2FromFood, formatDateIndo } from '../utils/helpers';

interface OrganicCycleViewProps {
  logs: OrganicCycleEntry[];
  onAddLog: (entry: Omit<OrganicCycleEntry, 'id' | 'co2SavedKg'>) => void;
}

export const OrganicCycleView: React.FC<OrganicCycleViewProps> = ({
  logs,
  onAddLog,
}) => {
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  // Form states
  const [weight, setWeight] = useState(0.8);
  const [wasteType, setWasteType] = useState<OrganicCycleEntry['type']>('Sisa Sayuran');
  const [method, setMethod] = useState<OrganicCycleEntry['method']>('Kompos Rumah Tangga');
  const [notes, setNotes] = useState('');

  const totalOrganicWeight = logs.reduce((acc, curr) => acc + curr.weightKg, 0);
  const totalCo2Saved = logs.reduce((acc, curr) => acc + curr.co2SavedKg, 0);

  const guides = [
    {
      title: 'Kompos Takakura / Ember',
      desc: 'Cocok untuk rumah minimalis tanpa pekarangan luas.',
      steps: [
        'Cacah sisa sayur & buah menjadi ukuran kecil (1-2 cm).',
        'Campurkan bahan cokelat (daun kering, sekam, atau serbuk gergaji) dengan perbandingan 1:1.',
        'Aduk setiap 2 hari sekali agar sirkulasi udara aerobik lancar.',
        'Kompos siap panen dalam 3-4 minggu dengan aroma seperti tanah hutan.',
      ],
      suitable: 'Sisa sayur, kulit buah, ampas teh & kopi',
      avoid: 'Daging berlemak, susu, tulang besar',
    },
    {
      title: 'Lubang Biopori Halaman',
      desc: 'Menyuburkan tanah sekaligus resapan air hujan.',
      steps: [
        'Buat lubang silinder vertikal sedalam 80-100 cm dengan bor biopori.',
        'Masukkan sampah organik secara berkala hingga padat.',
        'Tutup pipa biopori dengan penutup berlubang.',
        'Sampah akan lapuk menjadi humus alami dalam 2-3 bulan.',
      ],
      suitable: 'Dedaunan, sisa sayuran, kulit buah',
      avoid: 'Plastik, bahan anorganik',
    },
    {
      title: 'Biokonversi Maggot BSF',
      desc: 'Pengurai tercepat untuk sisa makanan tinggi protein.',
      steps: [
        'Larva Black Soldier Fly mampu menghabiskan sampah organik dalam hitungan jam.',
        'Hasil kasgot (kotoran maggot) adalah pupuk organik terbaik.',
        'Maggot dewasa dapat dipanen menjadi pakan ayam atau ikan berprotein tinggi.',
      ],
      suitable: 'Semua jenis sisa makanan matang & basah',
      avoid: 'Bahan kimia, deterjen',
    },
  ];

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight <= 0) return;

    onAddLog({
      date: new Date('2026-11-03').toISOString().split('T')[0],
      weightKg: Number(weight),
      type: wasteType,
      method,
      notes: notes.trim() || undefined,
    });

    setShowAddLogModal(false);
    setNotes('');
  };

  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">
                Organic Cycle
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                Olah Sisa Organik
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAddLogModal(true)}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Catat
          </button>
        </div>

        <p className="text-xs text-emerald-100 leading-snug">
          Makanan yang tidak layak konsumsi tidak harus berakhir di TPA. Alihkan
          menjadi kompos kaya nutrisi!
        </p>

        {/* Total stats */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/20">
          <div>
            <span className="text-[10px] text-emerald-200 block">Total Dialihkan</span>
            <span className="text-sm font-bold text-white">
              {totalOrganicWeight.toFixed(1)} kg sisa organik
            </span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block">Emisi Dihindari</span>
            <span className="text-sm font-bold text-emerald-300">
              {totalCo2Saved.toFixed(1)} kg CO₂e
            </span>
          </div>
        </div>
      </div>

      {/* 2. Metode Pengolahan Panduan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#26372D] font-heading">
            Pilihan Metode Pengolahan Rumah
          </h4>
          <span className="text-[10px] text-slate-400">Panduan praktis</span>
        </div>

        <div className="space-y-2">
          {guides.map((g) => (
            <div
              key={g.title}
              onClick={() => setSelectedGuide(selectedGuide === g.title ? null : g.title)}
              className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs cursor-pointer hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#26372D]">{g.title}</h5>
                    <p className="text-[10px] text-slate-500">{g.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  {selectedGuide === g.title ? '▲' : '▼'}
                </span>
              </div>

              {selectedGuide === g.title && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2 animate-in fade-in">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-700 block">
                      Langkah Pembuatan:
                    </span>
                    {g.steps.map((s, idx) => (
                      <p key={idx} className="text-[11px] text-slate-600 pl-2">
                        {idx + 1}. {s}
                      </p>
                    ))}
                  </div>
                  <div className="text-[10px] bg-slate-50 p-2 rounded-lg text-slate-600">
                    <p>✓ <strong>Bahan cocok:</strong> {g.suitable}</p>
                    <p className="text-rose-600 mt-0.5">✕ <strong>Hindari:</strong> {g.avoid}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Riwayat Pencatatan Sampah Organik */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#26372D] font-heading">
          Riwayat Pengolahan Sampah Organik
        </h4>

        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  🌱
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#26372D]">
                    {log.type} ({log.weightKg} kg)
                  </h5>
                  <p className="text-[10px] text-slate-500">
                    {log.method} • {formatDateIndo(log.date)}
                  </p>
                  {log.notes && (
                    <span className="text-[10px] text-slate-400 italic block">
                      "{log.notes}"
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-700 block">
                  +{log.co2SavedKg} kg
                </span>
                <span className="text-[9px] text-slate-400">CO₂e dicegah</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Organic Waste Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[400px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">
                Catat Pengolahan Sampah Organik
              </h3>
              <button
                onClick={() => setShowAddLogModal(false)}
                className="text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Perkiraan Berat (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  required
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Jenis Sisa Organik
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Sisa Sayuran">Sisa Sayuran (batang, daun layu)</option>
                  <option value="Kulit Buah">Kulit Buah (pisang, semangka, apel)</option>
                  <option value="Ampas Kopi & Teh">Ampas Kopi & Teh</option>
                  <option value="Sisa Makanan Matang">Sisa Makanan Matang</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Metode Pengolahan
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Kompos Rumah Tangga">Kompos Rumah Tangga (Takakura/Ember)</option>
                  <option value="Lubang Biopori">Lubang Biopori Halaman</option>
                  <option value="Maggot BSF">Biokonversi Maggot BSF</option>
                  <option value="Setor Mitra Organik">Setor ke Mitra Bank Sampah / Kompos</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kulit wortel dan ampas kopi"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#236B46] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Simpan Catatan Organik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
