import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh]  bg-black overflow-hidden select-none">
      {/* 1. Background Image Slider */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-200' : 'opacity-0'
            }`}
        >
          <img
            src={slide}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Dark overlay gradient behind text */}
      <div className="absolute inset-0 " />

      {/* 2. Content Overlay */}
      <div className="  relative z-10  h-full flex items-center">

        {/* Animated Border Wrapper */}
        <div className="relative min-w-full p-[1.5px] overflow-hidden">

          {/* Border Light Animation */}
          <div className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#e3ba73_360deg)] opacity-90" />

          {/* Inner Box (Your Exact Code) */}
          <div className='relative z-10 min-w-full bg-[#00000091] flex justify-center '>
            <div className="  grid grid-cols-1 lg:grid-cols-12 gap-8  justify-center  items-center py-10">

              {/* Left Side: Welcome Text & CTA Buttons */}
              <div className=" lg:col-span-6 space-y-4 ml-">
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

              {/* Center Divider Line (Desktop only) */}
              <div className="w-0.5">
                <div className="h-48  bg-white/20" />
              </div>

              {/* Right Side: Quick Brand Links */}
              <div className=" lg:col-span-5 hidden lg:flex flex-col space-y-4 pl-4">

                {/* Mercedes-Benz */}
                <a
                  href="/cars?make=Mercedes-benz"
                  className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all duration-500 ease-in-out hover:-translate-x-1 hover:scale-115 group"
                >
                  <img
                    src="https://uniquecars.ca/images/home/search/Benz.png"
                    alt="Mercedes-Benz"
                    className="w-8"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xs font-light tracking-widest uppercase">Mercedes-Benz</span>
                </a>
                {/* BMW */}
                <a
                  href="/cars?make=Bmw"
                  className="flex items-center justify-end space-x-3 text-white/90 border-b border-white/10 pb-2 text-right transition-all duration-500 ease-in-out hover:-translate-x-1 hover:scale-115 group"
                >
                  <span className="text-xs font-light tracking-widest uppercase">BMW</span>
                  <img
                    src="https://uniquecars.ca/images/home/search/bmw.png"
                    alt="BMW"
                    className="w-9"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </a>

                {/* Audi */}
                <a
                  href="/cars?make=audi"
                  className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all  duration-500 ease-in-out hover:translate-x-1 hover:scale-115 group"
                >
                  <img
                    src="https://uniquecars.ca/images/home/search/Audi.png"
                    alt="Audi"
                    className="h-6"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xs font-light tracking-widest uppercase">Audi</span>
                </a>
                {/* Lexus */}
                <a
                  href="/cars?make=Lexus"
                  className="flex items-center justify-end space-x-3 text-white/90 border-b border-white/10 pb-2 text-right transition-all duration-500 ease-in-out hover:-translate-x-1 hover:scale-115 group"
                >
                  <span className="text-xs font-light tracking-widest uppercase">Lexus</span>
                  <img
                    src="https://uniquecars.ca/images/home/search/Lexus.png"
                    alt="Lexus"
                    className="h-6"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </a>

                {/* Other */}
                <a
                  href="/cars"
                  className="flex items-center space-x-3 text-white/90 border-b border-white/10 pb-2 transition-all duration-500 ease-in-out hover:-translate-x-1 hover:scale-115 group"
                >
                  <img
                    src="https://uniquecars.ca/images/home/search/Other.png"
                    alt="Other Makes"
                    className=""
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