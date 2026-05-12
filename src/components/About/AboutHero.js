import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import aboutHeroBg from '../../assets/images/AboutHero.jpg';

const CinematicHero = () => {
  const mainText = "NOVA HEALTHCARE";
  const subText = "This is";

  // Variants for the staggered letter reveal
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Buttery smooth cubic-bezier
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 1.2, duration: 0.8 } 
    }
  };

  return (
    <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden font-nova">
      
      {/* 1. BACKGROUND: Ken Burns Effect Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src={aboutHeroBg}
          className="w-full h-full object-cover"
          alt="Nova Healthcare Facility"
        />
        
        {/* 2. OVERLAYS: Cinematic Depth */}
        {/* Darkening tint */}
        <div className="absolute inset-0 bg-slate-950/40" />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
        {/* Top/Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl">
          
          {/* Subheading: "This is" */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="flex overflow-hidden mb-2"
          >
            {subText.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="text-nova-sky text-2xl md:text-3xl font-light italic tracking-tight mr-2"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Main Heading: "NOVA HEALTHCARE" */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            className="flex flex-wrap text-3xl md:text-5xl font-black text-white tracking-tighter leading-none"
          >
            {mainText.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i + 5} // Starts after "This is" begins
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description & Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="mt-10 space-y-8"
          >
            <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              West Africa's premier center for <span className="text-white border-b border-nova-sky">Minimally Invasive Surgery</span> and world-class patient-centric care.
            </p>

            <div className="flex flex-wrap gap-5">
              {/* Primary Action */}
              <button className="group relative px-8 py-4 bg-nova-blue overflow-hidden rounded-xl transition-all shadow-2xl shadow-blue-900/40">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
                  Explore Our Services <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              {/* Video/Secondary Action */}
              <button className="flex items-center gap-4 text-white group">
                <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all duration-500">
                  <Play size={20} fill="currentColor" />
                </span>
                <span className="font-black uppercase tracking-widest text-[10px]">Watch Facility Tour</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. ARCHITECTURAL DETAIL: Scrolling Coordinates */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-6"
      >
        <div className="h-[1px] w-24 bg-white/20" />
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">
          Accra, Ghana // 5.6037° N, 0.1870° W
        </div>
      </motion.div>

    </section>
  );
};

export default CinematicHero;