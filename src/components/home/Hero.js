import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight, MousePointer2 } from 'lucide-react';
import homeherobg from '../../assets/images/herobg.jpg';

const Hero = () => {
  // Ultra-Premium Easing (The "Apple" Feel)
  const masterEase = [0.16, 1, 0.3, 1];

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden font-nova bg-slate-950">
      
      {/* --- BACKGROUND LAYER: PARALLAX ZOOM --- */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: masterEase }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeherobg})` }}
      >
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
      </motion.div>

      {/* --- ARCHITECTURAL GRID OVERLAY (The "Mad" Detail) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Vertical Lines that "Draw" on load */}
        <motion.div 
          initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, delay: 0.5, ease: masterEase }}
          className="absolute left-[10%] w-[1px] bg-white/10" 
        />
        <motion.div 
          initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, delay: 0.7, ease: masterEase }}
          className="absolute left-[50%] w-[1px] bg-white/5" 
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-end lg:items-center justify-between pt-20">
        
        <div className="max-w-4xl">
          {/* 1. PILL REVEAL */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: masterEase }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full mb-10"
          >
            <span className="w-1.5 h-1.5 bg-nova-sky rounded-full animate-ping" />
            <span className="text-nova-sky text-[9px] font-black uppercase tracking-[0.4em]">
              Architects of Health // Est. 2015
            </span>
          </motion.div>
          
          {/* 2. TEXT CLIP MASK REVEAL (The "Mad" Part) */}
          <div className="overflow-hidden mb-4">
             <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1, ease: masterEase }}
                className="text-white text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter"
             >
               WE PROVIDE
             </motion.h1>
          </div>

          <div className="overflow-hidden mb-12">
            <motion.h1 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 1.2, delay: 1.2, ease: masterEase }}
               className="text-6xl md:text-[6rem] font-light italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-nova-sky via-white to-white/20"
            >
              Exceptional Care.
            </motion.h1>
          </div>
          
          {/* 3. PARAGRAPH SLIDE UP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: masterEase }}
          >
            <p className="text-white/50 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-medium border-l border-nova-sky/30 pl-8">
              Nova Surgery Center is a specialist primary hospital dedicated to the 
              principle that patient satisfaction is our <span className="text-white">number one priority.</span>
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#00E5FF" }}
                whileTap={{ scale: 0.95 }}
                className="bg-nova-sky text-nova-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_20px_50px_rgba(0,229,255,0.2)] transition-all flex items-center gap-4 group"
              >
                Inquire Now
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <button className="text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center gap-4 group">
                <span className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-nova-sky transition-all" />
                View Units
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- INTERACTIVE VERTICAL NAV (Mad Sidebar) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: masterEase }}
          className="hidden xl:flex flex-col gap-16 border-l border-white/10 pl-12"
        >
          {[
            { id: '01', title: 'Surgery', active: true },
            { id: '02', title: 'Fertility', active: false },
            { id: '03', title: 'Pharmacy', active: false }
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <p className={`text-4xl font-black transition-all ${item.active ? 'text-nova-sky scale-110' : 'text-white/10 group-hover:text-white/40'}`}>
                {item.id}
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-2 transition-all ${item.active ? 'text-white' : 'text-white/5 group-hover:text-white/20'}`}>
                {item.title}
              </p>
            </div>
          ))}
        </motion.div>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-nova-sky to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;