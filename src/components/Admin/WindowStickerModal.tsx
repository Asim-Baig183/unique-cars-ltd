import React, { useRef } from 'react';
import { X, CheckCircle, Printer } from 'lucide-react';

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
  const stickerRef = useRef<HTMLDivElement>(null);

  if (!car) return null;

  // 🖨️ Clean Browser Native Print / Save to PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* CSS to clean background noise during printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #sticker-print-area, #sticker-print-area * {
            visibility: visible !important;
          }
          #sticker-print-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white text-black w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 animate-in fade-in zoom-in duration-200">
          
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300 shrink-0 print:hidden">
            <div className="flex items-center gap-2">

              {/* Print / Save as PDF Button */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-1.5 rounded shadow transition-all cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" /> 
                Print / Save as PDF
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black transition-colors p-1 rounded-lg hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 📄 STICKER SHEET AREA */}
          <div className="p-6 md:p-8 space-y-6 bg-white overflow-y-auto custom-scrollbar flex-1 print:p-0 print:overflow-visible">
            <div 
              ref={stickerRef} 
              id="sticker-print-area"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
              className="p-6 bg-white space-y-6 border border-gray-300 rounded-lg shadow-sm"
            >
              
              {/* Logo & Main Title Bar */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-black italic tracking-tight" style={{ color: '#dc2626' }}>
                    Unique <span style={{ color: '#000000' }}>Cars</span>
                  </span>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: '#000000' }}>
                    {car.year} {car.make} {car.model}
                  </h2>
                  <p className="text-xs md:text-sm font-semibold" style={{ color: '#4b5563' }}>
                    {car.body_style} {car.transmission}
                  </p>
                </div>
              </div>

              {/* Big Price Section */}
              <div className="text-center py-2">
                <span className="text-5xl md:text-6xl font-black tracking-tight" style={{ color: '#000000' }}>
                  ${car.price?.toLocaleString()}
                </span>
                <span className="text-lg md:text-xl font-serif ml-2" style={{ color: '#374151' }}>
                  +Tax and Licensing
                </span>
              </div>

              {/* Specs Details Grid Box */}
              <div className="border rounded-lg p-4" style={{ borderColor: '#d1d5db', backgroundColor: '#f9fafb' }}>
                <h3 className="text-center text-sm md:text-base font-bold border-b pb-2 mb-3" style={{ color: '#1f2937', borderColor: '#e5e7eb' }}>
                  {car.year} {car.make} {car.model}
                </h3>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm">
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>Odometer:</span>
                    <span className="font-bold">{car.mileage?.toLocaleString()} KM</span>
                  </div>
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>Vin:</span>
                    <span className="font-mono font-bold">{car.vin || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>City fuel:</span>
                    <span className="font-bold">{car.city_fuel || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>Highway fuel:</span>
                    <span className="font-bold">{car.hwy_fuel || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>Title Status:</span>
                    <span className="font-bold" style={{ color: '#047857' }}>{car.condition_tag || 'Clean'}</span>
                  </div>
                  <div className="flex justify-between border-b py-1" style={{ borderColor: '#e5e7eb' }}>
                    <span className="font-semibold" style={{ color: '#4b5563' }}>Stock Number:</span>
                    <span className="font-bold">{car.stock_number || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Description & Certification Badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-1" style={{ borderColor: '#d1d5db' }}>
                  <h4 className="font-bold text-base md:text-lg flex items-center gap-2" style={{ color: '#000000' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2563eb' }}></span>
                    Description:
                  </h4>
                  <div className="flex items-center gap-1 text-xs md:text-sm font-extrabold" style={{ color: '#0f172a' }}>
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Certified Pre-Owned
                  </div>
                </div>

                <p className="text-[11px] md:text-xs leading-relaxed font-mono uppercase whitespace-pre-line" style={{ color: '#1f2937' }}>
                  {car.description || 'WELL MAINTAINED VEHICLE IN EXCELLENT CONDITION.'}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};