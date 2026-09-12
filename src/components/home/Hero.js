import React from 'react';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import homeherobg from '../../assets/images/herobg.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden font-nova bg-slate-950">

      {/* --- BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{ backgroundImage: `url(${homeherobg})` }}
      >
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
      </div>

      {/* --- ARCHITECTURAL GRID OVERLAY --- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-white/10" />
        <div className="absolute left-[50%] top-0 h-full w-[1px] bg-white/5" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-end lg:items-center justify-between pt-20">

        <div className="max-w-4xl animate-fade-in-up">
          {/* 1. PILL REVEAL */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full mb-10">
            <span className="w-1.5 h-1.5 bg-nova-sky rounded-full animate-ping" />
            <span className="text-nova-sky text-[9px] font-black uppercase tracking-[0.4em]">
              Ultra Modern Healthcare Facility // Est. 2015
            </span>
          </div>

          {/* 2. HEADLINE */}
          <h1 className="text-white text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-4">
            WE PROVIDE
          </h1>
          <h1 className="text-6xl md:text-[6rem] font-light italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-nova-sky via-white to-white/20 mb-12">
            Exceptional Care.
          </h1>

          {/* 3. PARAGRAPH + CTA */}
          <p className="text-white/50 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-medium border-l border-nova-sky/30 pl-8">
            The leading provider of minimally invasive gynecological care, fertility treatment, and maternity services here in Ghana.
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            <Link to="/#book">
              <button className="bg-nova-sky text-nova-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_20px_50px_rgba(0,229,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-[#00E5FF] active:scale-95 flex items-center gap-4 group">
                Inquire Now
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>

            <Link to="/contact">
              <button className="bg-white/10 text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-md active:scale-95 flex items-center gap-4 group">
                Contact Us
                <MousePointer2 size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* --- INTERACTIVE VERTICAL NAV --- */}
        <div className="hidden xl:flex flex-col gap-16 border-l border-white/10 pl-12 animate-fade-in-up [animation-delay:200ms]">
          {[
            { id: '01', title: 'Surgery', active: true },
            { id: '02', title: 'Fertility', active: false }
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <p className={`text-4xl font-black transition-all duration-300 ${item.active ? 'text-nova-sky scale-110' : 'text-white/10 group-hover:text-white/40'}`}>
                {item.id}
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-2 transition-all duration-300 ${item.active ? 'text-white' : 'text-white/5 group-hover:text-white/20'}`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-bounce">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-nova-sky to-transparent" />
      </div>

    </section>
  );
};

export default Hero;
