import React from 'react';

export const CopyrightBar: React.FC = () => {
  return (
    <div className="w-full bg-[#111111] py-2 text-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-xs md:text-[13px]">
        {/* Copyright */}
        <div>
          <a href="/" className="hover:underline text-white">
            <p className="m-0 p-0">© 2026 Unique Cars Ltd.</p>
          </a>
        </div>

        {/* Separator / Links / Provider */}
        <div className="flex items-center justify-center gap-1 md:gap-2 text-white">
          <span className="hidden md:inline">|</span>
          <a href="/privacy" className="hover:underline text-white">
            <p className="m-0 p-0 px-1">Privacy & Policy</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CopyrightBar;