import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Slide images
const SLIDES = [
  'https://image123.azureedge.net/uniquecarsltd/6415275459941514-uniq-slider01.webp',
  'https://image123.azureedge.net/uniquecarsltd/8408785452435623-uniq-slider02.webp',
  'https://image123.azureedge.net/uniquecarsltd/6625428026976077-uniq-slider03.webp',
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] bg-black overflow-hidden select-none">
      
      {/* 1. Background Image Slider */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Dark overlay behind text (Desktop only) */}
      <div className="hidden lg:block absolute inset-0"/>

      {/* 2. Quick Action Bar (Visible ONLY on Mobile & Tablet: lg:hidden) */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm py-3 px-4 border-t border-white/10">
        <div className="grid grid-cols-3 items-center justify-items-center">
          
          {/* Call Link */}
          <div className="w-full flex justify-center border-r border-white/20">
             <Link
              to="/TextUs"
              className="text-[#ccc] hover:text-[#e3ba73] transition-colors p-1"
              aria-label="Directions"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
              </svg>
            </Link>
          </div>

          {/* Directions Link */}
          <div className="w-full flex justify-center border-r border-white/20">
            <Link
              to="/Directions"
              className="text-[#ccc] hover:text-[#e3ba73] transition-colors p-1"
              aria-label="Directions"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 384 512"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path>
              </svg>
            </Link>
          </div>

          {/* Contact Us Link */}
          <div className="w-full flex justify-center">
            <Link
              to="/ContactUs"
              className="text-[#ccc] hover:text-[#e3ba73] transition-colors p-1"
              aria-label="Contact Us"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path>
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* 3. Main Content Overlay (Desktop Only: hidden lg:flex, Full Width) */}
      <div className="hidden lg:flex relative z-10 w-full h-full items-center justify-center">

        {/* Outer Card Wrapper (Full Screen Width) */}
        <div className="relative w-full overflow-hidden">
          
          {/* Animated SVG Border Light (Top & Bottom Tracer Lines) */}
         <svg
  className="absolute inset-0 w-full h-full pointer-events-none z-20"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
>
  {/* Light 1: Top Border Tracer (Faster & Long) */}
  <motion.line
    x1="0%"
    y1="0%"
    x2="100%"
    y2="0%"
    stroke="#e3ba73"
    strokeWidth="3"
    // Fix: Exact 2 lights ke liye ratio adjust kiya
    strokeDasharray="400 1000" 
    initial={{ strokeDashoffset: 1400 }}
    animate={{ strokeDashoffset: 0 }}
    transition={{
      duration: 2.5, // FIX: Speed tez (4s se 2.5s)
      repeat: Infinity,
      ease: "linear",
    }}
  />

  {/* Light 2: Bottom Border Tracer (Faster & Long) */}
  <motion.line
    x1="100%"
    y1="100%"
    x2="0%"
    y2="100%"
    stroke="#e3ba73"
    strokeWidth="3"
    // Fix: Exact 2 lights ke liye ratio adjust kiya
    strokeDasharray="400 1000"
    initial={{ strokeDashoffset: 1400 }}
    animate={{ strokeDashoffset: 0 }}
    transition={{
      duration: 1.5, // FIX: Speed tez (4s se 2.5s)
      repeat: Infinity,
      ease: "linear",
    }}
  />
</svg>

          {/* Inner Content Box (Full Width Container) */}
          <div className="relative z-10 w-full bg-[#00000091] px-6 py-8 md:px-16 md:py-12 flex justify-center">
            
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Side: Welcome Text & CTA Buttons */}
              <div className="lg:col-span-6 space-y-4">
                <h1 className="text-white text-lg sm:text-2xl font-light tracking-[0.2em] uppercase">
                  Welcome to Unique Cars Ltd
                </h1>

                <p className="text-white text-sm sm:text-base font-semibold tracking-wide">
                  Quality Pre-Owned Vehicles
                </p>

                <p className="text-gray-300 text-xs tracking-wider uppercase">
                  Great Selections. Great Prices.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/CreditApplication"
                    className="px-6 py-2.5 border border-[#e3ba73] text-[#e3ba73] text-xs font-medium uppercase tracking-wider text-center hover:bg-[#e3ba73] hover:text-black transition-all duration-300"
                  >
                    Apply For Financing
                  </Link>
                  <Link
                    to="/inventory"
                    className="px-6 py-2.5 border border-[#e3ba73] text-[#e3ba73] text-xs font-medium uppercase tracking-wider text-center hover:bg-[#e3ba73] hover:text-black transition-all duration-300"
                  >
                    View Our Inventory
                  </Link>
                </div>
              </div>

              {/* Center Divider Line */}
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <div className="h-48 w-px bg-white/20" />
              </div>

              {/* Right Side: Quick Brand Links */}
             <div className="lg:col-span-5 hidden lg:flex flex-col space-y-4 pl-4">

  {/* Mercedes-Benz */}
  <a
    href="/cars?make=Mercedes-benz"
    className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all duration-300 ease-in-out hover:-translate-x-6 group"
  >
    <img
      src="https://uniquecars.ca/images/home/search/Benz.png"
      alt="Mercedes-Benz"
      className="w-8 transition-transform duration-300 group-hover:scale-150"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="text-xs font-light tracking-widest uppercase">Mercedes-Benz</span>
  </a>

  {/* BMW */}
  <a
    href="/cars?make=Bmw"
    className="flex items-center justify-end space-x-3 text-white/90 border-b border-white/10 pb-2 text-right transition-all duration-200 ease-in-out hover:-translate-x-6 group"
  >
    <span className="text-xs font-light tracking-widest uppercase">BMW</span>
    <img
      src="https://uniquecars.ca/images/home/search/bmw.png"
      alt="BMW"
      className="w-9 transition-transform duration-300 group-hover:scale-150"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </a>

  {/* Audi */}
  <a
    href="/cars?make=audi"
    className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all duration-200 ease-in-out hover:translate-x-6 group"
  >
    <img
      src="https://uniquecars.ca/images/home/search/Audi.png"
      alt="Audi"
      className="h-6 transition-transform duration-300 group-hover:scale-150"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="text-xs font-light tracking-widest uppercase">Audi</span>
  </a>

  {/* Lexus */}
  <a
    href="/cars?make=Lexus"
    className="flex items-center justify-end space-x-3 text-white/90 border-b border-white/10 pb-2 text-right transition-all duration-200 ease-in-out hover:-translate-x-6 group"
  >
    <span className="text-xs font-light tracking-widest uppercase">Lexus</span>
    <img
      src="https://uniquecars.ca/images/home/search/Lexus.png"
      alt="Lexus"
      className="h-6 transition-transform duration-300 group-hover:scale-150"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </a>

  {/* Other */}
  <a
    href="/cars"
    className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all duration-200 ease-in-out hover:-translate-x-6 group"
  >
    <img
      src="https://uniquecars.ca/images/home/search/Other.png"
      alt="Other Makes"
      className="h-5 transition-transform duration-300 group-hover:scale-110"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="text-xs font-light tracking-widest uppercase">Other</span>
  </a>

</div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}