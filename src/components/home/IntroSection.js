import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveUpRight, ShieldCheck, Target } from 'lucide-react';
import IntroImage from '../../assets/images/IntroImage.jpg';

const IntroSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden font-nova">
      
      {/* --- THE "WALL" DESIGNS (Background Layer) --- */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="absolute inset-0 bg-wall-curve" />
      
      {/* Large Abstract Geometric Shape (The "Wall Accent") */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] border-[1px] border-slate-100 rounded-full pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-[600px] h-[600px] border-[1px] border-slate-50 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: IMAGE COMPOSITION WITH ACCENT SHAPES */}
          <div className="relative">
            {/* The "L-Shape" Wall Design behind image */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l-4 border-b-4 border-nova-sky/20 rounded-bl-[3rem]" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white"
            >
              <img 
                src={IntroImage} 
                alt="Nova Facility" 
                className="w-full  object-cover" 
              />
              
              {/* Floating "Badge" on Image */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-nova-blue font-bold text-xs uppercase tracking-widest">Center of Excellence</span>
              </div>
            </motion.div>

            {/* "Floating" Geometric Accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-nova-blue rounded-3xl -z-10 rotate-12 opacity-10" />
          </div>

          {/* RIGHT: CONTENT WITH ARCHITECTURAL TYPOGRAPHY */}
          <div className="lg:pl-10">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <span className="h-[1px] w-12 bg-nova-sky" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-nova-sky">Established 2015</span>
            </motion.div>

            <h2 className="text-nova-blue text-5xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tight">
              Pioneering <span className="relative inline-block">
                Surgical
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-nova-sky/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Excellence in West Africa.
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium border-l-4 border-slate-100 pl-8">
              Nova Surgery Center is a specialist primary hospital providing personalized healthcare. 
              Our ultra-modern facility in East Legon is dedicated to the principle that patient satisfaction 
              is our number one priority.
            </p>

            {/* ICON STAT GRID (The "Wall" Box Design) */}
<div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-nova-blue mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-nova-blue text-sm mb-1">Pioneering Care</h4>
                <p className="text-xs text-slate-400">First free-standing surgery center in the region.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
                  <Target  size={20} />
                </div>
                <h4 className="font-bold text-nova-blue text-sm mb-1">Focused Mission</h4>
                <p className="text-xs text-slate-400">Patient-centered and revolutionary approach.</p>
              </div>
            </div>

            <button className="flex items-center gap-6 group">
               <div className="w-16 h-16 rounded-full bg-nova-blue flex items-center justify-center text-white group-hover:bg-nova-sky transition-all duration-500 shadow-lg shadow-blue-900/20">
                  <ArrowRight size={24} />
               </div>
               <span className="text-nova-blue font-bold uppercase tracking-widest text-sm">Discover Our Story</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;