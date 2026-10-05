import React, { useEffect, useState } from 'react';
import imageBanner from '../../assets/images/ImageBanner.png'
import buildingImage from '../../assets/images/building-new.jpg'
import useReveal from '../../utils/useReveal';

const SLIDES = [
  { src: imageBanner, caption: 'Nova Facility Exterior' },
  { src: buildingImage, caption: 'Nova Healthcare Building', tint: true }
];
const SLIDE_DURATION = 6000;

const PureImageBanner = () => {
  const [ref, isVisible] = useReveal();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

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
        <div
          ref={ref}
          className={`relative h-[460px] md:h-[560px] w-full rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-[12px] border-white group transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}
        >
          {/* The Slides */}
          {SLIDES.map((slide, index) => (
            <React.Fragment key={slide.src}>
              <img
                src={slide.src}
                alt={slide.caption}
                className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-[opacity,transform] duration-[1.5s] ease-out group-hover:scale-105 ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {slide.tint && (
                <div
                  className={`absolute inset-0 bg-nova-blue/30 mix-blend-multiply pointer-events-none transition-opacity duration-[1.5s] ease-out ${
                    index === activeSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </React.Fragment>
          ))}

          {/* GRADIENT OVERLAY - Subtle dark fade to match the Hero section depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

          {/* SLIDER DOTS */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  index === activeSlide ? 'w-8 h-2 bg-nova-sky' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* FLOATING DESIGN DETAIL (Bottom Right) */}
          <div className="absolute bottom-10 right-10 flex items-center gap-4">
             <div className="h-[1px] w-12 bg-white/40" />
             <div className="w-2 h-2 rounded-full bg-nova-sky animate-pulse" />
          </div>
        </div>

        {/* BOTTOM CAPTION BAR (Floating architectural element) */}
        <div className="mt-8 flex justify-between items-center px-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
           <span>{SLIDES[activeSlide].caption}</span>
           <span>East Legon, Ghana</span>
        </div>
      </div>
    </section>
  );
};

export default PureImageBanner;
