import React, { useState } from 'react';
import {
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  Filter,
  ScanBarcode,
  Package,
  Calendar,
  Layers,
  ChevronRight,
  Trash2,
  Utensils,
  Share2,
} from 'lucide-react';
import { PantryItem, FoodCategory } from '../types';
import { getDaysRemaining, formatExpiryLabel, formatDateIndo } from '../utils/helpers';

interface PantryViewProps {
  items: PantryItem[];
  onAddItem: () => void;
  onOpenBarcodeScan: () => void;
  onUpdateItemStatus: (id: string, status: PantryItem['status']) => void;
  onDeleteItem: (id: string) => void;
  onNavigateToRecipe: (ingredientName: string) => void;
  onOpenDonateModal: (item: PantryItem) => void;
}

export const PantryView: React.FC<PantryViewProps> = ({
  items,
  onAddItem,
  onOpenBarcodeScan,
  onUpdateItemStatus,
  onDeleteItem,
  onNavigateToRecipe,
  onOpenDonateModal,
}) => {
  const [activeTab, setActiveTab] = useState<'stok' | 'pengingat' | 'riwayat'>('stok');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedItemDetail, setSelectedItemDetail] = useState<PantryItem | null>(null);

  const categories = ['Semua', 'Sayuran', 'Protein', 'Buah', 'Minuman', 'Bumbu'];

  // Filter items based on activeTab, search, and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;

    const daysLeft = getDaysRemaining(item.expiryDate);

    if (activeTab === 'stok') {
      return item.status === 'active' && matchesSearch && matchesCategory;
    } else if (activeTab === 'pengingat') {
      return (
        item.status === 'active' &&
        daysLeft <= 5 &&
        matchesSearch &&
        matchesCategory
      );
    } else {
      // Riwayat (consumed, rescued, composted, expired)
      return item.status !== 'active' && matchesSearch && matchesCategory;
    }
  });

  const urgentItem = items.find((i) => {
    const d = getDaysRemaining(i.expiryDate);
    return i.status === 'active' && d >= 0 && d <= 5;
  });

  return (
    <div className="flex-1 flex flex-col px-5 py-2 space-y-3 pb-24">
      {/* 1. Sub Tabs (Stok Saya | Pengingat | Riwayat) */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveTab('stok')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'stok'
              ? 'bg-white text-[#236B46] shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Stok Saya ({items.filter((i) => i.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('pengingat')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all relative ${
            activeTab === 'pengingat'
              ? 'bg-white text-[#236B46] shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Pengingat
          {urgentItem && (
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-1" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('riwayat')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'riwayat'
              ? 'bg-white text-[#236B46] shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Riwayat
        </button>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari bahan makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#236B46] text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={onOpenBarcodeScan}
            className="absolute right-2.5 p-1 text-slate-500 hover:text-[#236B46]"
            title="Pindai Barcode"
          >
            <ScanBarcode className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#236B46] text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Items List */}
      <div className="space-y-2 flex-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl p-6">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">
              Tidak ada bahan ditemukan
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {activeTab === 'stok'
                ? 'Tambah stok baru dengan tombol di bawah atau pindai barcode.'
                : 'Belum ada catatan pada tab ini.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const daysLeft = getDaysRemaining(item.expiryDate);
            const badge = formatExpiryLabel(daysLeft);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItemDetail(item)}
                className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-xs hover:border-[#69B786]/40 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E6F3E9]/60 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {item.icon || '🥦'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#26372D] font-heading">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#657D6F] mt-0.5">
                      {item.quantity} {item.unit} • Exp: {formatDateIndo(item.expiryDate)}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      📍 {item.storageLocation}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${badge.badgeClass}`}
                  >
                    {badge.text}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Urgency Alert Notification at Bottom (Matches image) */}
      {urgentItem && (
        <div className="bg-[#FFF8E9] border border-[#F7E6C4] rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <div className="text-[11px] text-[#26372D]">
              <strong>{urgentItem.name}</strong> akan kedaluwarsa dalam 5 hari!
              <span className="block text-slate-500">Gunakan dalam waktu dekat, ya!</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateToRecipe(urgentItem.name)}
            className="text-[10px] bg-[#236B46] text-white font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xs hover:bg-[#1B5738]"
          >
            Cari Resep
          </button>
        </div>
      )}

      {/* 5. Sticky Action Buttons (+ Tambah Stok & Barcode) */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[420px] mx-auto px-5 pointer-events-none z-20">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onAddItem}
            className="flex-1 bg-[#236B46] hover:bg-[#194F33] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#236B46]/25 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Tambah Stok
          </button>
          <button
            onClick={onOpenBarcodeScan}
            className="bg-white border border-[#236B46]/30 text-[#236B46] p-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
            title="Scan Barcode Kemasan"
          >
            <ScanBarcode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-5">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-1 sm:hidden" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F3E9] flex items-center justify-center text-2xl">
                  {selectedItemDetail.icon || '🥦'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#26372D] font-heading">
                    {selectedItemDetail.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Kategori: {selectedItemDetail.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px]">Jumlah Stok</span>
                <span className="font-bold text-slate-800">
                  {selectedItemDetail.quantity} {selectedItemDetail.unit}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Lokasi Simpan</span>
                <span className="font-bold text-slate-800">
                  {selectedItemDetail.storageLocation}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">Tanggal Beli</span>
                <span className="font-medium text-slate-700">
                  {formatDateIndo(selectedItemDetail.purchaseDate)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">Batas Penggunaan</span>
                <span className="font-bold text-amber-700">
                  {formatDateIndo(selectedItemDetail.expiryDate)} (
                  {getDaysRemaining(selectedItemDetail.expiryDate)} hari)
                </span>
              </div>
            </div>

            {/* Actions for this item */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onNavigateToRecipe(selectedItemDetail.name);
                  setSelectedItemDetail(null);
                }}
                className="w-full py-2.5 bg-[#236B46] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#194F33] transition-colors"
              >
                <Utensils className="w-4 h-4" />
                Cari Rekomendasi Menu AI
              </button>

              <button
                onClick={() => {
                  onUpdateItemStatus(selectedItemDetail.id, 'consumed');
                  setSelectedItemDetail(null);
                }}
                className="w-full py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Tandai Sudah Dikonsumsi Habis
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenDonateModal(selectedItemDetail);
                    setSelectedItemDetail(null);
                  }}
                  className="py-2.5 bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-rose-100 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Salurkan Rescue
                </button>
                <button
                  onClick={() => {
                    onDeleteItem(selectedItemDetail.id);
                    setSelectedItemDetail(null);
                  }}
                  className="py-2.5 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Bahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
