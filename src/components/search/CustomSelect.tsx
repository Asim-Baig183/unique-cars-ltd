import React from 'react';
import { FaChevronDown } from "react-icons/fa";
import type { SelectOption } from './types';

interface CustomSelectProps {
  placeholder: string;
  value: string;
  options?: SelectOption[];
  onChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  value,
  options = [],
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center justify-between w-full bg-white border border-gray-300 
      rounded-sm px-3 py-2 text-sm cursor-pointer focus-within:ring-2 focus-within:ring-amber-500">
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400 font-normal uppercase'}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <FaChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 text-black w-full h-full opacity-0 cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};