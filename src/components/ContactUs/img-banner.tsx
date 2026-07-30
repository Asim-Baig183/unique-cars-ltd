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
    <div className="p-0 m-0 w-full">
      <div className="p-0 m-0 py-0 w-full row h-full flex flex-col justify-center items-center">
        <div className="p-0 m-0 w-full col-12 justify-start items-start relative">
          <div className="p-0 m-0 px-5 w-full">
            <div className="p-0 px-2 m-0">
              <img
                src="https://image123.azureedge.net/uniquecarsltd/845289691484086-uniq-countactus.webp"
                alt="https://image123.azureedge.net/uniquecarsltd/845289691484086-uniq-countactus.webp"
                className="object-center left-0"
              />
            </div>
          </div>
        </div>
        <div className="p-0 m-0 flex col-12 lg:col-12 flex-col items-start justify-start">
          <div className="p-0 m-0">
            <h2 className="my-2 m-0 p-0 mb-2 flex items-start justify-start"></h2>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default ImgBanner;