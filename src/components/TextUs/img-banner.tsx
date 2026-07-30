import React from 'react';
import { motion } from 'framer-motion';

export const ImgBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-0 m-0 mb-3 w-full bg-black"
    >
      <div className="p-0 m-0 w-full flex flex-col justify-center items-center">
        <div className="p-0 m-0 w-full relative">
          <div className="p-0 m-0 px-0 sm:px-5 w-full">
            <div className="p-0 px-0 sm:px-2 m-0 w-full flex justify-center">
              <img
                src="https://image123.azureedge.net/uniquecarsltd/603282014272299-uniq-textus.webp"
                alt="Text Us Banner"
                className="w-full h-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImgBanner;