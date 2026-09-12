import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useReveal from '../utils/useReveal';

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
