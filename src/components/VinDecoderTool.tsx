import React, { useState, useRef } from 'react';
import { fetchCarSpecsByVIN,type VehicleSpecs } from '../services/carsxeService';

const VinDecoderTool: React.FC = () => {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [specs, setSpecs] = useState<VehicleSpecs | null>(null);
  const [error, setError] = useState('');

  // Smooth scroll ke liye ref reference
  const resultRef = useRef<HTMLDivElement>(null);

  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vin.trim() || vin.length !== 17) {
      setError('Please enter a valid 17-digit VIN number.');
      setSpecs(null);
      return;
    }

    setLoading(true);
    setError('');
    setSpecs(null); // Pehle purana result reset karein

    const result = await fetchCarSpecsByVIN(vin.trim());
    setLoading(false);

    if (result.success) {
      setSpecs(result);
      
      // Details aane ke baad smooth scroll down Effect
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      setError(result.error || 'Failed to decode VIN.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-2xl shadow-xl my-8">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400">VIN Decoder Tool</h2>
        <p className="text-gray-400 mt-2">
          Enter a 17-digit Vehicle Identification Number to inspect specs instantly.
        </p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleDecode} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          maxLength={17}
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter 17-digit VIN (e.g. 1HGCR2F83HA000000)"
          className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 uppercase tracking-widest text-lg transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Decoding...
            </>
          ) : (
            'Fetch Details'
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl mb-6 animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {/* Smooth Slide Down Result Layout */}
      <div
        ref={resultRef}
        className={`transition-all duration-700 ease-out overflow-hidden ${
          specs ? 'max-h-250 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {specs && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur">
            <div className="border-b border-slate-700 pb-4 mb-6 flex justify-between items-center flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                  Vehicle Found
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {specs.year} {specs.make} {specs.model}
                </h3>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                {specs.trim || 'Base Spec'}
              </span>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <SpecItem label="Make" value={specs.make} />
              <SpecItem label="Model" value={specs.model} />
              <SpecItem label="Year" value={specs.year?.toString()} />
              <SpecItem label="Body Type" value={specs.bodyType} />
              <SpecItem label="Engine" value={specs.engine} />
              <SpecItem label="Transmission" value={specs.transmission} />
              <SpecItem label="Drive Type" value={specs.driveType} />
              <SpecItem label="Doors" value={specs.doors?.toString()} />
              <SpecItem label="Fuel Type" value={specs.fuelType} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Grid Cells
const SpecItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
    <p className="text-base font-semibold text-gray-100 mt-1">{value || 'N/A'}</p>
  </div>
);

export default VinDecoderTool;