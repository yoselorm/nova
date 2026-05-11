import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

const CTABanner = () => {
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
        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Have Questions About Your Consultation?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100/80 text-sm md:text-base font-medium max-w-2xl mb-10"
          >
            Get to know the skilled professionals who bring experience, dedication, and compassionate care.
          </motion.p>

          {/* BUTTON GROUP */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Phone Button */}
            <motion.a 
              href="tel:+2330XXXXXXXX"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-full pl-2 pr-8 py-2 flex items-center gap-4 shadow-xl transition-all group"
            >
              <div className="bg-nova-blue text-white p-3 rounded-full group-hover:rotate-12 transition-transform">
                <Phone size={20} fill="currentColor" />
              </div>
              <span className="text-nova-blue font-bold text-lg">+233 (0) XXX XXX XXX</span>
            </motion.a>

            {/* Book Now Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-nova-sky text-nova-blue font-bold rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-xl group"
            >
              <span className="uppercase tracking-widest text-sm">Book Consultation Now</span>
              <div className="bg-nova-blue/10 text-nova-blue p-3 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </div>
            </motion.button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;