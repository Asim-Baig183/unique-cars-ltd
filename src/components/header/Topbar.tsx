import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookSquare, FaInstagram } from 'react-icons/fa';

export const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-[#191919] text-white text-[15px] py-1.5 px-4 
    hidden lg:block border-b border-slate-800">
      <div className="max-w-[100rem] mx-auto flex justify-end items-center space-x-6">
        
        {/* Address */}
        <a
          href="/directions"
          className="flex items-center space-x-1.5 text-[#e3ba73] hover:text-[#e3ba73] transition-colors pr-4 border-r border-[#e3ba73]/40"
        >
          <FaMapMarkerAlt className="text-[#e3ba73]" size={13} />
          <address className="not-italic">
            1575 Main St E, Hamilton, Ontario, L8H 1C4
          </address>
        </a>

        {/* Phone */}
        <a
          href="tel:9055802102"
          className="flex items-center space-x-1.5 text-[#e3ba73] hover:text-[#e3ba73] transition-colors pr-4 border-r border-[#e3ba73]/40"
        >
          <FaPhoneAlt className="text-[#e3ba73]" size={13} />
          <span className="">905-580-2102</span>
        </a>

        {/* Social Icons */}
        <div className="flex items-center space-x-3 pl-1">
          <a
            href="https://www.facebook.com/uniquecars.ca/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white hover:text-[#e3ba73] transition-colors"
          >
            <FaFacebookSquare size={17} />
          </a>
          <a
            href="https://www.instagram.com/uniquecarsltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:text-[#e3ba73] transition-colors"
          >
            <FaInstagram size={17} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;