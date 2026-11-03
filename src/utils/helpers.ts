// Helpers for date calculations, formatters, and storage

export function getDaysRemaining(expiryDateString: string): number {
  const today = new Date('2026-11-03'); // Reference current app date or new Date()
  const exp = new Date(expiryDateString);
  const diffTime = exp.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatExpiryLabel(daysRemaining: number): {
  text: string;
  badgeClass: string;
  isUrgent: boolean;
} {
  if (daysRemaining < 0) {
    return {
      text: 'Kedaluwarsa',
      badgeClass: 'bg-rose-100 text-rose-700 border-rose-200',
      isUrgent: true,
    };
  }
  if (daysRemaining === 0) {
    return {
      text: 'Hari ini!',
      badgeClass: 'bg-rose-100 text-rose-700 font-semibold border-rose-200',
      isUrgent: true,
    };
  }
  if (daysRemaining <= 3) {
    return {
      text: `${daysRemaining} hari`,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      isUrgent: true,
    };
  }
  if (daysRemaining <= 7) {
    return {
      text: `${daysRemaining} hari`,
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
      isUrgent: true,
    };
  }
  return {
    text: `${daysRemaining} hari`,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    isUrgent: false,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp ');
}

export function formatDateIndo(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return dateStr;
  }
}

export function calculateCO2FromFood(weightKg: number): number {
  // Standard emission factor: ~1.9 kg CO2e per 1 kg food waste diverted from landfill
  return Number((weightKg * 1.9).toFixed(1));
}
