import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import aboutHeroBg from '../../assets/images/AboutHero.jpg';
import { Link } from 'react-router-dom';

const CinematicHero = () => {
  return (
    <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden font-nova">

      {/* 1. BACKGROUND: Ken Burns Effect Image (pure CSS, GPU-composited) */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutHeroBg}
          className="w-full h-full object-cover animate-ken-burns"
          alt="Nova Healthcare Facility"
        />

        {/* 2. OVERLAYS: Cinematic Depth */}
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl animate-fade-in-up">

          {/* Subheading: "This is" */}
          <div className="text-nova-sky text-2xl md:text-3xl font-light italic tracking-tight mb-2">
            This is
          </div>

          {/* Main Heading: "NOVA HEALTHCARE" */}
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
            NOVA HEALTHCARE
          </h1>

          {/* Description & Buttons */}
          <div className="mt-10 space-y-8 animate-fade-in-up [animation-delay:150ms]">
            <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              West Africa's premier center for <span className="text-white border-b border-nova-sky">Minimally Invasive Surgery</span> and world-class patient-centric care.
            </p>

            <div className="flex flex-wrap gap-5">
              {/* Primary Action */}
              <Link to="/services">
                <button className="group relative px-8 py-4 bg-nova-blue overflow-hidden rounded-xl transition-all shadow-2xl shadow-blue-900/40">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
                    Explore Our Services <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>

              {/* Video/Secondary Action */}
              {/* <button className="flex items-center gap-4 text-white group">
                <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all duration-500">
                  <Play size={20} fill="currentColor" />
                </span>
                <span className="font-black uppercase tracking-widest text-[10px]">Watch Facility Tour</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* 4. ARCHITECTURAL DETAIL: Scrolling Coordinates */}
      <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-6 animate-fade-in [animation-delay:600ms]">
        <div className="h-[1px] w-24 bg-white/20" />
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">
          Accra, Ghana // 5.6037° N, 0.1870° W
        </div>
      </div>

    </section>
  );
};

export default CinematicHero;
