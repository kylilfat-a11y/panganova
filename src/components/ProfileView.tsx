import React from 'react';
import {
  User,
  Settings,
  Users,
  Wallet,
  Calendar,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Github,
} from 'lucide-react';
import { UserProfile } from '../types';
import { formatRupiah } from '../utils/helpers';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (newProfile: Partial<UserProfile>) => void;
  onOpenOnboarding: () => void;
  onResetData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenOnboarding,
  onResetData,
}) => {
  return (
    <div className="flex-1 flex flex-col px-5 py-3 space-y-4 pb-24">
      {/* 1. Profile Header Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-4 text-center shadow-xs space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#E6F3E9] text-[#236B46] font-bold text-xl flex items-center justify-center mx-auto border-2 border-[#69B786]/30">
          {profile.name[0]}
        </div>

        <div>
          <h2 className="text-base font-bold text-[#26372D] font-heading">
            {profile.name}
          </h2>
          <span className="text-xs text-[#657D6F]">
            Keluarga Berkelanjutan PANGANOVA
          </span>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1">
          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Akun Terverifikasi
          </span>
        </div>
      </div>

      {/* 2. Family & Food Preferences Grid */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-[#26372D] font-heading">
          Profil Rumah Tangga & Preferensi
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Jumlah Anggota Keluarga</span>
            </div>
            <span className="font-bold text-[#26372D]">
              {profile.familyMembers} Orang
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Jadwal Belanja</span>
            </div>
            <span className="font-bold text-[#26372D]">
              {profile.shoppingFrequency}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-600">
              <Wallet className="w-4 h-4 text-slate-400" />
              <span>Anggaran Mingguan</span>
            </div>
            <span className="font-bold text-[#236B46]">
              {formatRupiah(profile.weeklyBudget)}
            </span>
          </div>
        </div>

        {/* Favorite Categories */}
        <div>
          <span className="text-[10px] text-slate-400 block mb-1">
            Kategori Favorit:
          </span>
          <div className="flex flex-wrap gap-1">
            {profile.favoriteCategories.map((c) => (
              <span
                key={c}
                className="text-[10px] font-semibold bg-[#E6F3E9] text-[#236B46] px-2 py-0.5 rounded-md"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GitHub Connected Repository Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white">
              GitHub Repository
            </h4>
          </div>
          <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold px-2 py-0.5 rounded-full">
            Tersinkronisasi
          </span>
        </div>

        <p className="text-[11px] text-slate-300">
          Kode sumber PANGANOVA terhubung ke akun GitHub pengguna:
        </p>

        <div className="bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-emerald-300 truncate">
            kylilfat-a11y/panganova
          </span>
          <a
            href="https://github.com/kylilfat-a11y/panganova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white bg-slate-700 hover:bg-slate-600 font-bold px-2 py-1 rounded-lg flex items-center gap-1"
          >
            Buka <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 4. Development & Demo Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onOpenOnboarding}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          Buka Alur Onboarding (Frame 01-03)
        </button>

        <button
          onClick={onResetData}
          className="w-full py-2.5 border border-slate-200 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Data Demo ke Kondisi Awal
        </button>
      </div>
    </div>
  );
};
