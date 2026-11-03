import React from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { BerandaView } from './BerandaView';
import { PantryView } from './PantryView';
import { MealPredictorView } from './MealPredictorView';
import { MealPlannerView } from './MealPlannerView';
import { FoodRescueView } from './FoodRescueView';
import { OrganicCycleView } from './OrganicCycleView';
import { WasteTrackerView } from './WasteTrackerView';
import { ProfileView } from './ProfileView';
import {
  PantryItem,
  Recipe,
  MealPlanItem,
  FoodRescueListing,
  OrganicCycleEntry,
  UserProfile,
  NavigationTab,
} from '../types';
import { initialPartners } from '../data/initialData';
import { ArrowRight, Check, Sparkles, Clock, Users, CookingPot } from 'lucide-react';

interface AllScreensGalleryProps {
  pantryItems: PantryItem[];
  recipes: Recipe[];
  mealPlan: MealPlanItem[];
  rescueListings: FoodRescueListing[];
  organicLogs: OrganicCycleEntry[];
  profile: UserProfile;
  onSelectScreenForApp: (tab: NavigationTab) => void;
}

export const AllScreensGallery: React.FC<AllScreensGalleryProps> = ({
  pantryItems,
  recipes,
  mealPlan,
  rescueListings,
  organicLogs,
  profile,
  onSelectScreenForApp,
}) => {
  const dummyNoop = () => {};

  return (
    <div className="w-full min-h-screen bg-[#F0F3F6] p-6 lg:p-10 text-slate-800">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <h1 className="text-2xl font-extrabold text-[#236B46] tracking-tight font-heading">
              PANGANOVA — Desain UI/UX Lengkap Seluruh Layar
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi seluruh alur dan 12 layar utama ekosistem pangan keluarga secara utuh & riil.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">12 Layar Terkoneksi</span>
        </div>
      </div>

      {/* Grid of All Screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        
        {/* Frame 01: Onboarding Welcome */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 01
            </span>
            <h3 className="text-xs font-bold text-slate-800">Onboarding: Welcome</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-white rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F3E9] text-[#236B46] flex items-center justify-center mx-auto text-2xl border border-[#69B786]/30">
                🏡
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#236B46] font-heading">PANGANOVA</h2>
                <p className="text-[11px] font-semibold text-[#657D6F]">Kelola Pangan, Selamatkan Bumi</p>
              </div>
              <div className="w-36 h-36 rounded-full bg-[#FFF8E9] flex items-center justify-center text-5xl shadow-inner">
                🥗
              </div>
              <p className="text-xs text-[#26372D] leading-relaxed px-2">
                Mulai perjalanan menuju rumah tangga yang lebih berkelanjutan!
              </p>
              <div className="flex gap-1">
                <div className="w-5 h-1.5 bg-[#236B46] rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full py-3 bg-[#236B46] text-white text-xs font-bold rounded-xl text-center shadow-md">
                Mulai Sekarang →
              </div>
              <div className="w-full py-1 text-center text-xs text-slate-400 font-semibold">
                Masuk
              </div>
            </div>
          </div>
        </div>

        {/* Frame 02: Kenali Kebiasaan */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 02
            </span>
            <h3 className="text-xs font-bold text-slate-800">Kenali Kebiasaan Pangan</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-white rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#236B46]">Langkah 1 dari 2</span>
                <h3 className="text-base font-bold text-slate-800 font-heading">Kebiasaan Pangan</h3>
                <p className="text-[11px] text-slate-500">Sesuaikan porsi & jadwal belanja keluarga.</p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Jumlah Anggota Keluarga:</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                  <div className="p-2 border rounded-xl text-center text-slate-500">1</div>
                  <div className="p-2 border rounded-xl text-center text-slate-500">2</div>
                  <div className="p-2 border border-[#69B786] bg-[#E6F3E9] text-[#236B46] rounded-xl text-center">3 Orang</div>
                  <div className="p-2 border rounded-xl text-center text-slate-500">4+</div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Frekuensi Belanja:</label>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="p-2 border border-[#69B786] bg-[#E6F3E9] text-[#236B46] font-semibold rounded-xl text-center">1x Seminggu</div>
                  <div className="p-2 border rounded-xl text-center text-slate-500">Tiap 2-3 Hari</div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Kecenderungan Sisa Makanan:</label>
                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  <div className="p-2 border rounded-xl text-center text-slate-500">Jarang</div>
                  <div className="p-2 border border-[#69B786] bg-[#E6F3E9] text-[#236B46] font-semibold rounded-xl text-center">Kadang</div>
                  <div className="p-2 border rounded-xl text-center text-slate-500">Sering</div>
                </div>
              </div>
            </div>

            <div className="w-full py-3 bg-[#236B46] text-white text-xs font-bold rounded-xl text-center shadow-md">
              Lanjut ke Preferensi →
            </div>
          </div>
        </div>

        {/* Frame 03: Atur Preferensi */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 03
            </span>
            <h3 className="text-xs font-bold text-slate-800">Atur Preferensi</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-white rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#236B46]">Langkah 2 dari 2</span>
                <h3 className="text-base font-bold text-slate-800 font-heading">Atur Preferensi</h3>
                <p className="text-[11px] text-slate-500">Anggaran belanja dan bahan favorit.</p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Anggaran Belanja Mingguan:</label>
                <div className="p-2.5 bg-slate-50 border rounded-xl font-bold text-xs text-[#236B46]">
                  Rp 450.000
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Bahan Pangan Sering Dibeli:</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {['Sayuran', 'Protein', 'Buah', 'Minuman'].map((cat) => (
                    <div key={cat} className="p-2 bg-[#E6F3E9] text-[#236B46] border border-[#69B786] rounded-xl font-semibold flex items-center justify-between">
                      <span>{cat}</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FFF8E9] border border-[#F7E6C4] p-3 rounded-xl text-[11px] text-slate-700 flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <span>Pengingat otomatis aktif 5 hari sebelum kedaluwarsa.</span>
              </div>
            </div>

            <div className="w-full py-3 bg-[#236B46] text-white text-xs font-bold rounded-xl text-center shadow-md">
              Simpan & Masuk ke Dashboard
            </div>
          </div>
        </div>

        {/* Frame 04: Dashboard Beranda */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 04
            </span>
            <h3 className="text-xs font-bold text-slate-800">Dashboard Utama (Beranda)</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Beranda" userName={profile.name} isHome={true} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <BerandaView
                pantryItems={pantryItems}
                recipes={recipes}
                onNavigate={(t) => onSelectScreenForApp(t)}
                onSelectRecipe={dummyNoop}
              />
            </div>
            <BottomNav activeTab="beranda" onChangeTab={onSelectScreenForApp} pantryAlertCount={1} />
          </div>
        </div>

        {/* Frame 05: Smart Pantry */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 05
            </span>
            <h3 className="text-xs font-bold text-slate-800">Smart Pantry (Stok & Expired)</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Smart Pantry" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <PantryView
                items={pantryItems}
                onAddItem={dummyNoop}
                onOpenBarcodeScan={dummyNoop}
                onUpdateItemStatus={dummyNoop}
                onDeleteItem={dummyNoop}
                onNavigateToRecipe={dummyNoop}
                onOpenDonateModal={dummyNoop}
              />
            </div>
            <BottomNav activeTab="pantry" onChangeTab={onSelectScreenForApp} pantryAlertCount={1} />
          </div>
        </div>

        {/* Frame 06: AI Meal Predictor */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 06
            </span>
            <h3 className="text-xs font-bold text-slate-800">AI Meal Predictor</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="AI Meal Predictor" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <MealPredictorView
                recipes={recipes}
                pantryItems={pantryItems}
                selectedRecipe={null}
                onSelectRecipe={dummyNoop}
                onCloseRecipeModal={dummyNoop}
                onCookRecipe={dummyNoop}
                onAddToMealPlan={dummyNoop}
                onNavigateToMealPlanner={() => onSelectScreenForApp('planner')}
              />
            </div>
            <BottomNav activeTab="menu" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

        {/* Frame 07: Detail Resep & Memasak */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 07
            </span>
            <h3 className="text-xs font-bold text-slate-800">Detail Resep & Cooking Timer</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-white rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between p-4 space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-[#236B46]">Resep Terpilih</span>
                <span className="text-[10px] text-slate-400">⏱ 15 Menit</span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mt-1">Tumis Bayam Telur</h3>
              <img
                src={recipes[0]?.image}
                alt="Tumis Bayam Telur"
                className="w-full h-28 object-cover rounded-xl mt-2"
              />
            </div>

            <div className="bg-[#E6F3E9] p-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="text-[#236B46] font-bold">Timer Memasak: 15:00</span>
              <span className="px-2 py-0.5 bg-[#236B46] text-white rounded-lg text-[10px] font-bold">Mulai</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <span className="font-bold text-slate-700 block">Bahan & Takaran (3 Porsi):</span>
              <div className="p-1.5 bg-slate-50 rounded-lg flex justify-between">
                <span>Bayam (1 ikat)</span>
                <span className="text-emerald-700 font-bold">Ada di Pantry</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg flex justify-between">
                <span>Telur (2 butir)</span>
                <span className="text-emerald-700 font-bold">Ada di Pantry</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg flex justify-between">
                <span>Bawang Putih</span>
                <span className="text-amber-700 font-bold">Perlu Beli</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-600">
              <span className="font-bold text-slate-700 block">Langkah Memasak:</span>
              <p>1. Tumis bawang hingga harum.</p>
              <p>2. Orak-arik telur setengah matang.</p>
              <p>3. Masukkan bayam, masak 2 menit.</p>
            </div>

            <div className="w-full py-2.5 bg-[#236B46] text-white text-xs font-bold rounded-xl text-center shadow-md">
              Selesai Masak & Update Pantry
            </div>
          </div>
        </div>

        {/* Frame 08: Weekly Meal Planner */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 08
            </span>
            <h3 className="text-xs font-bold text-slate-800">Weekly Meal Planner</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Meal Planner" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <MealPlannerView
                mealPlan={mealPlan}
                recipes={recipes}
                onRemoveItem={dummyNoop}
                onBack={dummyNoop}
              />
            </div>
            <BottomNav activeTab="menu" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

        {/* Frame 09: Food Rescue */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 09
            </span>
            <h3 className="text-xs font-bold text-slate-800">Food Rescue (Penyaluran Makanan)</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Food Rescue" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <FoodRescueView
                listings={rescueListings}
                partners={initialPartners}
                onAddListing={dummyNoop}
                onClaimListing={dummyNoop}
              />
            </div>
            <BottomNav activeTab="rescue" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

        {/* Frame 10: Organic Cycle */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 10
            </span>
            <h3 className="text-xs font-bold text-slate-800">Organic Cycle (Kompos & Biopori)</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Organic Cycle" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <OrganicCycleView logs={organicLogs} onAddLog={dummyNoop} />
            </div>
            <BottomNav activeTab="organik" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

        {/* Frame 11: Waste Tracker */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 11
            </span>
            <h3 className="text-xs font-bold text-slate-800">Waste Tracker (Statistik Dampak)</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Waste Tracker" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <WasteTrackerView
                totalSavings={85000}
                totalFoodWasteAvoidedKg={1.8}
                totalOrganicCompostedKg={2.5}
              />
            </div>
            <BottomNav activeTab="dampak" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

        {/* Frame 12: Profil Keluarga & GitHub */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold text-[#236B46] uppercase tracking-wider block">
              Frame 12
            </span>
            <h3 className="text-xs font-bold text-slate-800">Profil Keluarga & GitHub Sync</h3>
          </div>
          <div className="w-[340px] h-[680px] bg-[#FCFDFD] rounded-[32px] shadow-xl border-4 border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col justify-between">
            <TopBar title="Profil Keluarga" userName={profile.name} isHome={false} />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <ProfileView
                profile={profile}
                onUpdateProfile={dummyNoop}
                onOpenOnboarding={dummyNoop}
                onResetData={dummyNoop}
              />
            </div>
            <BottomNav activeTab="profile" onChangeTab={onSelectScreenForApp} />
          </div>
        </div>

      </div>
    </div>
  );
};
