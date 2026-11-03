import React, { useState } from 'react';
import { X, Calendar, Plus, Sparkles } from 'lucide-react';
import { FoodCategory, PantryItem, StorageLocation } from '../types';

interface AddPantryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<PantryItem, 'id' | 'status'>) => void;
}

export const AddPantryModal: React.FC<AddPantryModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Sayuran');
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState('ikat');
  const [purchaseDate, setPurchaseDate] = useState('2026-11-03');
  const [expiryDate, setExpiryDate] = useState('2026-11-10');
  const [storageLocation, setStorageLocation] = useState<StorageLocation>('Kulkas');
  const [priceEst, setPriceEst] = useState<number>(8000);
  const [icon, setIcon] = useState('🥬');

  if (!isOpen) return null;

  const quickPresets = [
    { name: 'Bayam', cat: 'Sayuran' as FoodCategory, unit: 'ikat', days: 5, icon: '🥬', price: 5000 },
    { name: 'Telur Ayam', cat: 'Protein' as FoodCategory, unit: 'butir', days: 14, icon: '🥚', price: 28000 },
    { name: 'Tomat Segar', cat: 'Sayuran' as FoodCategory, unit: 'gr', days: 7, icon: '🍅', price: 8000 },
    { name: 'Tempe Kedelai', cat: 'Protein' as FoodCategory, unit: 'papan', days: 3, icon: '🧊', price: 6000 },
    { name: 'Susu UHT', cat: 'Minuman' as FoodCategory, unit: 'pcs', days: 20, icon: '🥛', price: 19000 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setName(preset.name);
    setCategory(preset.cat);
    setUnit(preset.unit);
    setIcon(preset.icon);
    setPriceEst(preset.price);

    // Calculate expiry date
    const d = new Date(purchaseDate);
    d.setDate(d.getDate() + preset.days);
    setExpiryDate(d.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      category,
      quantity: Number(quantity) || 1,
      unit,
      purchaseDate,
      expiryDate,
      storageLocation,
      priceEst: Number(priceEst) || 5000,
      icon,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-[#26372D] font-heading">
              Tambah Stok Bahan
            </h3>
            <p className="text-[11px] text-[#657D6F]">
              Catat bahan makanan agar masa simpan terpantau
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Pilih Cepat / Inspirasi:
          </label>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {quickPresets.map((p) => (
              <button
                type="button"
                key={p.name}
                onClick={() => applyPreset(p)}
                className="text-[11px] bg-slate-50 hover:bg-[#E6F3E9] hover:text-[#236B46] border border-slate-200 rounded-lg px-2.5 py-1 whitespace-nowrap flex items-center gap-1 transition-colors"
              >
                <span>{p.icon}</span> {p.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nama Bahan & Icon */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nama Bahan
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bayam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ikon
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full text-center text-base py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FoodCategory)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
            >
              <option value="Sayuran">Sayuran</option>
              <option value="Protein">Protein (Telur/Ayam/Daging/Tahu/Tempe)</option>
              <option value="Buah">Buah-buahan</option>
              <option value="Minuman">Minuman & Susu</option>
              <option value="Bumbu">Bumbu Dapur</option>
              <option value="Karbohidrat">Karbohidrat & Roti</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Jumlah & Satuan */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Jumlah
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Satuan
              </label>
              <input
                type="text"
                required
                placeholder="ikat, pcs, gr, kg, butir"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
          </div>

          {/* Tanggal Beli & Batas Penggunaan */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tanggal Beli
              </label>
              <input
                type="date"
                required
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Batas Penggunaan
              </label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
              />
            </div>
          </div>

          {/* Lokasi Simpan */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Lokasi Simpan
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Kulkas', 'Freezer', 'Lemari Kering'] as StorageLocation[]).map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setStorageLocation(loc)}
                  className={`py-2 text-[11px] rounded-xl font-medium border transition-colors ${
                    storageLocation === loc
                      ? 'bg-[#E6F3E9] text-[#236B46] border-[#69B786] font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Estimasi Harga */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Estimasi Harga Beli (Rp)
            </label>
            <input
              type="number"
              value={priceEst}
              onChange={(e) => setPriceEst(Number(e.target.value))}
              placeholder="Contoh: 10000"
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Simpan ke Smart Pantry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
