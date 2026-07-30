import React from 'react';
import { Link } from 'react-router-dom';

export interface FeaturedInventoryProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  children?: React.ReactNode; // For passing your Swiper slider inside if needed
}

export const FeaturedInventory: React.FC<FeaturedInventoryProps> = ({
  title = 'FEATURED INVENTORY',
  subtitle = 'New and popular items at competitive prices.',
  buttonText = 'SEE MORE VEHICLES',
  children,
}) => {
  return (
    <section className="w-full bg-[#1c1c1e] text-white py-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center space-y-5">
        
        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white uppercase">
          {title}
        </h2>

        {/* Subtitle */}
        <p className=" text-sm sm:text-base font-normal tracking-wide">
          {subtitle}
        </p>

        {/* Carousel / Cards (Placed here if you pass Swiper inside) */}
        {children && <div className="w-full my-6">{children}</div>}

        {/* Thin Gold Bordered Button */}
        <div className="pt-6">
          <Link
          to="/inventory"
           className="inline-flex items-center justify-center gap-2 px-8 py-3  border e3ba73  bg-black text-[#e3ba73]  hover:text-black hover:bg-[#e3ba73] text-sm tracking-widest uppercase transition-all duration-200"
          >
             <span>{buttonText}</span>
          <svg
              className="w-2.5 h-2.5 fill-current"
              viewBox="0 0 256 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedInventory;