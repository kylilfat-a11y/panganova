import React, { useState } from 'react';
import { X, Camera, Zap, Check, Sparkles } from 'lucide-react';
import { PantryItem, FoodCategory } from '../types';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDetected: (item: Omit<PantryItem, 'id' | 'status'>) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onDetected,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [detectedProduct, setDetectedProduct] = useState<{
    name: string;
    category: FoodCategory;
    quantity: number;
    unit: string;
    shelfLifeDays: number;
    storage: 'Kulkas' | 'Freezer' | 'Lemari Kering';
    price: number;
    icon: string;
    barcode: string;
  } | null>(null);

  if (!isOpen) return null;

  const sampleProducts = [
    {
      name: 'Susu UHT Full Cream Greenfields 1L',
      category: 'Minuman' as FoodCategory,
      quantity: 1,
      unit: 'kotak',
      shelfLifeDays: 28,
      storage: 'Lemari Kering' as const,
      price: 24000,
      icon: '🥛',
      barcode: '8992753210948',
    },
    {
      name: 'Yogurt Greek Biokul 470g',
      category: 'Minuman' as FoodCategory,
      quantity: 1,
      unit: 'cup',
      shelfLifeDays: 14,
      storage: 'Kulkas' as const,
      price: 36000,
      icon: '🥣',
      barcode: '8993005123456',
    },
    {
      name: 'Tahu Sutra Putih Organik',
      category: 'Protein' as FoodCategory,
      quantity: 1,
      unit: 'pack',
      shelfLifeDays: 4,
      storage: 'Kulkas' as const,
      price: 9000,
      icon: '🧈',
      barcode: '8991234567890',
    },
    {
      name: 'Roti Tawar Gandum Sari Roti',
      category: 'Karbohidrat' as FoodCategory,
      quantity: 1,
      unit: 'bungkus',
      shelfLifeDays: 5,
      storage: 'Lemari Kering' as const,
      price: 18500,
      icon: '🍞',
      barcode: '8997012389101',
    },
  ];

  const handleSimulateScan = (prod = sampleProducts[0]) => {
    setIsScanning(false);
    setDetectedProduct(prod);
  };

  const handleConfirmProduct = () => {
    if (!detectedProduct) return;

    const today = new Date('2026-11-03');
    const exp = new Date(today);
    exp.setDate(exp.getDate() + detectedProduct.shelfLifeDays);

    onDetected({
      name: detectedProduct.name,
      category: detectedProduct.category,
      quantity: detectedProduct.quantity,
      unit: detectedProduct.unit,
      purchaseDate: today.toISOString().split('T')[0],
      expiryDate: exp.toISOString().split('T')[0],
      storageLocation: detectedProduct.storage,
      priceEst: detectedProduct.price,
      icon: detectedProduct.icon,
      notes: `Dipindai otomatis via Barcode (${detectedProduct.barcode})`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white w-full max-w-[390px] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-[560px]">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between z-10 bg-slate-900/60 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Smart Barcode Scanner</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTorchOn(!torchOn)}
              className={`p-1.5 rounded-full ${
                torchOn ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder Camera Simulation */}
        <div className="flex-1 relative flex items-center justify-center bg-slate-950 overflow-hidden">
          {/* Simulated camera grid & laser */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#236B46_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Scanner Box Target */}
          <div className="relative w-64 h-64 border-2 border-emerald-400/80 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_25px_rgba(52,211,153,0.3)]">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-300" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-300" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-300" />

            {/* Red/Green Laser Line */}
            {isScanning && (
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444] animate-bounce" />
            )}

            {!detectedProduct && (
              <span className="text-[11px] text-slate-300 text-center px-4">
                Arahkan kamera ke barcode kemasan makanan
              </span>
            )}

            {detectedProduct && (
              <div className="text-center p-3">
                <span className="text-3xl block mb-1">{detectedProduct.icon}</span>
                <span className="text-xs font-bold text-white block">
                  {detectedProduct.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                  Barcode: {detectedProduct.barcode}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Drawer / Result */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          {detectedProduct ? (
            <div className="space-y-2">
              <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-xl p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                    Produk Teridentifikasi!
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {detectedProduct.quantity} {detectedProduct.unit} • Estimasi {detectedProduct.shelfLifeDays} hari
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsScanning(true);
                    setDetectedProduct(null);
                  }}
                  className="text-[10px] text-slate-400 hover:text-white underline"
                >
                  Pindai Ulang
                </button>
              </div>

              <button
                onClick={handleConfirmProduct}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                Tambahkan ke Pantry
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-2">
                <span className="text-[11px] text-slate-400">
                  Uji coba deteksi barcode instan:
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {sampleProducts.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => handleSimulateScan(p)}
                    className="text-[10px] text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 truncate flex items-center gap-1.5"
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
