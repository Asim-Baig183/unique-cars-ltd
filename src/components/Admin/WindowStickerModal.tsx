import React, { useRef, useState } from 'react';
import { X, CheckCircle, Loader2, FileText, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const [isDownloading, setIsDownloading] = useState(false);

  if (!car) return null;

  // 📄 1. Download as PDF Function
  const handleDownloadPDF = async () => {
    if (!stickerRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(stickerRef.current, {
        scale: 2, // High resolution image
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${car.year}_${car.make}_${car.model}_Sticker.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // 🖼️ 2. Download as JPG Function
  const handleDownloadJPG = async () => {
    if (!stickerRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(stickerRef.current, {
        scale: 2, // High resolution image
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${car.year}_${car.make}_${car.model}_Sticker.jpg`;
      link.click();
    } catch (err) {
      console.error('Failed to generate JPG', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white text-black w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 animate-in fade-in zoom-in duration-200">
        
        {/* Top Header Action Bar with PDF & JPG Download Buttons */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">WINDOW STICKER</span>

            {/* PDF Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded shadow transition-colors"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} 
              Download PDF
            </button>

            {/* JPG Button */}
            <button
              onClick={handleDownloadJPG}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded shadow transition-colors"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />} 
              Download JPG
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 📄 STICKER SHEET AREA (Captured by html2canvas) */}
        <div className="p-6 md:p-8 space-y-6 bg-white overflow-y-auto custom-scrollbar flex-1">
          <div ref={stickerRef} className="p-6 bg-white space-y-6 border border-gray-200 rounded-lg">
            
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
    </div>
  );
};