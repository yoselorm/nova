import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white font-nova"
    >
      {/* Animated Nova Logo */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
        className="w-20 h-20 bg-nova-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4"
      >
        N
      </motion.div>

      <div className="flex flex-col items-center">
        <span className="text-nova-blue font-bold tracking-[0.2em] text-sm uppercase">
          Nova Healthcare
        </span>
        <div className="w-48 h-[2px] bg-slate-100 mt-4 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-1/2 h-full bg-nova-sky"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;