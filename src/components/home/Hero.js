import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import homeherobg from '../../assets/images/herobg.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden font-nova">
      
      {/* --- BACKGROUND LAYER --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url(${homeherobg})` }}
      >
        {/* THE DARK OVERLAY: Neutral black/grey gradient for that premium cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20 z-10" />
      </div>

      {/* --- TOP FLOATING BAR (Architectural Detail) --- */}
      <div className="absolute top-0 left-0 w-full z-30 hidden lg:block border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-end gap-8 text-white/80 text-xs font-bold tracking-widest">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-nova-sky" />
            <span>CONTACT US: +233 (0) XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-nova-sky" />
            <span>MON - SAT: 8:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Minimalist Pill Tag */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-nova-sky rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                Pioneering West African Surgery
              </span>
            </div>
            
            <h1 className="text-white text-6xl md:text-8xl font-bold leading-[1] mb-8 tracking-tighter">
              We Provide <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
                Exceptional Care.
              </span>
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-medium">
              Nova Surgery Center is a specialist primary hospital dedicated to the 
              principle that patient satisfaction is our number one priority.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-nova-sky text-nova-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center gap-4 group"
              >
                Discover More
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <button className="text-white font-bold text-xs uppercase tracking-[0.3em] hover:text-nova-sky transition-colors flex items-center gap-4 border-b border-white/20 pb-2">
                Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- BOTTOM ARCHITECTURAL NUMBERS (The "Wall Design" in the Hero) --- */}
      <div className="absolute bottom-12 right-12 z-20 hidden xl:flex gap-12 items-end">
        <div className="text-right">
          <p className="text-white text-5xl font-black leading-none">01</p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Surgery Center</p>
        </div>
        <div className="text-right">
          <p className="text-white text-5xl font-black leading-none opacity-40 hover:opacity-100 transition-opacity cursor-pointer">02</p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Fertility Unit</p>
        </div>
        <div className="text-right">
          <p className="text-white text-5xl font-black leading-none opacity-40 hover:opacity-100 transition-opacity cursor-pointer">03</p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Nova Pharmacy</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;