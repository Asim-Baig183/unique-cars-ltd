import React from 'react';
import { motion } from 'framer-motion';

export const CreditApplicationPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-0 m-0 w-full overflow-hidden bg-black"
    >
      <div className="p-0 m-0 mb-3"></div>

      <div className="px-0 md:px-3 xl:px-4 py-0 m-0 w-full flex justify-center items-start">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row mb-3 gap-4 lg:gap-0">
          
          {/* Main iframe Container */}
          <div className="lg:pr-3 p-0 m-0 w-full lg:w-2/3 flex justify-center items-center">
            <iframe
              src="https://www.onlinx.ca/app/public/priority/app/index.html"
              style={{ border: 'none', width: '100%', display: 'block', margin: 0, padding: 0 }}
              height="3500"
              frameBorder="0"
              title="Priority Finance Credit Application"
            />
          </div>

          {/* Sidebar Banner */}
          <div className="bg-[#222222] p-2 lg:px-4 lg:py-3 m-0 mb-3 w-full lg:w-1/3 text-white">
            <div className="pt-5 lg:pt-0 m-0 xl:px-2 w-full">
              <p className="text-xl font-bold text-[#e3ba73]">
                Online Credit Application
              </p>
              
              <p className="mt-3 p-0 m-0 w-10/12 text-sm text-gray-300">
                Need help filling out your application? We would be happy to help you.
              </p>

              <div className="mt-4">
                <a href="/ContactUs" className="inline-block">
                  <button className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold px-4 py-2 rounded transition-colors text-sm flex items-center justify-center">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default CreditApplicationPage;