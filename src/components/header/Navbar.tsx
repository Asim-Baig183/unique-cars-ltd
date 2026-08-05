import React, { useState } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <nav className="w-full bg-[#191919] text-white  relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="inline-block">
              <img
                src="https://image123.azureedge.net/uniquecarsltd/42866094474054073-cropped-colourLogo-1-1.png"
                alt="Unique Cars Ltd"
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-semibold tracking-wider text-white">
            <a href="/" className="px-3 py-2">
              HOME
            </a>

            {/* Showroom Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('showroom')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2  uppercase">
                <span>Showroom</span>
                <FaChevronDown size={10} className="text-gray-500" />
              </button>
              {activeDropdown === 'showroom' && (
                <div className="absolute top-full left-0 w-52 bg-[#383838] shadow-lg py-2 text-xs text-white">
                  <Link to="/inventory" className="block px-4 py-2 hover:bg-black">
                    ALL INVENTORY
                  </Link>
                  <Link to="/CarFinderPage" className="block px-4 py-2 hover:bg-black ">
                     CAR FINDER
                     </Link>
                <Link to="/AppraiseTrade" className="block px-4 py-2 hover:bg-black ">
                    APPRAISE MY TRADE
                  </Link>
                </div>
              )}
            </div>

            {/* Financing Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('financing')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2  uppercase">
                <span>Financing</span>
                <FaChevronDown size={10} className="text-gray-500" />
              </button>
              {activeDropdown === 'financing' && (
                <div className="absolute top-full left-0 w-52 bg-[#383838] shadow-lg  py-2 text-xs text-white">
                  <Link to="/FinanceCalculator" className="block px-4 py-2 hover:bg-black ">
                    FINANCING CALCULATOR
                  </Link>
                   <Link to="/CreditApplication" className="block px-4 py-2 hover:bg-black ">
                    FINANCING APPLICATION
                  </Link>
                </div>
              )}
            </div>
            {/* Dealership Dropdowns */}
             <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('Dealership')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2  uppercase">
                <span>DEALERSHIP</span>
                <FaChevronDown size={10} className="text-gray-500" />
              </button>
              {activeDropdown === 'Dealership' && (
                <div className="absolute top-full left-0 w-52 bg-[#383838] shadow-lg  py-2 text-xs text-white">
                  <Link to="/AboutUs" className="block px-4 py-2 hover:bg-black ">
                    ABOUT US
                  </Link>
                   <Link to="/ContactUs" className="block px-4 py-2 hover:bg-black ">
                    CONTACT US
                  </Link>
                  <Link to="/Directions" className="block px-4 py-2 hover:bg-black ">
                    DIRECTIONS
                  </Link>
                </div>
              )}
            </div>
            {/* Text Us Now Button */}
            <Link to="/TextUs" className="ml-2 px-4 py-2  text-white rounded text-xs animate-pulse transition-colors">
             TEXT US NOW
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#e3ba73] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-6 space-y-3 text-sm font-semibold text-gray-800">
          <a href="/" className="block py-2 border-b border-gray-100">
            HOME
          </a>

          <div>
            <button
              onClick={() => toggleDropdown('mobileShowroom')}
              className="w-full flex justify-between items-center py-2 border-b border-gray-100"
            >
              <span>SHOWROOM</span>
              <FaChevronDown size={12} className={activeDropdown === 'mobileShowroom' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeDropdown === 'mobileShowroom' && (
              <div className="pl-4 py-2 space-y-2 bg-gray-50 text-xs">
                <a href="/inventory" className="block py-1">ALL INVENTORY</a>
                <a href="/" className="block py-1">FEATURED VEHICLES</a>
                <a href="/CarFinderPage" className="block py-1">CAR FINDER</a>
                <a href="/AppraiseTrade" className="block py-1">APPRAISE MY TRADE</a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleDropdown('mobileFinancing')}
              className="w-full flex justify-between items-center py-2 border-b border-gray-100"
            >
              <span>FINANCING</span>
              <FaChevronDown size={12} className={activeDropdown === 'mobileFinancing' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeDropdown === 'mobileFinancing' && (
              <div className="pl-4 py-2 space-y-2 bg-gray-50 text-xs">
                <a href="/FinanceCalculator" className="block py-1">FINANCING CALCULATOR</a>
                <a href="/CreditApplication" className="block py-1">FINANCING APPLICATION</a>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleDropdown('mobiledealership')}
              className="w-full flex justify-between items-center py-2 border-b border-gray-100"
            >
              <span>DEALERSHIP</span>
              <FaChevronDown size={12} className={activeDropdown === 'mobiledealership' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeDropdown === 'mobiledealership' && (
              <div className="pl-4 py-2 space-y-2 bg-gray-50 text-xs">
                <a href="/AboutUs" className="block py-1">ABOUT US</a>
                <a href="/ContactUs" className="block py-1">CONTACT US</a>
                 <a href="/Directions" className="block py-2 border-b border-gray-100"> DIRECTIONS</a>
              </div>
            )}
          </div>
          <a
            href="/TextUs"
            className="block text-center mt-4 py-2.5 bg-[#e3ba73] text-slate-900 rounded font-bold"
          >
            TEXT US NOW
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;