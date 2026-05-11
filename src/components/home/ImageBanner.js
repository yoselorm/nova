import React from 'react';
import { motion } from 'framer-motion';
import imageBanner from '../../assets/images/ImageBanner.png'

const PureImageBanner = ({ imagePath }) => {
  return (
    <section className="relative w-full py-16 bg-[#FAFBFF] overflow-hidden font-nova">
      
      {/* --- ARCHITECTURAL WALL DESIGNS (Background Layer) --- */}
      {/* Technical Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      {/* Abstract Structural Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-100 hidden lg:block" />
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-slate-100 hidden lg:block" />

      <div className="max-w-[1440px] mx-auto px-6 relative">
        
        {/* CORNER BRACKETS - These create the 'Architectural' feel */}
        <div className="absolute -top-4 -left-2 w-20 h-20 border-t border-l border-nova-sky/30 rounded-tl-[3rem] z-20" />
        <div className="absolute -bottom-4 -right-2 w-20 h-20 border-b border-r border-nova-sky/30 rounded-br-[3rem] z-20" />

        {/* MAIN IMAGE CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[400px] md:h-[500px] w-full rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-[12px] border-white group"
        >
          {/* The Image */}
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 2 }}
            src={imageBanner} 
            alt="Nova Healthcare Facility" 
            className="w-full h-full object-cover"
          />

          {/* GRADIENT OVERLAY - Subtle dark fade to match the Hero section depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
          
          {/* FLOATING DESIGN DETAIL (Bottom Right) */}
          <div className="absolute bottom-10 right-10 flex items-center gap-4">
             <div className="h-[1px] w-12 bg-white/40" />
             <div className="w-2 h-2 rounded-full bg-nova-sky animate-pulse" />
          </div>
        </motion.div>

        {/* BOTTOM CAPTION BAR (Floating architectural element) */}
        <div className="mt-8 flex justify-between items-center px-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
           <span>Nova Facility Exterior</span>
           <span>East Legon, Ghana</span>
        </div>
      </div>
    </section>
  );
};

export default PureImageBanner;