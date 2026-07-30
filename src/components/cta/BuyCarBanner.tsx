import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface BuyCarBannerProps {
  title?: string;
  subtitle?: string;
}

export const BuyCarBanner: React.FC<BuyCarBannerProps> = ({
  title = 'BUY YOUR CAR!',
  subtitle = 'Shop the car of your dreams from our huge selection!',
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-32 bg-[#111] text-white py-8 flex items-center md:py-12 px-4 sm:px-6 lg:px-12 border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Left Side: Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col items-center md:items-center text-center md:text-left space-y-2"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide text-center uppercase">
            {title}
          </h2>
          <p className="text-base sm:text-2xl font-normal">
            {subtitle}
          </p>
        </motion.div>

        {/* Right Side: Action Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="w-full md:w-auto min-w-50 flex justify-center md:justify-end"
        >
          <Link
            to="/inventory"
            className="w-full sm:w-auto inline-block text-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#e3ba73] text-[#e3ba73] hover:text-black hover:bg-[#e3ba73] font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer"
            >
              Buy Your car
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default BuyCarBanner;