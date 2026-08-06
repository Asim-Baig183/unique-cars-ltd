import React from 'react';
import { Printer, X, CheckCircle } from 'lucide-react';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  stock_number?: string;
  vin?: string;
  body_style?: string;
  transmission?: string;
  engine?: string;
  engine_size?: string;
  driveline?: string;
  exterior_color?: string;
  interior_color?: string;
  fuel_type?: string;
  city_fuel?: string;
  hwy_fuel?: string;
  doors?: number;
  passengers?: number;
  features?: string[];
  description?: string;
  condition_tag?: string;
  images: string[];
}

interface WindowStickerModalProps {
  car: Car | null;
  onClose: () => void;
}

export const WindowStickerModal: React.FC<WindowStickerModalProps> = ({ car, onClose }) => {
  if (!car) return null;

  const handlePrintTrigger = () => {
    window.print();
  };

  return (
    <>
      {/* 🖨️ STRICT SINGLE-PAGE PRINT ISOLATION */}
      <style>{`
        @media print {
          /* 1. Lock background html & body to prevent extra page generation */
          html, body {
            height: 100vh !important;
            max-height: 100vh !important;
            overflow: hidden !important;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* 2. Hide everything else visually */
          body * {
            visibility: hidden !important;
          }

          /* 3. Make ONLY sticker container and its children visible */
          #printable-window-sticker,
          #printable-window-sticker * {
            visibility: visible !important;
          }

          /* 4. Position sticker as full single page at top-left */
          #printable-window-sticker {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 24px !important;
            background: white !important;
            z-index: 999999 !important;
            box-shadow: none !important;
            border: none !important;
            overflow: hidden !important;
          }

          /* 5. Force 1-Page Portrait Paper output */
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 print:p-0 print:bg-white print:static">
        <div 
          id="printable-window-sticker" 
          className="bg-white text-black w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 animate-in fade-in zoom-in duration-200 print:max-h-none print:border-none print:shadow-none print:rounded-none"
        >
          
          {/* Top Header Action Bar (Screen Only - Hidden when Printing) */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300 shrink-0 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">BETA</span>
              <button
                onClick={handlePrintTrigger}
                className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow transition-colors"
              >
                <Printer className="w-4 h-4" /> Download / Print Sticker
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 📄 PRINTABLE STICKER SHEET AREA */}
          <div className="p-6 md:p-8 space-y-6 bg-white overflow-y-auto custom-scrollbar flex-1 print:p-0 print:overflow-visible">
            
            {/* Logo & Main Title Bar */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black italic tracking-tight text-red-600">
                  Unique <span className="text-black">Cars</span>
                </span>
              </div>

              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-black uppercase tracking-tight">
                  {car.year} {car.make} {car.model}
                </h2>
                <p className="text-xs md:text-sm font-semibold text-gray-600">
                  {car.body_style} {car.transmission}
                </p>
              </div>
            </div>

            {/* Big Price Section */}
            <div className="text-center py-2">
              <span className="text-5xl md:text-6xl font-black tracking-tight text-black">
                ${car.price?.toLocaleString()}
              </span>
              <span className="text-lg md:text-xl font-serif text-gray-700 ml-2">
                +Tax and Licensing
              </span>
            </div>

            {/* Specs Details Grid Box */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50/50">
              <h3 className="text-center text-sm md:text-base font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                {car.year} {car.make} {car.model}
              </h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm">
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">Odometer:</span>
                  <span className="font-bold">{car.mileage?.toLocaleString()} KM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">Vin:</span>
                  <span className="font-mono font-bold">{car.vin || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">City fuel:</span>
                  <span className="font-bold">{car.city_fuel || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">Highway fuel:</span>
                  <span className="font-bold">{car.hwy_fuel || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">Title Status:</span>
                  <span className="font-bold text-emerald-700">{car.condition_tag || 'Clean'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold text-gray-600">Stock Number:</span>
                  <span className="font-bold">{car.stock_number || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Description & Certification Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <h4 className="font-bold text-base md:text-lg text-black flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Description:
                </h4>
                <div className="flex items-center gap-1 text-xs md:text-sm font-extrabold text-slate-900">
                  <CheckCircle className="w-4 h-4 text-slate-900" />
                  Certified Pre-Owned
                </div>
              </div>

              <p className="text-[11px] md:text-xs text-gray-800 leading-relaxed font-mono uppercase whitespace-pre-line">
                {car.description || 'WELL MAINTAINED VEHICLE IN EXCELLENT CONDITION.'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};