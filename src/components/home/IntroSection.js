import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Target } from 'lucide-react';
import IntroImage from '../../assets/images/IntroImage.jpg';

const IntroSection = () => {
  // Smooth, slow easing for that premium feel
  const smoothTransition = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-nova">
      
      {/* --- ARCHITECTURAL WALL LAYERS --- */}
      {/* 1. Subtle Dot Grid */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#004AAD 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      {/* 2. Massive Outline Circles (The Wall Decor) */}
      <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border border-slate-100 rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] border border-slate-50 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT SIDE: Image Entry from the LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="relative"
          >
            {/* Structural L-Frame Accent */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border-l-2 border-b-2 border-nova-sky/30 rounded-bl-[4rem] pointer-events-none" />
            
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,74,173,0.15)] border-[12px] border-white z-10">
              <img 
                src={IntroImage} 
                alt="Nova Facility" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s] ease-out" 
              />
              
              {/* Floating Live Badge */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-sky opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-nova-sky"></span>
                </span>
                <span className="text-nova-blue font-black text-[10px] uppercase tracking-[0.2em]">Center of Excellence</span>
              </div>
            </div>

            {/* Background Block Accent */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-50 rounded-[2rem] -z-10" />
          </motion.div>

          {/* RIGHT SIDE: Content Entry from the RIGHT */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="lg:pl-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[2px] w-12 bg-nova-sky" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-nova-sky">Established 2015</span>
            </div>

            <h2 className="text-nova-blue text-5xl md:text-7xl font-black leading-[0.95] mb-8 tracking-tighter">
              Pioneering <br />
              <span className="text-nova-sky italic font-light italic">Surgical</span> <br />
              Excellence.
            </h2>

            <div className="relative mb-12">
              <p className="text-slate-500 text-lg leading-relaxed font-medium pl-8 border-l-2 border-slate-200">
                Nova Surgery Center is a specialist primary hospital providing personalized healthcare. 
                Our ultra-modern facility in East Legon is dedicated to the principle that patient satisfaction 
                is our number one priority.
              </p>
            </div>

            {/* ICON STAT GRID */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-nova-sky/20 transition-all duration-500 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-nova-blue mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-black text-nova-blue text-xs uppercase tracking-widest mb-2">Pioneering Care</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">The first free-standing surgery center in the region.</p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-nova-sky/20 transition-all duration-500 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-nova-sky mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h4 className="font-black text-nova-blue text-xs uppercase tracking-widest mb-2">Focused Mission</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">A patient-centered and revolutionary approach to surgery.</p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button className="flex items-center gap-6 group">
               <div className="w-16 h-16 rounded-full bg-nova-blue flex items-center justify-center text-white group-hover:bg-nova-sky transition-all duration-700 shadow-xl shadow-blue-900/10">
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex flex-col items-start">
                  <span className="text-nova-blue font-black uppercase tracking-[0.2em] text-[11px]">Discover Our Story</span>
                  <span className="text-nova-sky text-[10px] font-bold">About Nova Healthcare</span>
               </div>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;