import React from 'react';
import { Calendar, Plus, Trash2, Utensils, Check, ArrowLeft } from 'lucide-react';
import { MealPlanItem, Recipe } from '../types';

interface MealPlannerViewProps {
  mealPlan: MealPlanItem[];
  recipes: Recipe[];
  onRemoveItem: (id: string) => void;
  onBack: () => void;
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({
  mealPlan,
  recipes,
  onRemoveItem,
  onBack,
}) => {
  const days: MealPlanItem['day'][] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];

  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* Top Banner */}
      <div className="bg-[#E6F3E9] border border-[#69B786]/30 rounded-2xl p-3.5">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-4 h-4 text-[#236B46]" />
          <h3 className="text-xs font-bold text-[#236B46] font-heading">
            Rencana Menu Mingguan
          </h3>
        </div>
        <p className="text-[11px] text-[#26372D] leading-relaxed">
          Penyusunan menu berbasis stok bahan yang sudah ada di rumah untuk mencegah
          pembelian berulang dan pembusukan bahan.
        </p>
      </div>

      {/* Days list */}
      <div className="space-y-3">
        {days.map((day) => {
          const plansForDay = mealPlan.filter((m) => m.day === day);

          return (
            <div
              key={day}
              className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-[#26372D] font-heading">
                  {day}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                  {plansForDay.length} menu terencana
                </span>
              </div>

              {plansForDay.length === 0 ? (
                <div className="text-center py-2 text-[11px] text-slate-400 italic">
                  Belum ada menu dijadwalkan
                </div>
              ) : (
                <div className="space-y-2">
                  {plansForDay.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#E6F3E9] text-[#236B46] flex items-center justify-center">
                          <Utensils className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#26372D] block">
                            {p.recipeTitle}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {p.mealTime} • {p.portions} porsi
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(p.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Hapus dari jadwal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
