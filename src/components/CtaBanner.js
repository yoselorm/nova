import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useReveal from '../utils/useReveal';

// lucide-react ships no brand glyphs, so the WhatsApp mark is a raw inline SVG
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.876.52 3.63 1.42 5.13L2.05 22l4.99-1.31A9.94 9.94 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.06c-1.66 0-3.2-.49-4.494-1.33l-.322-.19-2.965.778.79-2.888-.21-.297A8.06 8.06 0 013.94 12c0-4.446 3.616-8.06 8.061-8.06 4.446 0 8.06 3.614 8.06 8.06 0 4.446-3.614 8.06-8.06 8.06z" />
  </svg>
);

const CTABanner = () => {
  const [ref, isVisible] = useReveal();

  return (
    <section className="px-6 py-12 font-nova">
      <div className="max-w-7xl mx-auto relative overflow-hidden bg-nova-blue rounded-[3rem] py-16 px-8 md:px-12">

        {/* DECORATIVE SHAPES (Abstract shapes from the screenshot edges) */}
        <div className="absolute top-0 left-0 w-40 h-full opacity-10 pointer-events-none">
          <div className="absolute -left-10 top-10 w-32 h-10 bg-white rounded-full rotate-45" />
          <div className="absolute -left-10 top-24 w-32 h-10 bg-white rounded-full rotate-45" />
          <div className="absolute -left-10 top-40 w-32 h-10 bg-white rounded-full rotate-45" />
        </div>

        <div className="absolute top-0 right-0 w-40 h-full opacity-10 pointer-events-none">
          <div className="absolute -right-10 top-10 w-32 h-10 bg-white rounded-full -rotate-45" />
          <div className="absolute -right-10 top-24 w-32 h-10 bg-white rounded-full -rotate-45" />
          <div className="absolute -right-10 top-40 w-32 h-10 bg-white rounded-full -rotate-45" />
        </div>

        {/* CONTENT */}
        <div
          ref={ref}
          className={`relative z-10 text-center flex flex-col items-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Have Questions About Your Consultation?
          </h2>

          <p className="text-blue-100/80 text-sm md:text-base font-medium max-w-2xl mb-10">
            Get to know the skilled professionals who bring experience, dedication, and compassionate care.
          </p>

          {/* BUTTON GROUP */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* Phone Button */}
            <a
              href="tel:+233-302-751-290"
              className="bg-white rounded-full pl-2 pr-8 py-2 flex items-center gap-4 shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 group"
            >
              <div className="bg-nova-blue text-white p-3 rounded-full group-hover:rotate-12 transition-transform">
                <Phone size={20} fill="currentColor" />
              </div>
              <span className="text-nova-blue font-bold text-xs sm:text-lg">+233 (0) 302 751 290</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/233544030436"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full pl-2 pr-8 py-2 flex items-center gap-4 shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 group"
            >
              <div className="bg-[#25D366] text-white p-3 rounded-full group-hover:rotate-12 transition-transform">
                <WhatsAppIcon size={20} />
              </div>
              <span className="text-nova-blue font-bold text-xs sm:text-lg">+233 (0) 544 030 436</span>
            </a>

            {/* Book Now Button */}
            <Link to="/#book">
              <button className="bg-nova-sky text-nova-blue font-bold rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 group">
                <span className="uppercase tracking-widest text-xs sm:text-sm">Book Consultation Now</span>
                <div className="bg-nova-blue/10 text-nova-blue p-3 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
