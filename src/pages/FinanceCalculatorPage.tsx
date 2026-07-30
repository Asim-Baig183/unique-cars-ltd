import React from 'react';
import { motion } from 'framer-motion';
import ImgBanner from '../components/Finance-Calculator/img-banner';
import FinanceCalculator from '../components/Finance-Calculator/Calculator';

export const FinanceCalculatorPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-black min-h-screen"
    >
      <ImgBanner />
      <FinanceCalculator />
    </motion.div>
  );
};

export default FinanceCalculatorPage;