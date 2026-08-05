import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { CustomSelect } from './CustomSelect';
import { type SearchFilterState } from './types';
import { CAR_MAKES } from '../../constants/Car-Makes';
import { CAR_MODELS, YEARS } from "../../constants/Car-Model";

export const AdvancedSearch: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilterState>({
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
  });

  const handleChange = (key: keyof SearchFilterState, value: string) => {
    setFilters((prev) => {
      if (key === 'make') {
        return {
          ...prev,
          make: value,
          model: '', 
        };
      }
      return { ...prev, [key]: value };
    });
  };

  // Selected Make ke dynamic models get karein
  const currentModels = filters.make ? CAR_MODELS[filters.make] || [] : [];

  const queryString = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, val]) => {
      if (val) acc[key] = val;
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return (
    <div className="w-full h-36 bg-[#222] p-2 md:p-3 lg:p-5 flex justify-center items-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-2">
        <div className="w-full lg:w-10/12">
          {/* Main 4-column layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <CustomSelect
              placeholder="ANY MAKE"
              value={filters.make}
              options={CAR_MAKES}
              onChange={(val) => handleChange('make', val)}
            />
            <CustomSelect
              placeholder={filters.make ? "ANY MODEL" : "SELECT MAKE FIRST"}
              value={filters.model}
              options={currentModels}
              disabled={!filters.make}
              onChange={(val) => handleChange('model', val)}
            />
            <div className="hidden sm:block">
              <CustomSelect
                placeholder="MIN YEAR"
                value={filters.minYear}
                options={YEARS}
                onChange={(val) => handleChange('minYear', val)}
              />
            </div>
            <div className="hidden sm:block">
              <CustomSelect
                placeholder="MAX YEAR"
                value={filters.maxYear}
                options={YEARS}
                onChange={(val) => handleChange('maxYear', val)}
              />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="grid grid-cols-2 gap-2 mt-2 sm:hidden">
            <CustomSelect
              placeholder="MIN YEAR"
              value={filters.minYear}
              options={YEARS}
              onChange={(val) => handleChange('minYear', val)}
            />
            <CustomSelect
              placeholder="MAX YEAR"
              value={filters.maxYear}
              options={YEARS}
              onChange={(val) => handleChange('maxYear', val)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-2/12 mt-2 lg:mt-0">
          <a href={`/inventory?${queryString}`} className="no-underline block w-full">
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-black hover:bg-[#E3BA73] text-[#E3BA73] hover:text-black font-semibold text-sm border transition-colors duration-300 flex items-center justify-center gap-2 rounded-sm uppercase tracking-wider cursor-pointer"
            >
              <FaSearch className="w-4 h-4 stroke-[2.5]" />
              SEARCH
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};