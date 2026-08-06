import React, { useState, useEffect, useMemo } from 'react';
import { Search, Grid, List, ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Make sure path to supabaseClient is correct
import { CAR_MAKES, YEARS } from '../../constants/Car-Makes';
import { CAR_MODELS } from '../../constants/Car-Model';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  odometer?: string;
  transmission: string;
  fuel_type?: string;
  description?: string;
  images?: string[];
  image?: string;
  color?: string;
  exterior_color?: string;
  stock?: string;
  stock_number?: string;
  bodyStyle?: string;
  body_style?: string;
  engine?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

export const AllInventory: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Filter States
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [minYear, setMinYear] = useState<string>('');
  const [maxYear, setMaxYear] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  // FETCH VEHICLES FROM SUPABASE
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setVehicles(data || []);
      } catch (err: any) {
        console.error('Error fetching inventory from Supabase:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
    setSelectedModel('');
  };

  const handleReset = () => {
    setSelectedMake('');
    setSelectedModel('');
    setMinYear('');
    setMaxYear('');
    setKeyword('');
  };

  const handleCompareToggle = (id: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const availableModels = selectedMake ? CAR_MODELS[selectedMake] || [] : [];

  // FILTER LOGIC FOR SUPABASE VEHICLES
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((car) => {
      if (selectedMake && car.make?.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }
      if (selectedModel && car.model?.toLowerCase() !== selectedModel.toLowerCase()) {
        return false;
      }
      if (minYear && car.year < parseInt(minYear, 10)) {
        return false;
      }
      if (maxYear && car.year > parseInt(maxYear, 10)) {
        return false;
      }
      if (keyword.trim() !== '') {
        const query = keyword.toLowerCase().trim();
        const title = `${car.year || ''} ${car.make || ''} ${car.model || ''}`.toLowerCase();
        const body = (car.body_style || car.bodyStyle || '').toLowerCase();
        const color = (car.exterior_color || car.color || '').toLowerCase();
        const stock = (car.stock_number || car.stock || car.id || '').toLowerCase();
        const engine = (car.engine || '').toLowerCase();

        if (!title.includes(query) && !body.includes(query) && !color.includes(query) && !stock.includes(query) && !engine.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, selectedMake, selectedModel, minYear, maxYear, keyword]);

  return (
    <div className="w-full bg-black min-h-screen py-6 px-4 md:px-8 font-sans text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#e3ba73] text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Home
          </Link>

          <div className="flex items-center gap-4 text-xs text-gray-300">
            <span className="hover:text-[#e3ba73] cursor-pointer flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Previous
            </span>
            <span className="text-gray-600">|</span>
            <span className="hover:text-[#e3ba73] cursor-pointer flex items-center gap-1 transition-colors">
              Next <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Dynamic Page Header */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl md:text-2xl font-light uppercase tracking-wide text-left"
          >
            Used Cars, SUVs, Trucks for sale
          </motion.h1>
          <p className="text-xs text-[#e3ba73] mt-1 tracking-wider uppercase font-medium">
            Certified Pre-Owned Vehicles
          </p>
        </div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#222226] border border-gray-800 p-4 rounded"
        >
          <div className="flex items-center gap-2 text-white font-bold mb-3 text-base">
            <Search className="w-4 h-4 text-[#e3ba73]" />
            <span className="uppercase text-sm tracking-wider">Search Inventory</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
            <select value={selectedMake} onChange={handleMakeChange} className="bg-white text-black p-2 text-sm rounded outline-none w-full cursor-pointer">
              <option value="">Any Make</option>
              {CAR_MAKES.map((make) => (
                <option key={make.value} value={make.value}>{make.label}</option>
              ))}
            </select>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake}
              className="bg-white text-black p-2 text-sm rounded outline-none w-full cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <option value="">{selectedMake ? 'Any Model' : 'Select Make First'}</option>
              {availableModels.map((model) => (
                <option key={model.value} value={model.value}>{model.label}</option>
              ))}
            </select>

            <select value={minYear} onChange={(e) => setMinYear(e.target.value)} className="bg-white text-black p-2 text-sm rounded outline-none w-full cursor-pointer">
              <option value="">Min Year</option>
              {YEARS.map((yr) => (
                <option key={yr.value} value={yr.value}>{yr.label}</option>
              ))}
            </select>

            <select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} className="bg-white text-black p-2 text-sm rounded outline-none w-full cursor-pointer">
              <option value="">Max Year</option>
              {YEARS.map((yr) => (
                <option key={yr.value} value={yr.value}>{yr.label}</option>
              ))}
            </select>

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="KEYWORD SEARCH"
              className="bg-white text-black p-2 text-sm rounded outline-none w-full placeholder:text-gray-500"
            />

            <button type="button" onClick={handleReset} className="bg-[#e3ba73] hover:bg-white text-black font-semibold p-2 text-sm rounded transition-colors w-full cursor-pointer uppercase tracking-wider">
              Reset
            </button>

            <button type="submit" className="bg-[#e3ba73] hover:bg-white text-black font-semibold p-2 text-sm rounded transition-colors flex items-center justify-center gap-1 w-full cursor-pointer uppercase tracking-wider">
              <Search className="w-4 h-4" />
              <span>SEARCH</span>
            </button>
          </form>
        </motion.div>

        {/* Count Bar */}
        <div className="bg-[#e3ba73] text-black px-4 py-2 flex items-center justify-between gap-2 rounded-t font-bold text-sm uppercase tracking-wider">
          <div>
            <span>{filteredVehicles.length} Vehicles Found</span>
          </div>
          <span className="text-xs normal-case text-black/80 font-normal hidden sm:inline">
            Prices exclude taxes & licensing
          </span>
        </div>

        {/* View Switcher */}
        <div className="bg-black py-2 flex justify-between items-center border-b border-gray-800">
          <span className="text-xs text-gray-400">Display View Option</span>
          <div className="bg-[#111111] border border-gray-800 p-1.5 rounded flex items-center gap-2">
            <List onClick={() => setViewMode('list')} className={`w-5 h-5 cursor-pointer transition-colors ${viewMode === 'list' ? 'text-[#e3ba73]' : 'text-gray-400 hover:text-white'}`} />
            <Grid onClick={() => setViewMode('grid')} className={`w-5 h-5 cursor-pointer transition-colors ${viewMode === 'grid' ? 'text-[#e3ba73]' : 'text-gray-400 hover:text-white'}`} />
          </div>
        </div>

        {/* Cars Listing */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#e3ba73] gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-semibold tracking-wider">Loading Live Inventory...</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-base bg-[#222226] border border-gray-800 rounded">
            No vehicles match your search criteria or no inventory uploaded yet.
          </div>
        ) : (
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
          >
            <AnimatePresence>
              {filteredVehicles.map((car) => {
                const imageUrl = car.images && car.images.length > 0 ? car.images[0] : (car.image || 'https://via.placeholder.com/600x400?text=No+Image');
                const carTitle = `${car.year} ${car.make} ${car.model}`;
                const displayMileage = car.mileage ? `${car.mileage.toLocaleString()} KM` : (car.odometer || 'N/A');

                return (
                  <motion.div
                    key={car.id}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="bg-[#222226] border border-gray-800 rounded overflow-hidden flex flex-col justify-between shadow-xl transition-all"
                  >
                    <div>
                      {/* Image Box */}
                      <div className="relative group overflow-hidden aspect-video bg-black">
                        <img src={imageUrl} alt={carTitle} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Link
                            to={`/CarDetails/${car.id}`}
                            className="bg-[#e3ba73] text-black font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-white transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>

                      {/* Checkbox Header */}
                      <div className="px-3 py-2 flex items-center gap-2 text-xs text-gray-300 border-b border-gray-800 bg-black/40">
                        <input
                          type="checkbox"
                          id={`compare-${car.id}`}
                          checked={selectedForCompare.includes(car.id)}
                          onChange={() => handleCompareToggle(car.id)}
                          className="cursor-pointer accent-[#e3ba73]"
                        />
                        <label htmlFor={`compare-${car.id}`} className="cursor-pointer select-none">Select For Compare</label>
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-3">
                        <Link to={`/CarDetails/${car.id}`} className="text-white font-light text-base hover:text-[#e3ba73] transition-colors block line-clamp-1">
                          {carTitle}
                        </Link>

                        <div className="flex justify-between items-end pb-2 border-b border-gray-700 text-sm">
                          <p className="text-[#e3ba73] font-bold text-lg">${car.price ? car.price.toLocaleString() : 'N/A'}</p>
                          <p className="text-gray-400 text-xs">Odometer: {displayMileage}</p>
                        </div>

                        {/* Specs Table */}
                        <div className="text-xs text-gray-300 space-y-1.5 pt-1">
                          <div className="flex justify-between border-b border-gray-800/80 pb-1"><span className="text-gray-500">Exterior Color</span><span>{car.exterior_color || car.color || 'N/A'}</span></div>
                          <div className="flex justify-between border-b border-gray-800/80 pb-1"><span className="text-gray-500">Stock #</span><span>{car.stock_number || car.stock || `#${car.id.substring(0, 6)}`}</span></div>
                          <div className="flex justify-between border-b border-gray-800/80 pb-1"><span className="text-gray-500">Body Style</span><span>{car.body_style || car.bodyStyle || 'Sedan'}</span></div>
                          <div className="flex justify-between border-b border-gray-800/80 pb-1"><span className="text-gray-500">Transmission</span><span>{car.transmission || 'Automatic'}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Engine</span><span>{car.engine || 'N/A'}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <Link to={`/CreditApplication?selected_vehicle=${car.id}`} className="bg-[#e3ba73] text-black font-semibold text-xs text-center py-2 rounded hover:bg-white transition-colors uppercase tracking-wider">
                        Financing
                      </Link>
                      <Link to={`/ContactUs?selected_vehicle=${car.id}`} className="bg-black border border-gray-700 text-white font-semibold text-xs text-center py-2 rounded hover:border-[#e3ba73] hover:text-[#e3ba73] transition-colors uppercase tracking-wider">
                        Contact Us
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
    </div>
  );
};

export default AllInventory;