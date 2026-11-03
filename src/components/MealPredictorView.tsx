import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  BookmarkPlus,
  Play,
  RotateCcw,
  Utensils,
  Plus,
  CookingPot,
  Calendar,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { Recipe, PantryItem, MealPlanItem } from '../types';

interface MealPredictorViewProps {
  recipes: Recipe[];
  pantryItems: PantryItem[];
  selectedRecipe: Recipe | null;
  onSelectRecipe: (recipe: Recipe) => void;
  onCloseRecipeModal: () => void;
  onCookRecipe: (recipe: Recipe) => void;
  onAddToMealPlan: (recipe: Recipe, day: MealPlanItem['day'], mealTime: MealPlanItem['mealTime']) => void;
  onNavigateToMealPlanner: () => void;
}

export const MealPredictorView: React.FC<MealPredictorViewProps> = ({
  recipes,
  pantryItems,
  selectedRecipe,
  onSelectRecipe,
  onCloseRecipeModal,
  onCookRecipe,
  onAddToMealPlan,
  onNavigateToMealPlanner,
}) => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(selectedRecipe || recipes[0]);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showPlanDialog, setShowPlanDialog] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<MealPlanItem['day']>('Senin');
  const [selectedMealTime, setSelectedMealTime] = useState<MealPlanItem['mealTime']>('Makan Siang');

  // Timer interval effect
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = (mins: number) => {
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-[#26372D] font-heading">
              Rekomendasi Cerdas
            </h3>
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="text-[11px] text-[#657D6F]">
            Berdasarkan stok di pantry & preferensi keluarga
          </p>
        </div>

        <button
          onClick={onNavigateToMealPlanner}
          className="text-[11px] bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Calendar className="w-3 h-3" />
          Meal Planner
        </button>
      </div>

      {/* Featured Recipe Hero Card (Matches Image Tumis Bayam Telur) */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md">
        <div className="relative h-44 w-full bg-slate-100">
          <img
            src={activeRecipe.image}
            alt={activeRecipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#236B46] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Prioritas Stok Pantry
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {activeRecipe.durationMinutes} menit
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-400" /> {activeRecipe.portions} porsi
              </span>
            </div>
            <h2 className="text-base font-bold text-[#26372D] font-heading">
              {activeRecipe.title}
            </h2>
            <p className="text-xs text-[#657D6F] mt-1 leading-relaxed">
              {activeRecipe.pantryHighlight}
            </p>
          </div>

          {/* Estimasi Kebutuhan Tambahan (Matches image mockup) */}
          <div className="bg-[#F8FAF9] border border-slate-100 rounded-xl p-3">
            <span className="text-[11px] font-bold text-[#26372D] block mb-1.5">
              Estimasi kebutuhan tambahan:
            </span>
            <div className="space-y-1">
              {activeRecipe.missingIngredients.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#236B46] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelectRecipe(activeRecipe)}
              className="w-full py-2.5 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <CookingPot className="w-4 h-4" />
              Masak Menu Ini
            </button>
            <button
              onClick={() => setShowPlanDialog(true)}
              className="w-full py-2.5 bg-[#E6F3E9] text-[#236B46] font-bold text-xs rounded-xl hover:bg-[#d6ecdc] transition-colors flex items-center justify-center gap-1.5"
            >
              <BookmarkPlus className="w-4 h-4" />
              Simpan ke Jadwal
            </button>
          </div>
        </div>
      </div>

      {/* Alternative Recommendations Horizontal Scroll */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#26372D] font-heading">
            Pilihan Menu Lainnya
          </span>
          <span className="text-[10px] text-slate-400">
            {recipes.length} resep tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {recipes.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setActiveRecipe(rec)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                activeRecipe.id === rec.id
                  ? 'bg-[#E6F3E9]/50 border-[#69B786] shadow-xs'
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <img
                src={rec.image}
                alt={rec.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#26372D] truncate">
                  {rec.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span>⏱ {rec.durationMinutes} mnt</span>
                  <span>•</span>
                  <span>👥 {rec.portions} porsi</span>
                </div>
                <span className="text-[10px] text-[#236B46] font-medium block truncate mt-0.5">
                  ✓ {rec.ingredients.filter((i) => i.isAvailableInPantry).length} bahan di pantry
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Meal Plan Dialog */}
      {showPlanDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">
                Atur Jadwal Konsumsi
              </h3>
              <button
                onClick={() => setShowPlanDialog(false)}
                className="text-slate-400 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Jadwalkan <strong>{activeRecipe.title}</strong> ke dalam Meal Planner mingguan:
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Hari:
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Waktu Makan:
              </label>
              <select
                value={selectedMealTime}
                onChange={(e) => setSelectedMealTime(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Sarapan">Sarapan</option>
                <option value="Makan Siang">Makan Siang</option>
                <option value="Makan Malam">Makan Malam</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onAddToMealPlan(activeRecipe, selectedDay, selectedMealTime);
                  setShowPlanDialog(false);
                }}
                className="w-full py-2.5 bg-[#236B46] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Simpan ke Jadwal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Recipe Detail Modal with Interactive Cooking Steps & Timer */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#236B46] uppercase">
                  Detail Resep & Memasak
                </span>
                <h3 className="text-base font-bold text-[#26372D] font-heading">
                  {selectedRecipe.title}
                </h3>
              </div>
              <button
                onClick={onCloseRecipeModal}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-36 rounded-xl object-cover"
            />

            {/* Quick Timer Pill */}
            <div className="bg-[#E6F3E9] p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#236B46]" />
                <div>
                  <span className="text-[10px] text-[#657D6F] block">Timer Memasak</span>
                  <span className="text-sm font-bold font-mono text-[#236B46]">
                    {timerSeconds > 0 ? formatTimer(timerSeconds) : `${selectedRecipe.durationMinutes}:00`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {!isTimerRunning ? (
                  <button
                    onClick={() => handleStartTimer(selectedRecipe.durationMinutes)}
                    className="px-3 py-1 bg-[#236B46] text-white text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-white" /> Mulai
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bahan-bahan Checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-1.5">
                Bahan & Takaran ({selectedRecipe.portions} Porsi):
              </h4>
              <div className="space-y-1.5">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-slate-700 font-medium">
                      {ing.name} ({ing.amount})
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        ing.isAvailableInPantry
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ing.isAvailableInPantry ? 'Ada di Pantry' : 'Perlu Beli'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Langkah-langkah */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-1.5">
                Langkah-langkah Memasak:
              </h4>
              <div className="space-y-2">
                {selectedRecipe.steps.map((st, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-[#E6F3E9] text-[#236B46] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="flex-1 leading-relaxed">{st}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selesai Masak Action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onCookRecipe(selectedRecipe);
                  onCloseRecipeModal();
                }}
                className="w-full py-3 bg-[#236B46] hover:bg-[#194F33] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Selesai Masak & Perbarui Stok Pantry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
