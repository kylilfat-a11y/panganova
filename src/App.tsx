/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { BerandaView } from './components/BerandaView';
import { PantryView } from './components/PantryView';
import { MealPredictorView } from './components/MealPredictorView';
import { MealPlannerView } from './components/MealPlannerView';
import { FoodRescueView } from './components/FoodRescueView';
import { OrganicCycleView } from './components/OrganicCycleView';
import { WasteTrackerView } from './components/WasteTrackerView';
import { AddPantryModal } from './components/AddPantryModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { OnboardingModal } from './components/OnboardingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileView } from './components/ProfileView';
import { AllScreensGallery } from './components/AllScreensGallery';

import {
  initialPantryItems,
  initialRecipes,
  initialPartners,
  initialRescueListings,
  initialOrganicLogs,
  initialProfile,
  initialMealPlan,
  initialNotifications,
} from './data/initialData';

import {
  PantryItem,
  Recipe,
  MealPlanItem,
  FoodRescueListing,
  OrganicCycleEntry,
  UserProfile,
  AppNotification,
  NavigationTab,
} from './types';
import { calculateCO2FromFood, getDaysRemaining } from './utils/helpers';

export default function App() {
  // View mode: 'app' (interactive mobile phone) or 'gallery' (all screens showcase)
  const [displayMode, setDisplayMode] = useState<'app' | 'gallery'>('app');

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('beranda');

  // Core App Data States (with LocalStorage persistence)
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('panganova_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Kaylilla') {
          parsed.name = 'Kafa';
        }
        return parsed;
      } catch {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    const saved = localStorage.getItem('panganova_pantry');
    return saved ? JSON.parse(saved) : initialPantryItems;
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('panganova_recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });

  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(() => {
    const saved = localStorage.getItem('panganova_mealplan');
    return saved ? JSON.parse(saved) : initialMealPlan;
  });

  const [rescueListings, setRescueListings] = useState<FoodRescueListing[]>(() => {
    const saved = localStorage.getItem('panganova_rescue');
    return saved ? JSON.parse(saved) : initialRescueListings;
  });

  const [organicLogs, setOrganicLogs] = useState<OrganicCycleEntry[]>(() => {
    const saved = localStorage.getItem('panganova_organic');
    return saved ? JSON.parse(saved) : initialOrganicLogs;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('panganova_notifs');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Modal Visibility States
  const [showAddPantryModal, setShowAddPantryModal] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('panganova_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('panganova_pantry', JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem('panganova_mealplan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('panganova_rescue', JSON.stringify(rescueListings));
  }, [rescueListings]);

  useEffect(() => {
    localStorage.setItem('panganova_organic', JSON.stringify(organicLogs));
  }, [organicLogs]);

  useEffect(() => {
    localStorage.setItem('panganova_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Handlers for Smart Pantry
  const handleAddPantryItem = (itemData: Omit<PantryItem, 'id' | 'status'>) => {
    const newItem: PantryItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      status: 'active',
    };
    setPantryItems([newItem, ...pantryItems]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Bahan Ditambahkan ke Pantry 🥬',
      message: `${newItem.name} (${newItem.quantity} ${newItem.unit}) berhasil dicatat.`,
      timestamp: 'Baru saja',
      type: 'info',
      read: false,
      targetTab: 'pantry',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateItemStatus = (id: string, status: PantryItem['status']) => {
    setPantryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setPantryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Recipe Cooking & Meal Plan
  const handleCookRecipe = (recipe: Recipe) => {
    // Automatically mark matching ingredients in pantry as consumed
    setPantryItems((prev) =>
      prev.map((item) => {
        const matchesRecipe = recipe.ingredients.some(
          (ing) =>
            item.name.toLowerCase().includes(ing.name.toLowerCase()) ||
            ing.name.toLowerCase().includes(item.name.toLowerCase())
        );
        if (matchesRecipe && item.status === 'active') {
          return { ...item, status: 'consumed' as const };
        }
        return item;
      })
    );

    // Push celebration notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Menu Berhasil Dimasak! 🍳',
      message: `Bahan makanan berhasil dimanfaatkan untuk ${recipe.title}, mencegah potensi food waste!`,
      timestamp: 'Baru saja',
      type: 'success',
      read: false,
      targetTab: 'dampak',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleAddToMealPlan = (
    recipe: Recipe,
    day: MealPlanItem['day'],
    mealTime: MealPlanItem['mealTime']
  ) => {
    const newPlan: MealPlanItem = {
      id: `plan-${Date.now()}`,
      day,
      mealTime,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      portions: recipe.portions,
    };
    setMealPlan([...mealPlan, newPlan]);
  };

  const handleRemoveMealPlanItem = (id: string) => {
    setMealPlan((prev) => prev.filter((p) => p.id !== id));
  };

  // Handlers for Food Rescue
  const handleAddRescueListing = (
    data: Omit<FoodRescueListing, 'id' | 'status'>
  ) => {
    const newListing: FoodRescueListing = {
      ...data,
      id: `res-${Date.now()}`,
      status: 'Tersedia',
    };
    setRescueListings([newListing, ...rescueListings]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Donasi Makanan Dipublikasikan ❤️',
      message: `${newListing.title} (${newListing.portions} porsi) siap disalurkan ke mitra.`,
      timestamp: 'Baru saja',
      type: 'info',
      read: false,
      targetTab: 'rescue',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleClaimListing = (listingId: string, partnerName: string) => {
    setRescueListings((prev) =>
      prev.map((l) =>
        l.id === listingId
          ? {
              ...l,
              status: 'Tersalurkan' as const,
              recipientPartner: partnerName,
              claimedAt: 'Hari ini, 12:45 WIB',
            }
          : l
      )
    );

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Penyaluran Terkonfirmasi! 🎉',
      message: `Makanan telah diterima oleh mitra ${partnerName}. Terima kasih telah menyelamatkan pangan!`,
      timestamp: 'Baru saja',
      type: 'success',
      read: false,
      targetTab: 'rescue',
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Handlers for Organic Cycle
  const handleAddOrganicLog = (
    data: Omit<OrganicCycleEntry, 'id' | 'co2SavedKg'>
  ) => {
    const co2Saved = calculateCO2FromFood(data.weightKg);
    const newEntry: OrganicCycleEntry = {
      ...data,
      id: `org-${Date.now()}`,
      co2SavedKg: co2Saved,
    };
    setOrganicLogs([newEntry, ...organicLogs]);
  };

  // Profile reset
  const handleResetDemoData = () => {
    localStorage.clear();
    setPantryItems(initialPantryItems);
    setRecipes(initialRecipes);
    setMealPlan(initialMealPlan);
    setRescueListings(initialRescueListings);
    setOrganicLogs(initialOrganicLogs);
    setProfile(initialProfile);
    setNotifications(initialNotifications);
    setActiveTab('beranda');
  };

  // Count active urgent pantry items
  const urgentCount = pantryItems.filter((i) => {
    const days = getDaysRemaining(i.expiryDate);
    return i.status === 'active' && days >= 0 && days <= 5;
  }).length;

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  // Title for subpages
  const getPageTitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'pantry':
        return 'Smart Pantry';
      case 'menu':
        return 'AI Meal Predictor';
      case 'planner':
        return 'Meal Planner';
      case 'rescue':
        return 'Food Rescue';
      case 'organik':
        return 'Organic Cycle';
      case 'dampak':
        return 'Waste Tracker';
      case 'profile':
        return 'Profil Keluarga';
      default:
        return 'Beranda';
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Floating View Switcher */}
      <div className="fixed top-2.5 right-3 sm:right-6 z-50 flex items-center bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full p-1 shadow-lg">
        <button
          onClick={() => setDisplayMode('app')}
          className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all flex items-center gap-1 ${
            displayMode === 'app'
              ? 'bg-[#236B46] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📱</span> Mode HP
        </button>
        <button
          onClick={() => setDisplayMode('gallery')}
          className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all flex items-center gap-1 ${
            displayMode === 'gallery'
              ? 'bg-[#236B46] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🖼️</span> Semua Layar (12 Layar)
        </button>
      </div>

      {displayMode === 'gallery' ? (
        <AllScreensGallery
          pantryItems={pantryItems}
          recipes={recipes}
          mealPlan={mealPlan}
          rescueListings={rescueListings}
          organicLogs={organicLogs}
          profile={profile}
          onSelectScreenForApp={(tab) => {
            setActiveTab(tab);
            setDisplayMode('app');
          }}
        />
      ) : (
        <MobileFrame>
          {/* 1. Top Bar */}
          <TopBar
            title={getPageTitle(activeTab)}
            userName={profile.name}
            isHome={activeTab === 'beranda'}
            onBack={activeTab !== 'beranda' ? () => setActiveTab('beranda') : undefined}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenProfile={() => setActiveTab('profile')}
            unreadNotifsCount={unreadNotifs}
          />

          {/* 2. Main Tab View Router */}
          <main className="flex-1 flex flex-col">
            {activeTab === 'beranda' && (
              <BerandaView
                pantryItems={pantryItems}
                recipes={recipes}
                onNavigate={(tab) => setActiveTab(tab)}
                onSelectRecipe={(recipe) => {
                  setSelectedRecipeDetail(recipe);
                  setActiveTab('menu');
                }}
              />
            )}

            {activeTab === 'pantry' && (
              <PantryView
                items={pantryItems}
                onAddItem={() => setShowAddPantryModal(true)}
                onOpenBarcodeScan={() => setShowBarcodeScanner(true)}
                onUpdateItemStatus={handleUpdateItemStatus}
                onDeleteItem={handleDeleteItem}
                onNavigateToRecipe={(ingredientName) => {
                  const matched = recipes.find((r) =>
                    r.title.toLowerCase().includes(ingredientName.toLowerCase()) ||
                    r.ingredients.some((i) =>
                      i.name.toLowerCase().includes(ingredientName.toLowerCase())
                    )
                  );
                  if (matched) {
                    setSelectedRecipeDetail(matched);
                  }
                  setActiveTab('menu');
                }}
                onOpenDonateModal={(item) => {
                  setActiveTab('rescue');
                }}
              />
            )}

            {activeTab === 'menu' && (
              <MealPredictorView
                recipes={recipes}
                pantryItems={pantryItems}
                selectedRecipe={selectedRecipeDetail}
                onSelectRecipe={(recipe) => setSelectedRecipeDetail(recipe)}
                onCloseRecipeModal={() => setSelectedRecipeDetail(null)}
                onCookRecipe={handleCookRecipe}
                onAddToMealPlan={handleAddToMealPlan}
                onNavigateToMealPlanner={() => setActiveTab('planner')}
              />
            )}

            {activeTab === 'planner' && (
              <MealPlannerView
                mealPlan={mealPlan}
                recipes={recipes}
                onRemoveItem={handleRemoveMealPlanItem}
                onBack={() => setActiveTab('menu')}
              />
            )}

            {activeTab === 'rescue' && (
              <FoodRescueView
                listings={rescueListings}
                partners={initialPartners}
                onAddListing={handleAddRescueListing}
                onClaimListing={handleClaimListing}
              />
            )}

            {activeTab === 'organik' && (
              <OrganicCycleView
                logs={organicLogs}
                onAddLog={handleAddOrganicLog}
              />
            )}

            {activeTab === 'dampak' && (
              <WasteTrackerView
                totalSavings={85000}
                totalFoodWasteAvoidedKg={1.8}
                totalOrganicCompostedKg={organicLogs.reduce(
                  (acc, curr) => acc + curr.weightKg,
                  0
                )}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                profile={profile}
                onUpdateProfile={(updated) => setProfile({ ...profile, ...updated })}
                onOpenOnboarding={() => setShowOnboarding(true)}
                onResetData={handleResetDemoData}
              />
            )}
          </main>

          {/* 3. Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={(tab) => {
              setSelectedRecipeDetail(null);
              setActiveTab(tab);
            }}
            pantryAlertCount={urgentCount}
          />

          {/* Modals & Overlays */}
          <AddPantryModal
            isOpen={showAddPantryModal}
            onClose={() => setShowAddPantryModal(false)}
            onSave={handleAddPantryItem}
          />

          <BarcodeScannerModal
            isOpen={showBarcodeScanner}
            onClose={() => setShowBarcodeScanner(false)}
            onDetected={handleAddPantryItem}
          />

          <OnboardingModal
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            onFinish={(updated) => {
              setProfile({ ...profile, ...updated });
              setShowOnboarding(false);
            }}
          />

          <NotificationsModal
            isOpen={showNotifications}
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              setShowNotifications(false);
            }}
            onMarkAllAsRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            }}
          />
        </MobileFrame>
      )}
    </div>
  );
}
