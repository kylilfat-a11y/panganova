export type FoodCategory =
  | 'Sayuran'
  | 'Protein'
  | 'Bumbu'
  | 'Minuman'
  | 'Buah'
  | 'Karbohidrat'
  | 'Lainnya';

export type StorageLocation = 'Kulkas' | 'Freezer' | 'Lemari Kering';

export interface PantryItem {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  purchaseDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  storageLocation: StorageLocation;
  status: 'active' | 'consumed' | 'rescued' | 'composted' | 'expired';
  priceEst: number; // IDR estimate
  icon?: string;
  notes?: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  isAvailableInPantry: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  durationMinutes: number;
  portions: number;
  category: string;
  image: string;
  pantryHighlight: string;
  ingredients: RecipeIngredient[];
  missingIngredients: string[];
  steps: string[];
  tips?: string;
}

export interface MealPlanItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  mealTime: 'Sarapan' | 'Makan Siang' | 'Makan Malam';
  recipeId: string;
  recipeTitle: string;
  portions: number;
}

export interface FoodRescueListing {
  id: string;
  title: string;
  portions: number;
  preparedAt: string; // e.g. "Hari ini, 09:30"
  storageCondition: 'Suhu Ruang' | 'Dingin (Kulkas)' | 'Beku (Freezer)';
  pickupLocation: string;
  pickupTimeWindow: string;
  status: 'Tersedia' | 'Dipesan Mitra' | 'Tersalurkan';
  safetyVerified: boolean;
  notes?: string;
  recipientPartner?: string;
  claimedAt?: string;
}

export interface VerifiedPartner {
  id: string;
  name: string;
  type: 'Bank Sampah' | 'Komunitas Berbagi' | 'Panti Asuhan' | 'Food Bank';
  distance: string;
  address: string;
  phone: string;
  rating: number;
  verified: boolean;
  capacityStatus: 'Menerima Donasi' | 'Hampir Penuh';
  icon: string;
}

export interface OrganicCycleEntry {
  id: string;
  date: string;
  weightKg: number;
  type: 'Sisa Sayuran' | 'Kulit Buah' | 'Ampas Kopi & Teh' | 'Sisa Makanan Matang' | 'Lainnya';
  method: 'Kompos Rumah Tangga' | 'Lubang Biopori' | 'Maggot BSF' | 'Setor Mitra Organik';
  notes?: string;
  co2SavedKg: number;
}

export interface UserProfile {
  name: string;
  familyMembers: number;
  shoppingFrequency: string;
  weeklyBudget: number; // IDR
  foodWasteTendency: string;
  favoriteCategories: FoodCategory[];
  hasCompletedOnboarding: boolean;
  avatarUrl?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'warning' | 'success' | 'info';
  read: boolean;
  targetTab?: NavigationTab;
}

export type NavigationTab =
  | 'beranda'
  | 'pantry'
  | 'menu'
  | 'rescue'
  | 'dampak'
  | 'organik'
  | 'planner'
  | 'profile';
