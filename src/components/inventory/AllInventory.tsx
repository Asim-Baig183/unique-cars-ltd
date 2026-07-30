import React, { useState, useEffect, useMemo } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Make sure path is correct
import { CAR_MAKES, YEARS } from '../../constants/Car-Makes';
import { CAR_MODELS } from '../../constants/Car-Model';

// Vehicle Type definition strictly based on database structure
interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  odometer?: string;
  transmission?: string;
  fuel_type?: string;
  description?: string;
  images?: string[];
  image?: string;
  bodyStyle?: string;
  color?: string;
  stock?: string;
  engine?: string;
  title?: string;
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

  // 1. Fetch Cars from Supabase DB on Component Mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Fallback property mapping for compatibility
        const mappedData: Vehicle[] = (data || []).map((car: any) => ({
          ...car,
          title: car.title || `${car.year} ${car.make} ${car.model}`,
          image: car.images && car.images.length > 0 ? car.images[0] : 'https://via.placeholder.com/600x400?text=No+Image',
          odometer: car.odometer || (car.mileage ? `${car.mileage.toLocaleString()} mi` : 'N/A'),
          color: car.color || car.fuel_type || 'N/A',
          bodyStyle: car.bodyStyle || 'SUV/Sedan',
          stock: car.stock || car.id.substring(0, 6).toUpperCase(),
          engine: car.engine || 'Standard'
        }));

        setVehicles(mappedData);
      } catch (err: any) {
        console.error('Error fetching inventory from Supabase:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
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

  // 2. Dynamic Filtering on Live Supabase Vehicles Data
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((car) => {
      // Make Filter
      if (selectedMake && car.make?.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }
      // Model Filter
      if (selectedModel && car.model?.toLowerCase() !== selectedModel.toLowerCase()) {
        return false;
      }
      // Min Year Filter
      if (minYear && car.year < parseInt(minYear, 10)) {
        return false;
      }
      // Max Year Filter
      if (maxYear && car.year > parseInt(maxYear, 10)) {
        return false;
      }
      // Keyword Filter
      if (keyword.trim() !== '') {
        const query = keyword.toLowerCase().trim();
        const matchesTitle = car.title?.toLowerCase().includes(query) || false;
        const matchesBody = car.bodyStyle?.toLowerCase().includes(query) || false;
        const matchesColor = car.color?.toLowerCase().includes(query) || false;
        const matchesStock = car.stock?.toLowerCase().includes(query) || false;
        const matchesEngine = car.engine?.toLowerCase().includes(query) || false;

        if (!matchesTitle && !matchesBody && !matchesColor && !matchesStock && !matchesEngine) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, selectedMake, selectedModel, minYear, maxYear, keyword]);

  return (
    <div className="w-full bg-black min-h-screen py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-lg md:text-xl font-bold mb-4 text-left"
        >
          Used Cars, SUVs, Trucks for sale in Hamilton Ontario
        </motion.h1>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#222222] p-4 rounded mb-6"
        >
          <div className="flex items-center gap-2 text-white font-bold mb-3 text-base">
            <Search className="w-4 h-4 text-[#e3ba73]" />
            <span>Search</span>
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

            {/* KEYWORD SEARCH INPUT */}
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="KEYWORD SEARCH"
              className="bg-white text-black p-2 text-sm rounded outline-none w-full"
            />

            <button type="button" onClick={handleReset} className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold p-2 text-sm rounded transition-colors w-full cursor-pointer">
              Reset
            </button>

            <button type="submit" className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold p-2 text-sm rounded transition-colors flex items-center justify-center gap-1 w-full cursor-pointer">
              <Search className="w-4 h-4" />
              <span>SEARCH</span>
            </button>
          </form>
        </motion.div>

        {/* Count Bar */}
        <motion.div className="bg-[#e3ba73] text-black px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 rounded-t">
          <div className="font-bold text-sm md:text-base">
            <span>{filteredVehicles.length} Vehicles Found</span>
          </div>
        </motion.div>

        {/* View Switcher */}
        <div className="bg-black py-3 flex justify-end items-center">
          <div className="bg-[#111111] border border-gray-800 p-1.5 rounded flex items-center gap-2">
            <List onClick={() => setViewMode('list')} className={`w-5 h-5 cursor-pointer ${viewMode === 'list' ? 'text-[#e3ba73]' : 'text-white'}`} />
            <Grid onClick={() => setViewMode('grid')} className={`w-5 h-5 cursor-pointer ${viewMode === 'grid' ? 'text-[#e3ba73]' : 'text-white'}`} />
          </div>
        </div>

        {/* Loader or Cars Listing */}
        {loading ? (
          <div className="text-center text-[#e3ba73] py-20 text-lg animate-pulse font-semibold">
            Fetching Live Inventory from Database...
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center text-white py-12 text-lg">
            No vehicles match your search criteria.
          </div>
        ) : (
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
          >
            <AnimatePresence>
              {filteredVehicles.map((car) => (
                <motion.div
                  key={car.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="bg-[#111111] border border-white/20 rounded shadow-lg overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative group overflow-hidden aspect-4/3">
                      <img 
                        src={car.image} 
                        alt={car.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link
                          to={`/CarDetails/${car.id}`}
                          className="bg-[#e3ba73] text-black font-semibold text-xs md:text-sm px-4 py-2 rounded hover:bg-[#cdaf63] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 flex items-center gap-2 text-xs text-white border-b border-gray-800">
                      <input
                        type="checkbox"
                        id={`compare-${car.id}`}
                        checked={selectedForCompare.includes(car.id)}
                        onChange={() => handleCompareToggle(car.id)}
                        className="cursor-pointer accent-[#e3ba73]"
                      />
                      <label htmlFor={`compare-${car.id}`} className="cursor-pointer">Select For Compare</label>
                    </div>

                    <div className="p-3">
                      <Link to={`/CarDetails/${car.id}`} className="text-white font-bold text-base hover:text-[#e3ba73] transition-colors block mb-1">
                        {car.title}
                      </Link>

                      <div className="flex justify-between items-end pb-2 border-b border-gray-200/20 text-xs md:text-sm">
                        <p className="text-[#e3ba73] font-bold">Price: ${car.price?.toLocaleString()}</p>
                        <p className="text-gray-300">Odometer: {car.odometer}</p>
                      </div>

                      <div className="text-xs text-gray-300 space-y-1 mt-2">
                        <div className="flex justify-between border-b border-gray-800 pb-0.5"><span>Fuel / Color</span><span>{car.color}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-0.5"><span>Stock #</span><span>{car.stock}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-0.5"><span>Body Style</span><span>{car.bodyStyle}</span></div>
                        <div className="flex justify-between border-b border-gray-800 pb-0.5"><span>Transmission</span><span>{car.transmission}</span></div>
                        <div className="flex justify-between"><span>Engine</span><span>{car.engine}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 pt-0 grid grid-cols-2 gap-2">
                    <Link to={`/forms/financing?selected_vehicle=${car.id}`} className="bg-[#e3ba73] text-black font-semibold text-xs text-center py-2 rounded hover:bg-[#cdaf63]">
                      Financing
                    </Link>
                    <Link to={`/forms/contact-us?selected_vehicle=${car.id}`} className="bg-[#e3ba73] text-black font-semibold text-xs text-center py-2 rounded hover:bg-[#cdaf63]">
                      Contact Us
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllInventory;