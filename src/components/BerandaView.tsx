import React from 'react';
import {
  Package,
  Sparkles,
  HeartHandshake,
  Recycle,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Wallet,
  Leaf,
  Clock,
  ChevronRight,
  Utensils,
} from 'lucide-react';
import { PantryItem, Recipe, NavigationTab } from '../types';
import { formatExpiryLabel } from '../utils/helpers';

interface BerandaViewProps {
  pantryItems: PantryItem[];
  recipes: Recipe[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  pantryItems,
  recipes,
  onNavigate,
  onSelectRecipe,
}) => {
  // Find urgent expiring items (<= 5 days)
  const urgentItem = pantryItems.find((item) => {
    const diffDays = Math.ceil(
      (new Date(item.expiryDate).getTime() - new Date('2026-11-03').getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return diffDays >= 0 && diffDays <= 5 && item.status === 'active';
  });

  const featuredRecipe = recipes[0];

  return (
    <div className="px-5 py-3 space-y-4 pb-20">
      {/* 1. Main Summary Impact Card (Green Gradient) */}
      <div className="bg-gradient-to-br from-[#236B46] to-[#1B5738] rounded-2xl p-4 text-white shadow-lg shadow-[#236B46]/15 relative overflow-hidden">
        {/* Subtle background leaf pattern */}
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <Leaf className="w-36 h-36" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#8CD4A6]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-emerald-100 block">
                Food Waste Bulan Ini
              </span>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                -32%
              </span>
            </div>
          </div>

          {/* Mini Bar Chart Graphic */}
          <div className="flex items-end gap-1.5 h-10 px-2 py-1 bg-white/10 rounded-lg backdrop-blur-xs">
            <div className="w-1.5 h-4 bg-emerald-300/40 rounded-full" />
            <div className="w-1.5 h-6 bg-emerald-300/60 rounded-full" />
            <div className="w-1.5 h-8 bg-emerald-300/80 rounded-full" />
            <div className="w-1.5 h-5 bg-emerald-200 rounded-full" />
            <div className="w-1.5 h-3 bg-white rounded-full shadow-xs" />
          </div>
        </div>

        {/* Sub Metrics (Penghematan & Emisi) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-amber-200 shrink-0">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-100 block">Penghematan</span>
              <span className="text-xs font-bold text-white tracking-tight">
                Rp 85.000
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-emerald-200 shrink-0">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-100 block">Emisi CO₂</span>
              <span className="text-xs font-bold text-white tracking-tight">
                -1.2 kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Urgent Shelf-Life Banner (Matches Image Callout) */}
      {urgentItem && (
        <div
          onClick={() => onNavigate('menu')}
          className="bg-[#FFF8E9] border border-[#F7E6C4] rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer hover:bg-[#FFF3D6] transition-colors shadow-xs"
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#26372D]">
                {urgentItem.name} segera kedaluwarsa!
              </span>
              <span className="text-[10px] bg-amber-200/70 text-amber-900 font-bold px-1.5 py-0.5 rounded-md">
                5 hari lagi
              </span>
            </div>
            <p className="text-[11px] text-[#657D6F] mt-0.5 leading-snug">
              Gunakan dalam waktu dekat, ya! Rekomendasi: dibuat Tumis Bayam Telur.
            </p>
            <div className="mt-2 flex items-center text-[11px] font-bold text-[#236B46] hover:underline gap-1">
              Lihat Rekomendasi Menu <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      )}

      {/* 3. Menu Utama (4 Big Feature Tiles) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-[#26372D] font-heading">
            Menu Utama
          </h2>
          <span className="text-[11px] text-[#657D6F]">Ekosistem Pangan</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Smart Pantry */}
          <button
            onClick={() => onNavigate('pantry')}
            className="bg-white border border-slate-100 rounded-2xl p-3.5 flex flex-col items-start text-left shadow-xs hover:border-[#69B786]/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-[#26372D] group-hover:text-[#236B46] transition-colors">
              Smart Pantry
            </span>
            <span className="text-[10px] text-[#657D6F] mt-0.5 line-clamp-1">
              {pantryItems.filter((i) => i.status === 'active').length} bahan aktif
            </span>
          </button>

          {/* AI Meal Predictor */}
          <button
            onClick={() => onNavigate('menu')}
            className="bg-white border border-slate-100 rounded-2xl p-3.5 flex flex-col items-start text-left shadow-xs hover:border-[#69B786]/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-[#26372D] group-hover:text-[#236B46] transition-colors">
              AI Meal Predictor
            </span>
            <span className="text-[10px] text-[#657D6F] mt-0.5 line-clamp-1">
              Rekomendasi pintar
            </span>
          </button>

          {/* Food Rescue */}
          <button
            onClick={() => onNavigate('rescue')}
            className="bg-white border border-slate-100 rounded-2xl p-3.5 flex flex-col items-start text-left shadow-xs hover:border-[#69B786]/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-xs font-bold text-[#26372D] group-hover:text-[#236B46] transition-colors">
              Food Rescue
            </span>
            <span className="text-[10px] text-[#657D6F] mt-0.5 line-clamp-1">
              Salurkan makanan
            </span>
          </button>

          {/* Organic Cycle */}
          <button
            onClick={() => onNavigate('organik')}
            className="bg-white border border-slate-100 rounded-2xl p-3.5 flex flex-col items-start text-left shadow-xs hover:border-[#69B786]/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Recycle className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-[#26372D] group-hover:text-[#236B46] transition-colors">
              Organic Cycle
            </span>
            <span className="text-[10px] text-[#657D6F] mt-0.5 line-clamp-1">
              Olah sisa organik
            </span>
          </button>
        </div>
      </div>

      {/* 4. Rekomendasi Menu Hari Ini (Featured Recipe Card) */}
      {featuredRecipe && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#26372D] font-heading">
              Menu Hari Ini
            </h2>
            <button
              onClick={() => onNavigate('menu')}
              className="text-[11px] font-semibold text-[#236B46] hover:underline flex items-center gap-0.5"
            >
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div
            onClick={() => onSelectRecipe(featuredRecipe)}
            className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3 items-center group"
          >
            <img
              src={featuredRecipe.image}
              alt={featuredRecipe.title}
              className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-102 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
                Prioritas Stok
              </span>
              <h3 className="text-sm font-bold text-[#26372D] truncate font-heading group-hover:text-[#236B46] transition-colors">
                {featuredRecipe.title}
              </h3>
              <p className="text-[11px] text-[#657D6F] line-clamp-1 mt-0.5">
                {featuredRecipe.pantryHighlight}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featuredRecipe.durationMinutes} mnt
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Utensils className="w-3 h-3" /> {featuredRecipe.portions} porsi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Siklus Pangan Cerdas (Smart Food Cycle Info Banner) */}
      <div className="bg-[#E6F3E9] border border-[#69B786]/25 rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-[#236B46] font-heading">
            PANGANOVA Smart Food Cycle
          </span>
          <span className="text-[10px] font-semibold bg-[#236B46] text-white px-2 py-0.5 rounded-full">
            5 Langkah
          </span>
        </div>
        <p className="text-[11px] text-[#26372D] leading-relaxed">
          Satu siklus pengelolaan terpadu: <strong>Plan</strong> (perencanaan) →{' '}
          <strong>Track</strong> (pantau stok) → <strong>Utilize</strong> (resep AI) →{' '}
          <strong>Recirculate</strong> (rescue & organik) → <strong>Measure</strong> (dampak).
        </p>
      </div>
    </div>
  );
};
